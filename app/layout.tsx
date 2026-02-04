import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '손익분기점 계산기 - 자영업 필요매출 시뮬레이터',
  description: '자영업자를 위한 손익분기점, 목표매출, 현실가능성(캐파) 체크까지 한 번에 계산하는 무료 도구입니다. 30초 안에 월/일 필요매출과 필요 주문수를 확인하세요.',
  keywords: '손익분기점, 자영업, 필요매출, 목표이익, 캐파 체크, 매출 계산기, 손익분기 계산기',
  openGraph: {
    title: '손익분기점 계산기 - 자영업 필요매출 시뮬레이터',
    description: '자영업자를 위한 손익분기점, 목표매출, 현실가능성(캐파) 체크까지 한 번에 계산',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
