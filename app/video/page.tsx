'use client'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/face-detection-recognition/video")
    setSocket(ws)

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        setInterval(() => {
          if (!videoRef.current || !ctx || !ws || ws.readyState !== WebSocket.OPEN) return

          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

          canvas.toBlob(blob => {
            if (blob) {
              blob.arrayBuffer().then(buffer => {
                ws.send(buffer)
              })
            }
          }, 'image/webp')
        }, 40)
      }
    }

    startCamera()

    // Receive detection result and draw bounding box
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (!canvasRef.current || !videoRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (data.face_detected) {
        const { top, right, bottom, left } = data.bounding_box

        // Scale detection coords based on actual video size
        const videoWidth = videoRef.current.videoWidth
        const videoHeight = videoRef.current.videoHeight

        canvas.width = videoWidth
        canvas.height = videoHeight

        ctx.strokeStyle = 'lime'
        ctx.lineWidth = 2
        ctx.strokeRect(left, top, right - left, bottom - top)
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative">
      <h1 className="text-white text-3xl font-bold mb-6">Webcam Streaming with Face Box</h1>
      <div className="relative w-[640px] h-[480px]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full rounded-xl border-4 border-blue-500"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    </main>
  )
}















// 'use client'
// import { useEffect, useRef, useState } from 'react'

// export default function Home() {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const [socket, setSocket] = useState<WebSocket | null>(null)

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8000/face-detection-recognition/video")
//     setSocket(ws)

//     const startCamera = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream
//         videoRef.current.play()

//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')

//         setInterval(() => {
//           if (!videoRef.current || !ctx || !ws || ws.readyState !== WebSocket.OPEN) return

//           canvas.width = videoRef.current.videoWidth
//           canvas.height = videoRef.current.videoHeight
//           ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

//           canvas.toBlob((blob) => {
//             if (blob && ws.readyState === WebSocket.OPEN) {
//               blob.arrayBuffer().then((buffer) => {
//                 ws.send(buffer)
//               })
//             }
//           }, "image/webp", 0.7)  // use "image/webp" for better perf optionally
          
//         }, 100) // ~10 FPS
//       }
//     }

//     startCamera()

//     return () => {
//       ws.close()
//     }
//   }, [])

//   return (
//     <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
//       <h1 className="text-white text-3xl font-bold mb-6">Webcam Streaming via WebSocket</h1>
//       <video ref={videoRef} className="rounded-xl border-4 border-blue-500 w-[640px] h-[480px]" />
//     </main>
//   )
// }
