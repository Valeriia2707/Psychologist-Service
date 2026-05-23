import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import {Inter} from "next/font/google";
import './global.css';

const InterFont = Inter({
    subsets:['latin'],
    weight: ['400', '500'],
    variable: '--font-family'
})

export const metadata: Metadata = {
title: 'Start your therapy now',
description: 'Start your therapy now with our psychologists'
}

export default function RootLayout ({children}: {children: React.ReactNode}){
return (
    <html lang="en">
        <body className={InterFont.variable}>
                <Header/>
            <main>
                {children}
            </main>
        </body>
    </html>
)
}