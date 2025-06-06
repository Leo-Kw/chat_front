import { useCallback, useEffect, useRef } from 'react'

const videoUrl = 'http://localhost:3100/Mother_Aiman_Samat.mp4'
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

export const Video = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const sourceOpen = useCallback((mediaSource: MediaSource) => {
    // console.log(mediaSource.readyState) // open
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
    fetchVideo(videoUrl, (buf) => {
      sourceBuffer.addEventListener('updateend', () => {
        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
          mediaSource.endOfStream()
          // video.play()
        }
      })
      sourceBuffer.appendBuffer(buf)
    })
  }, [])

  useEffect(() => {
    const mediaSource = new MediaSource()
    const videoRefCurrent = videoRef.current
    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec) && videoRefCurrent) {
      videoRefCurrent.width = 200
      videoRefCurrent.controls = true
      videoRefCurrent.src = URL.createObjectURL(mediaSource)
      mediaSource.addEventListener('sourceopen', () => {
        if (mediaSource.readyState === 'open') {
          sourceOpen(mediaSource)
        }
      })
      // videoRefCurrent.onloadeddata = () => {
      //   const timeRangesObject = videoRefCurrent.seekable
      //   for (let count = 0; timeRangesObject.length > count; count++) {
      //     console.log(timeRangesObject.start(count), timeRangesObject.end(count))
      //   }
      // }
    } else {
      console.error('Unsupported MIME type or codec: ', mimeCodec)
    }
  }, [sourceOpen])

  const fetchVideo = (url: string, cb: (buf: BufferSource) => void) => {
    fetch(url, { method: 'get' })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        cb(buffer)
      })
      .catch((e) => console.error('Error:', e))
  }

  return <video ref={videoRef} className='h-full w-full'></video>
}
