import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 min-h-screen">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
