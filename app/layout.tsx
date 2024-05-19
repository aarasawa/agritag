import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./app.css";

const loRes28 = localFont({
  src: '../public/fonts/LoRes12OTNarrow.ttf'
})

export const metadata: Metadata = {
  title: "AgriTag",
  description: "A system for indexing pesticide applications in California.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={loRes28.className}>{children}</body>
    </html>
  );
}
