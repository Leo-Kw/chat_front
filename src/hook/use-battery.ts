import { isNavigator, off, on } from '@/utils'
import { useEffect, useState } from 'react'

export interface BatteryState {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: () => void
  onchargingtimechange: () => void
  ondischargingtimechange: () => void
  onlevelchange: () => void
}

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>
}

type UseBatteryState = BatteryState & { isSupported: boolean; fetched: boolean } // battery API supported and fetched

const nav: NavigatorWithPossibleBattery | undefined = isNavigator ? navigator : undefined
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function'

const useBatteryMock = (): UseBatteryState => {
  return {
    isSupported: false,
    fetched: false,
    level: 0,
    charging: false,
    dischargingTime: 0,
    chargingTime: 0,
  }
}

const useBattery = (): UseBatteryState => {
  const [state, setState] = useState<UseBatteryState>({
    isSupported: true,
    fetched: false,
    level: 0,
    charging: false,
    dischargingTime: 0,
    chargingTime: 0,
  })

  useEffect(() => {
    let isMounted = true
    let battery: BatteryManager | null = null

    const handleChange = () => {
      if (!isMounted || !battery) {
        return
      }
      const newState: UseBatteryState = {
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime,
      }
      // !isDeepEqual(state, newState) &&
      setState(newState)
    }

    nav!.getBattery!().then((bat: BatteryManager) => {
      if (!isMounted) {
        return
      }
      battery = bat
      on(battery, 'chargingchange', handleChange)
      on(battery, 'chargingtimechange', handleChange)
      on(battery, 'dischargingtimechange', handleChange)
      on(battery, 'levelchange', handleChange)
      handleChange()
    })

    return () => {
      isMounted = false
      if (battery) {
        off(battery, 'chargingchange', handleChange)
        off(battery, 'chargingtimechange', handleChange)
        off(battery, 'dischargingtimechange', handleChange)
        off(battery, 'levelchange', handleChange)
      }
    }
  }, [state])

  return state
}

export default isBatteryApiSupported ? useBattery : useBatteryMock
