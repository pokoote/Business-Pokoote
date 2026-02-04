import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">📚 손익분기점 가이드</h1>
          <p className="text-xl text-gray-700 mb-12">
            자영업자 눈높이로 풀어쓴 손익분기점, 공헌이익, 원가관리 핵심 개념
          </p>

          {/* 핵심 개념 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">1. 고정비 vs 변동비</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">고정비 (Fixed Costs)</h3>
              <p className="text-gray-700 mb-3">
                <strong>매출과 관계없이 매달 나가는 비용</strong>입니다. 
                장사가 잘 되든 안 되든 빠져나가는 돈이기 때문에, 고정비가 높으면 압박이 큽니다.
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold mb-2">예시:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>임대료: 200만원</li>
                  <li>관리비: 20만원</li>
                  <li>고정 인건비(정규직 월급): 300만원</li>
                  <li>통신비, 보험료, 리스료 등</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">변동비 (Variable Costs)</h3>
              <p className="text-gray-700 mb-3">
                <strong>매출에 비례해서 증가하는 비용</strong>입니다. 
                팔면 팔수록 늘어나지만, 안 팔면 나가지 않는 비용입니다.
              </p>
              <div className="bg-orange-50 p-4 rounded">
                <p className="font-semibold mb-2">예시:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>원가 (재료비, 매입가)</li>
                  <li>카드 결제 수수료 (매출의 2.5%)</li>
                  <li>배달 플랫폼 수수료 (매출의 12~15%)</li>
                  <li>포장재, 일회용품</li>
                  <li>폐기/손실</li>
                </ul>
              </div>
            </div>

            <div className="alert-info">
              <p className="font-semibold">💡 핵심:</p>
              <p>
                고정비는 "버텨야 할 돈", 변동비는 "팔면서 나가는 돈"입니다. 
                손익분기점은 이 두 가지를 어떻게 커버하느냐의 문제입니다.
              </p>
            </div>
          </section>

          {/* 공헌이익 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">2. 공헌이익률 (Contribution Margin Ratio)</h2>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                <strong>공헌이익률 = 1 - 변동비율</strong>
              </p>
              <p className="text-gray-700 mb-4">
                매출 1원당 <strong>고정비를 갚는 데 기여하는 금액의 비율</strong>입니다.
              </p>
              
              <div className="bg-green-50 p-4 rounded mb-4">
                <p className="font-semibold mb-2">예시 1: 공헌이익률 50%</p>
                <ul className="space-y-1 text-sm">
                  <li>• 매출 100만원이 발생하면</li>
                  <li>• 변동비로 50만원이 나가고</li>
                  <li>• 남은 50만원이 고정비를 갚는데 쓰입니다</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-semibold mb-2">예시 2: 공헌이익률 30%</p>
                <ul className="space-y-1 text-sm">
                  <li>• 매출 100만원이 발생하면</li>
                  <li>• 변동비로 70만원이 나가고</li>
                  <li>• 남은 30만원만 고정비를 갚습니다</li>
                </ul>
              </div>
            </div>

            <div className="alert-warning">
              <p className="font-semibold">⚠️ 공헌이익률이 낮으면 (30% 이하):</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>손익분기점 매출이 매우 높아집니다</li>
                <li>많이 팔아도 이익이 적습니다</li>
                <li>원가율, 수수료율 개선이 시급합니다</li>
              </ul>
            </div>
          </section>

          {/* 손익분기 공식 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">3. 손익분기점 공식</h2>
            
            <div className="bg-blue-100 p-6 rounded-lg mb-6 text-center">
              <p className="text-2xl font-bold text-blue-900 mb-2">
                손익분기점 매출 = 고정비 ÷ 공헌이익률
              </p>
              <p className="text-sm text-blue-700">
                이 매출을 달성하면 이익도 손실도 없는 "본전" 상태
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">계산 예시</h3>
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="font-semibold mb-2">조건:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>월 고정비: 620만원</li>
                  <li>원가율: 35%</li>
                  <li>수수료 등: 5%</li>
                  <li>공헌이익률: 60% (= 100% - 40%)</li>
                </ul>

                <p className="font-semibold mb-2">계산:</p>
                <p className="text-lg text-gray-800 mb-1">
                  손익분기점 = 6,200,000원 ÷ 0.60 = <strong className="text-primary-600">10,333,333원</strong>
                </p>
                <p className="text-sm text-gray-600">
                  월 26일 영업 시 일 매출 <strong>397,436원</strong> 필요
                </p>
              </div>
            </div>

            <div className="bg-green-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-900 mb-2">
                목표 필요매출 = (고정비 + 목표이익) ÷ 공헌이익률
              </p>
              <p className="text-sm text-green-700">
                목표 순이익을 달성하려면 얼마를 팔아야 하는지
              </p>
            </div>
          </section>

          {/* 현실 팁 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">4. 현실 팁: 레버 당기기</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="text-2xl mr-2">🔻</span>
                  원가율 2%p 낮추기의 파괴력
                </h3>
                <p className="text-gray-700 mb-3">
                  원가율이 35%→33%로 2%p만 떨어져도 공헌이익률이 2%p 상승합니다.
                  고정비가 600만원이라면:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded">
                    <p className="font-semibold text-red-700">원가율 35%</p>
                    <p className="text-sm">공헌이익률 60%</p>
                    <p className="text-lg font-bold">필요매출: 1,000만원</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="font-semibold text-green-700">원가율 33%</p>
                    <p className="text-sm">공헌이익률 62%</p>
                    <p className="text-lg font-bold">필요매출: 968만원</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  → 월 32만원, 일 1.2만원 부담 감소!
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="text-2xl mr-2">📈</span>
                  객단가 올리기
                </h3>
                <p className="text-gray-700 mb-2">
                  같은 주문수로 매출을 올리는 가장 직접적인 방법:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-blue-50 p-4 rounded">
                  <li>세트 메뉴, 업셀링 (사이드 추가)</li>
                  <li>고마진 메뉴 비중 높이기</li>
                  <li>적정 가격 인상 (원가 상승 반영)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="text-2xl mr-2">⏱️</span>
                  체류시간 단축 (회전율 높이기)
                </h3>
                <p className="text-gray-700 mb-2">
                  카페나 음식점은 좌석이 한정되어 있습니다. 같은 좌석에서 더 많은 고객을 받으려면:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-orange-50 p-4 rounded">
                  <li>서빙 속도 개선, 주문 시스템 간소화</li>
                  <li>테이블 정리 최적화</li>
                  <li>피크타임 자리 회전 집중 관리</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="text-2xl mr-2">💳</span>
                  수수료 줄이기
                </h3>
                <p className="text-gray-700 mb-2">
                  배달 수수료 12%는 생각보다 큰 부담입니다:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-purple-50 p-4 rounded">
                  <li>배달 비중 조절 (매장 비중 늘리기)</li>
                  <li>자체 배달 검토 (소량 주문 시)</li>
                  <li>플랫폼 협상, 중개수수료 개선 프로그램 활용</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 자주하는 실수 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">5. 자주하는 실수</h2>
            
            <div className="space-y-4">
              <div className="alert-error">
                <p className="font-bold text-red-700 mb-2">❌ 실수 1: "원가만" 변동비로 생각</p>
                <p className="text-sm text-red-600">
                  카드 수수료, 배달 수수료, 포장재도 변동비입니다. 
                  원가율만 보고 계산하면 실제 필요매출보다 훨씬 낮게 나옵니다.
                </p>
              </div>

              <div className="alert-error">
                <p className="font-bold text-red-700 mb-2">❌ 실수 2: 고정비에 "나 월급" 안 넣기</p>
                <p className="text-sm text-red-600">
                  본인의 생활비(월급)도 고정비 또는 목표이익에 포함해야 합니다. 
                  그래야 "진짜 필요한 매출"이 나옵니다.
                </p>
              </div>

              <div className="alert-error">
                <p className="font-bold text-red-700 mb-2">❌ 실수 3: 폐기/누락 무시</p>
                <p className="text-sm text-red-600">
                  음식점은 재료 폐기가 2~5% 발생합니다. 
                  배달은 취소/누락이 있습니다. 이를 변동비에 반영하세요.
                </p>
              </div>

              <div className="alert-error">
                <p className="font-bold text-red-700 mb-2">❌ 실수 4: 캐파 체크 안 하기</p>
                <p className="text-sm text-red-600">
                  계산상 월 3,000만원이 필요해도, 좌석 20석에 체류시간 60분이면 
                  물리적으로 불가능할 수 있습니다. 현실가능성을 꼭 확인하세요.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              지금 바로 내 사업의 손익분기점을 계산해보세요
            </h3>
            <p className="mb-6">
              실제 숫자로 입력하고, 어떤 레버를 당겨야 할지 확인하세요
            </p>
            <Link href="/calculator" className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              계산기로 이동 →
            </Link>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
