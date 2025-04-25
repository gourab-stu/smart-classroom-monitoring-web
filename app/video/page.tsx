"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const faceBoxRef = useRef<{ top: number; right: number; bottom: number; left: number } | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/auth/student/login");
    setSocket(ws);

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        setInterval(() => {
          if (!videoRef.current || !ctx || !ws || ws.readyState !== WebSocket.OPEN) return;

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                blob.arrayBuffer().then((buffer) => {
                  ws.send(buffer);
                });
              }
            },
            "image/webp",
            0.5
          );
        }, 100);
      }
    };

    startCamera();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setName(data.name);
      if (!canvasRef.current || !videoRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (data.face_detected) {
        const { top, right, bottom, left } = data.bounding_box;
        faceBoxRef.current = { top, right, bottom, left };

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.font = "16px Sans-Serif";
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 1;
        ctx.strokeRect(left, top, right - left, bottom - top);
        ctx.strokeText(data.name, left, top - 10);
      } else {
        faceBoxRef.current = null;
      }
    };

    // Spacebar capture logic
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (!videoRef.current || !faceBoxRef.current) return;

        const video = videoRef.current;
        const { top, right, bottom, left } = faceBoxRef.current;

        const captureCanvas = document.createElement("canvas");
        const width = right - left;
        const height = bottom - top;

        captureCanvas.width = width;
        captureCanvas.height = height;

        const ctx = captureCanvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, left, top, width, height, 0, 0, width, height);

        // For demo: Download image
        captureCanvas.toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("file", blob, "captured_face.webp");

            fetch("http://localhost:8000/upload-face/", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Upload success:", data);
                alert("Face uploaded successfully!");
              })
              .catch((err) => {
                console.error("Upload error:", err);
                alert("Failed to upload face.");
              });
          }
        }, "image/webp");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      ws.close();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Student Login</h2>
      <div className="relative w-80 h-80 rounded-full overflow-hidden mb-4">
        <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" />
      </div>
      <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition">Login as {name}</button>
    </div>
  );
}
