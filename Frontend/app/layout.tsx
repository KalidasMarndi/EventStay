import { ClerkProvider } from '@clerk/nextjs'
import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono, Figtree, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NavbarWrapper } from '@/components/Navbar/NavbarWrapper'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-figtree'
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'EventStay — Group stays for events',
  description: 'Create private event inventory, launch a branded guest microsite, and track bookings, payments, and arrivals in one dashboard.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-scroll-behavior="smooth" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${figtree.variable} ${inter.variable}`}>
        <body className="font-sans antialiased bg-black text-white">
          <NavbarWrapper />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
