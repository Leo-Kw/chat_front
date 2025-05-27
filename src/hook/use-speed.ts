const colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral' /* … */,
]

const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

interface Props {
  setMessageContent: (v: string) => void
}

export const useSpeed = ({ setMessageContent }: Props) => {
  const handleSpeedRecognition = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log('已获得麦克风权限')

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // const SpeechRecognitionEvent =
        //   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

        // 检查浏览器支持情况
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition()
          const speechRecognitionList = new SpeechGrammarList()

          speechRecognitionList.addFromString(grammar, 1)
          recognition.grammars = speechRecognitionList
          recognition.continuous = false
          recognition.lang = 'zh-CN'
          recognition.interimResults = false
          recognition.maxAlternatives = 1

          recognition.start()

          recognition.onstart = () => {
            console.log('语音识别已启动')
          }

          recognition.onresult = (event) => {
            const speechResult = event.results[0]
            console.log('你说了：', speechResult[0].transcript)
            console.log('置信度：', speechResult[0].confidence)
            setMessageContent(speechResult[0].transcript)

            // 如果有替代选项
            if (speechResult.length > 1) {
              console.log('替代选项：', speechResult[1].transcript)
            }
          }

          recognition.onerror = (event) => {
            console.error('语音识别错误：' + event.error)
          }

          recognition.onspeechstart = () => {
            console.log('开始说话')
          }

          recognition.onspeechend = () => {
            console.log('结束说话')
            recognition.stop()
          }
        } else {
          console.error('当前浏览器不支持语音识别。')
        }
      })
      .catch((error) => {
        console.error('获取麦克风权限失败: ', error)
        if (error.name === 'NotAllowedError') {
          alert('请检查浏览器设置，确保授予麦克风权限。')
        }
      })
  }

  // const speechSynthesis = () => {
  //   const synth = window.speechSynthesis
  //   const voices = synth.getVoices()

  //   for (const voice of voices) {
  //     const option = document.createElement('option')
  //     option.textContent = `${voice.name} (${voice.lang})`

  //     if (voice.default) {
  //       option.textContent += ' — DEFAULT'
  //     }

  //     option.setAttribute('data-lang', voice.lang)
  //     option.setAttribute('data-name', voice.name)
  //   }
  // }

  return { handleSpeedRecognition }
}
