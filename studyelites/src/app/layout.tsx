import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyElites — Premium Digital Study Material for Indian Govt Exam Aspirants",
  description:
    "StudyElites.online sells affordable digital study material for SSC, Banking, Railway, GK and Quantitative Aptitude. Join the ₹29 30-day membership for full access and our Telegram educational community.",
  keywords: [
    "StudyElites",
    "SSC study material",
    "Banking study material",
    "Railway study material",
    "General Knowledge notes",
    "Quantitative Aptitude PDF",
    "govt exam preparation India",
    "digital study material",
  ],
  authors: [{ name: "StudyElites" }],
  metadataBase: new URL("https://studyelites.online"),
  openGraph: {
    title: "StudyElites — Premium Digital Study Material",
    description:
      "Affordable digital study material for SSC, Banking, Railway, GK and Quantitative Aptitude. ₹29 30-day membership available.",
    url: "https://studyelites.online",
    siteName: "StudyElites",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyElites — Premium Digital Study Material",
    description:
      "Affordable digital study material for SSC, Banking, Railway, GK and Quantitative Aptitude.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
