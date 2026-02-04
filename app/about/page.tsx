export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">소개</h1>

        {/* 도구의 목적 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">🎯 도구의 목적</h2>
          <p className="text-gray-700 mb-4">
            <strong>손익분기점 계산기</strong>는 자영업자가 사업의 핵심 재무 지표를 빠르고 쉽게 계산할 수 있도록 만든 무료 도구입니다.
          </p>
          <p className="text-gray-700 mb-4">
            창업 전 사업성 검토, 운영 중 목표 설정, 메뉴/가격 조정 시 시뮬레이션 등 다양한 상황에서 활용할 수 있습니다.
          </p>
          <p className="text-gray-700">
            특히 &ldquo;손익분기점&rdquo;이라는 추상적인 개념을 구체적인 숫자로 보여주고,
            나아가 그 숫자가 현실적으로 달성 가능한지(캐파 체크)까지 검증합니다.
          </p>
        </section>

        {/* 주요 기능 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">✨ 주요 기능</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-2xl mr-3">💰</span>
              <div>
                <h3 className="font-bold">손익분기점 계산</h3>
                <p className="text-gray-700 text-sm">
                  고정비와 변동비를 입력하면 월/일 손익분기 매출을 즉시 계산합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <h3 className="font-bold">목표이익 필요매출 계산</h3>
                <p className="text-gray-700 text-sm">
                  원하는 순이익을 달성하려면 얼마를 팔아야 하는지 계산합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📦</span>
              <div>
                <h3 className="font-bold">필요 주문수 계산</h3>
                <p className="text-gray-700 text-sm">
                  매장/배달 채널별로 하루에 몇 건을 팔아야 하는지 구체적으로 알려줍니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🔍</span>
              <div>
                <h3 className="font-bold">현실가능성 캐파 체크</h3>
                <p className="text-gray-700 text-sm">
                  좌석 수, 체류시간, 영업시간을 기반으로 목표가 물리적으로 달성 가능한지 검증합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <h3 className="font-bold">민감도 분석</h3>
                <p className="text-gray-700 text-sm">
                  원가율이나 객단가 변화에 따라 손익분기점이 어떻게 달라지는지 확인할 수 있습니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">💾</span>
              <div>
                <h3 className="font-bold">시나리오 저장/비교</h3>
                <p className="text-gray-700 text-sm">
                  최대 3개의 시나리오를 저장하여 비교할 수 있습니다. (로컬 저장)
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* 데이터 처리 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">🔒 데이터 처리 방침</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">개인정보 수집 없음</h3>
              <p className="text-gray-700">
                본 도구는 <strong>개인정보를 일체 수집하지 않습니다</strong>.
                이름, 전화번호, 사업자번호, 상호명 등 어떠한 개인 식별 정보도 입력받지 않으며 저장하지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">로컬 저장소만 사용</h3>
              <p className="text-gray-700">
                모든 데이터는 사용자의 웹 브라우저 <strong>localStorage</strong>에만 저장됩니다.
                서버로 전송되지 않으며, 외부에 공유되지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">로그인 불필요</h3>
              <p className="text-gray-700">
                계정 생성이나 로그인 없이 모든 기능을 자유롭게 사용할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">쿠키 사용 최소화</h3>
              <p className="text-gray-700">
                필수 기능 외 쿠키는 사용하지 않습니다. 분석 도구(Google Analytics 등)도 선택 사항입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 면책사항 */}
        <section className="card bg-yellow-50 border-yellow-200 mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ 면책사항</h2>
          
          <div className="space-y-4 text-yellow-700">
            <p>
              <strong>본 도구는 추정 계산 도구일 뿐이며, 다음과 같은 서비스를 제공하지 않습니다:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>법률 자문</li>
              <li>세무 자문</li>
              <li>노무 자문</li>
              <li>투자 자문</li>
              <li>경영 컨설팅</li>
            </ul>
            <p>
              실제 사업 결정, 창업, 투자, 세무 신고 등의 중요한 사안에는 반드시 전문가(세무사, 회계사, 변호사 등)의 조언을 받으시기 바랍니다.
            </p>
            <p>
              본 도구의 계산 결과는 입력된 가정을 기반으로 한 추정치이며,
              실제 사업 성과는 시장 상황, 경쟁, 운영 능력, 외부 변수 등 다양한 요인에 따라 달라질 수 있습니다.
            </p>
            <p>
              본 도구 사용으로 인한 직간접적 손해에 대해 제작자는 책임을 지지 않습니다.
            </p>
          </div>
        </section>

        {/* 개선 제안 */}
        <section className="card">
          <h2 className="text-2xl font-bold mb-4">💬 개선 제안</h2>
          <p className="text-gray-700 mb-4">
            본 도구는 자영업자 여러분의 피드백을 통해 지속적으로 개선됩니다.
          </p>
          <p className="text-gray-700">
            버그 리포트, 기능 제안, 사용 후기 등은 언제든지 환영합니다!
          </p>
        </section>
      </div>
    </div>
  );
}
