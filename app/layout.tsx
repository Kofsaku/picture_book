import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "うちのこえほん | 世界にひとつだけの絵本を、あなたの子どもに",
  description: "名前・性格・好きなことに合わせて物語が変わる。AIと作家が\"わが子専用のストーリー\"をPDFでお届け。今だけ、無料体験モニターを受付中。",
  keywords: "絵本,オリジナル絵本,パーソナライズ,子ども,AI,無料",
  openGraph: {
    title: "うちのこえほん | 世界にひとつだけの絵本",
    description: "名前・性格・好きなことに合わせて物語が変わる、お子さま専用の絵本サービス",
    images: ["/parent-child-reading.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <Script 
          src="https://code.jquery.com/jquery-3.7.1.min.js" 
          strategy="beforeInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
