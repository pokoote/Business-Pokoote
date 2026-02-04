import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 사이트 정보 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">손익분기점 계산기</h3>
            <p className="text-sm text-gray-400">
              자영업자를 위한 손익분기점, 목표매출, 현실가능성 체크 도구
            </p>
          </div>
          
          {/* 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-3">메뉴</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  계산기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  가이드
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  소개
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 면책 */}
          <div>
            <h3 className="text-white font-semibold mb-3">면책사항</h3>
            <p className="text-sm text-gray-400">
              본 도구는 추정 계산 도구이며, 법률/세무/투자 자문이 아닙니다.
              실제 사업 결정 시 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 손익분기점 계산기. All rights reserved.</p>
          <p className="mt-2">개인정보 수집 없음 · 로컬 저장만 사용</p>
        </div>
      </div>
    </footer>
  );
}
