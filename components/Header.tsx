import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600">
              손익분기점 계산기
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              홈
            </Link>
            <Link
              href="/calculator"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              계산기
            </Link>
            <Link
              href="/guide"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              가이드
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              소개
            </Link>
          </nav>
          
          {/* 모바일 메뉴 */}
          <nav className="md:hidden flex space-x-4">
            <Link
              href="/calculator"
              className="text-sm text-primary-600 font-semibold"
            >
              계산기
            </Link>
            <Link
              href="/guide"
              className="text-sm text-gray-700"
            >
              가이드
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
