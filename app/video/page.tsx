"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const faceBoxRef = useRef<{ top: number; right: number; bottom: number; left: number } | null>(null);
  const [name, setName] = useState<string>("Unknown");
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/detection/student");
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (data.face_detected) {
        const { top, right, bottom, left } = data.bounding_box;
        faceBoxRef.current = { top, right, bottom, left };

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 1;
        ctx.strokeRect(left, top, right - left, bottom - top);
      } else {
        faceBoxRef.current = null;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogin = async () => {
    if (!videoRef.current || !faceBoxRef.current) {
      toast.error("No face detected!");
      return;
    }

    toast.loading("Logging in...");

    const video = videoRef.current;
    const { top, right, bottom, left } = faceBoxRef.current;
    const width = right - left;
    const height = bottom - top;

    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = width;
    captureCanvas.height = height;
    const ctx = captureCanvas.getContext("2d");

    if (!ctx) {
      toast.dismiss();
      toast.error("Canvas error!");
      return;
    }

    ctx.drawImage(video, left, top, width, height, 0, 0, width, height);

    captureCanvas.toBlob(async (blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("file", blob, "captured_face.webp");

        try {
          const response = await fetch("http://localhost:8000/auth/student/login/", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          toast.dismiss();

          if (result.login) {
            toast.success("Login successful!");
            router.push("/student/dashboard/");
          } else {
            toast.error("Login failed!");
          }
        } catch (error) {
          toast.dismiss();
          toast.error("Server error!");
          console.log(error);
        }
      }
    }, "image/webp");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center p-8 bg-gray-900/80 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6">Student Login</h2>
        <div className="relative w-80 h-80 rounded-full bg-gray-700 overflow-hidden mb-6">
          <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-full" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 rounded-full" />
        </div>
        <button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-full shadow-lg transition mb-4">
          Login as {name}
        </button>
      </div>
    </div>
  );
}
