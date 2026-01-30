import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "상암 점심 월드컵",
    description: "오늘 점심 뭐 먹지? 이상형 월드컵으로 결정하세요!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
