import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '손익분기점 계산기 - 자영업 필수 도구',
  description: '자영업자를 위한 손익분기점, 목표매출, 현실가능성 캐파 체크까지 한 번에 계산하세요. 무료, 로그인 불필요.',
  keywords: '손익분기점, 손익분기점 계산기, 자영업, 매출 계산, 목표매출, 창업, 카페, 음식점',
  openGraph: {
    title: '손익분기점 계산기 - 자영업 필수 도구',
    description: '손익분기점, 목표매출, 현실가능성까지 30초 안에 계산',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {/* 네비게이션 */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-primary-600">
                손익분기점 계산기
              </Link>
              <div className="flex gap-4">
                <Link href="/calculator" className="text-gray-700 hover:text-primary-600 font-medium">
                  계산기
                </Link>
                <Link href="/guide" className="text-gray-700 hover:text-primary-600 font-medium">
                  가이드
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
                  소개
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        <main>{children}</main>

        {/* 푸터 */}
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              © 2026 손익분기점 계산기. 본 도구는 추정 계산용이며 법률/세무 자문이 아닙니다.
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <Link href="/" className="hover:text-white">
                홈
              </Link>
              <Link href="/calculator" className="hover:text-white">
                계산기
              </Link>
              <Link href="/guide" className="hover:text-white">
                가이드
              </Link>
              <Link href="/about" className="hover:text-white">
                소개
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
