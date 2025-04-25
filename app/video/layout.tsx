export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl">{children}</div>
      </body>
    </html>
  );
}
