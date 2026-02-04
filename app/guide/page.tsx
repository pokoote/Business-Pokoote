export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">가이드</h1>

        {/* 기본 개념 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">📚 기본 개념</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">고정비 (Fixed Costs)</h3>
              <p className="text-gray-700 mb-2">
                매출과 관계없이 매달 고정적으로 나가는 비용입니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>임대료</li>
                <li>관리비</li>
                <li>고정공과금 (전기/수도 기본료)</li>
                <li>고정인건비 (정규직 급여)</li>
                <li>구독 서비스 (POS, 배달앱 월정액)</li>
                <li>리스/감가상각</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">변동비 (Variable Costs)</h3>
              <p className="text-gray-700 mb-2">
                매출에 비례해서 증가하는 비용입니다. 퍼센트(%)로 표현합니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>원가율: 식재료, 상품 원가</li>
                <li>결제수수료율: 카드/간편결제 수수료 (보통 2~3%)</li>
                <li>플랫폼수수료율: 배달앱 수수료 (보통 10~15%)</li>
                <li>포장/소모품율: 포장 용기, 일회용품</li>
                <li>변동인건비율: 알바비 (매출 증가 시 추가 고용)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">공헌이익률 (Contribution Margin Rate)</h3>
              <p className="text-gray-700 mb-2">
                매출에서 변동비를 뺀 비율입니다. 고정비를 회수하고 이익을 만드는 원천입니다.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-2">
                <p className="font-mono text-sm">
                  공헌이익률 = 1 - 변동비율<br/>
                  예: 변동비율 60% → 공헌이익률 40%
                </p>
              </div>
              <p className="text-gray-700 mt-2">
                <strong>중요:</strong> 공헌이익률이 높을수록 손익분기점이 낮아지고 이익을 내기 쉽습니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">손익분기점 (Break-Even Point)</h3>
              <p className="text-gray-700 mb-2">
                이익도 손해도 없는 매출 지점입니다.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mt-2">
                <p className="font-mono text-sm">
                  손익분기점 매출 = 고정비 ÷ 공헌이익률<br/>
                  예: 고정비 1,000만원, 공헌이익률 40%<br/>
                  → 손익분기 매출 = 1,000만원 ÷ 0.4 = 2,500만원
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 현실 팁 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 현실 팁</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                ⚠️ 원가율 2%p 상승의 파괴력
              </h3>
              <p className="text-gray-700 mb-2">
                원가율이 2%p만 올라가도 손익분기점이 크게 상승합니다.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>예시:</strong> 월 고정비 1,000만원, 변동비율 60%<br/>
                  → 공헌이익률 40%, 손익분기 매출 2,500만원<br/><br/>
                  
                  원가율 2%p 상승 (변동비율 62%)<br/>
                  → 공헌이익률 38%, 손익분기 매출 <strong>2,632만원</strong> (+132만원!)
                </p>
              </div>
              <p className="text-gray-700 mt-2">
                <strong>해결책:</strong> 원가 관리, 메뉴 가격 조정, 고마진 메뉴 비중 확대
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">🎯 개선 레버 (우선순위)</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>객단가 ↑</strong>: 세트 메뉴, 추가 메뉴 판매, 가격 인상</li>
                <li><strong>원가율 ↓</strong>: 식재료 협상, 폐기 최소화, 레시피 최적화</li>
                <li><strong>체류시간 ↓</strong>: 회전율 개선으로 더 많은 고객 수용</li>
                <li><strong>매출 믹스 조정</strong>: 고마진 채널 비중 확대 (배달↓, 매장↑)</li>
                <li><strong>고정비 ↓</strong>: 임대료 재협상, 구독 서비스 정리 (단, 쉽지 않음)</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">📉 자주하는 실수</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>고정비만 보고 계산</strong>: 변동비를 고려하지 않으면 큰 오산</li>
                <li><strong>배달 수수료 과소평가</strong>: 플랫폼 + 결제 수수료는 보통 12~17%</li>
                <li><strong>체류시간 무시</strong>: 좌석 20개 ≠ 하루 20명만 받을 수 있음</li>
                <li><strong>변동인건비 누락</strong>: 매출 증가 시 알바 추가 고용 비용</li>
                <li><strong>폐기율 누락</strong>: 식재료 폐기는 숨은 비용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 계산 예시 */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">🧮 계산 예시</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">예시 1: 소규모 카페</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 space-y-1">
                  <strong>고정비:</strong><br/>
                  - 임대료: 150만원<br/>
                  - 관리비: 20만원<br/>
                  - 공과금: 30만원<br/>
                  - 고정인건비: 200만원<br/>
                  - 기타: 50만원<br/>
                  → 합계: <strong>450만원</strong><br/><br/>
                  
                  <strong>변동비율:</strong><br/>
                  - 원가율: 30%<br/>
                  - 결제수수료: 2.5%<br/>
                  - 포장: 2%<br/>
                  → 합계: <strong>34.5%</strong><br/><br/>
                  
                  <strong>결과:</strong><br/>
                  - 공헌이익률: 65.5%<br/>
                  - 손익분기 월 매출: <strong>687만원</strong><br/>
                  - 영업일 26일 기준 일 매출: <strong>26.4만원</strong>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">예시 2: 배달 중심 음식점</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 space-y-1">
                  <strong>고정비:</strong> 800만원<br/>
                  <strong>변동비율:</strong><br/>
                  - 매장(40%): 원가 35% + 결제 2.5% + 포장 3% = 40.5%<br/>
                  - 배달(60%): 원가 35% + 결제 2.5% + 플랫폼 12% + 포장 5% = 54.5%<br/>
                  - 혼합 변동비율: 0.4×40.5% + 0.6×54.5% = <strong>48.9%</strong><br/><br/>
                  
                  <strong>결과:</strong><br/>
                  - 공헌이익률: 51.1%<br/>
                  - 손익분기 월 매출: <strong>1,565만원</strong><br/>
                  - 영업일 26일 기준 일 매출: <strong>60.2만원</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="card bg-yellow-50 border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ 주의사항</h2>
          <ul className="list-disc list-inside text-yellow-700 space-y-2 ml-4">
            <li>본 계산기는 추정 도구이며, 법률/세무/노무/투자 자문이 아닙니다.</li>
            <li>실제 사업은 계절성, 경쟁, 트렌드 등 다양한 변수가 영향을 미칩니다.</li>
            <li>프리셋 예시 값은 참고용이며, 반드시 실제 값으로 수정하세요.</li>
            <li>중요한 사업 결정 시에는 전문가(세무사, 회계사)의 조언을 받으세요.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
