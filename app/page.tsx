import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            손익분기점 · 목표매출 ·<br />현실가능성까지 한 번에
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            자영업자를 위한 30초 계산기. 이번 달에 얼마를 팔아야 하는지,<br />
            그 매출이 현실적으로 가능한지 즉시 확인하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculator" className="btn-primary text-lg">
              계산 시작하기
            </Link>
            <Link href="/guide" className="btn-outline text-lg">
              사용 가이드 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 3개 CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link href="/calculator" className="card hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">손익분기 계산</h3>
            <p className="text-gray-600 text-sm">
              고정비와 변동비를 입력하면 손익분기점 매출을 즉시 계산합니다.
            </p>
          </Link>
          <Link href="/calculator" className="card hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">목표이익 계산</h3>
            <p className="text-gray-600 text-sm">
              원하는 순이익을 달성하려면 얼마를 팔아야 하는지 알려드립니다.
            </p>
          </Link>
          <Link href="/calculator" className="card hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">현실가능성 체크</h3>
            <p className="text-gray-600 text-sm">
              좌석·체류시간·영업시간 기준으로 목표가 달성 가능한지 검증합니다.
            </p>
          </Link>
        </div>
      </section>

      {/* 예시 시나리오 */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8">빠른 시작: 업종별 예시</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/calculator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">🍜 음식점 예시</h3>
              <p className="text-sm text-gray-600">
                매장 60% + 배달 40% 믹스, 좌석 20개 기준 예시 값으로 빠르게 시작하세요.
              </p>
            </Link>
            <Link href="/calculator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">☕ 카페 예시</h3>
              <p className="text-sm text-gray-600">
                매장 80% + 배달 20% 믹스, 좌석 25개 기준 예시 값으로 빠르게 시작하세요.
              </p>
            </Link>
          </div>
          <p className="text-center text-sm text-orange-600 font-semibold mt-4">
            ⚠️ 예시는 참고용이며, 실제 값으로 반드시 수정하세요.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문 (FAQ)</h2>
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 손익분기점이 정확히 무엇인가요?</h3>
            <p className="text-gray-700">
              A. 매출이 총 비용(고정비 + 변동비)과 정확히 같아서 이익도 손해도 없는 지점입니다.
              손익분기점 이상 매출을 달성하면 이익이 발생합니다.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 공헌이익률은 무엇인가요?</h3>
            <p className="text-gray-700">
              A. 매출에서 변동비를 뺀 비율입니다. 공헌이익률이 높을수록 고정비를 회수하고 이익을 내기 쉽습니다.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 변동비와 고정비의 차이는?</h3>
            <p className="text-gray-700">
              A. 고정비는 매출과 관계없이 매달 나가는 비용(임대료, 고정인건비 등)이고,
              변동비는 매출에 비례해서 증가하는 비용(원가, 배달수수료 등)입니다.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 현실가능성 캐파 체크는 무엇인가요?</h3>
            <p className="text-gray-700">
              A. 계산된 필요 매출이 물리적으로 달성 가능한지 검증합니다.
              좌석 수, 체류시간, 영업시간을 기반으로 매장 처리 한계를 계산합니다.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 개인정보는 수집하나요?</h3>
            <p className="text-gray-700">
              A. 아니요. 모든 데이터는 사용자의 브라우저(localStorage)에만 저장되며,
              서버로 전송되지 않습니다.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Q. 계산 결과는 법적 효력이 있나요?</h3>
            <p className="text-gray-700">
              A. 아니요. 본 도구는 추정 계산용이며 법률/세무 자문이 아닙니다.
              실제 사업 결정 시 전문가의 조언을 받으시기 바랍니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 계산해보세요</h2>
          <p className="text-xl mb-8">로그인 불필요 · 무료 · 30초 완성</p>
          <Link href="/calculator" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg">
            계산 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}
