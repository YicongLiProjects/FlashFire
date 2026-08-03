import type { Metadata } from "next";
import "./globals.css";
import { ModelProvider } from "./context/predictions_context";

export const metadata: Metadata = {
  title: "FlashFire",
  description: "A job salary prediction tool for data science and adjacent roles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <ModelProvider>
          {children}
        </ModelProvider>
      </body>
    </html>
  );
}
