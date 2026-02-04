import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  // FAQPage 구조화 데이터
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "손익분기점이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "손익분기점은 매출이 총비용(고정비+변동비)과 같아지는 지점입니다. 이 매출액을 달성하면 이익도 손실도 발생하지 않는 '본전' 상태가 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "공헌이익률이란?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "공헌이익률 = 1 - 변동비율입니다. 매출 1원당 고정비 회수에 기여하는 금액의 비율을 나타냅니다. 예를 들어 공헌이익률이 50%라면 매출 100만원 중 50만원이 고정비를 갚는데 쓰입니다."
        }
      },
      {
        "@type": "Question",
        "name": "변동비와 고정비는 어떻게 구분하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "고정비는 매출과 관계없이 매달 나가는 비용(임대료, 고정 인건비 등)입니다. 변동비는 매출에 비례해 증가하는 비용(원가, 카드 수수료, 배달 수수료 등)입니다."
        }
      },
      {
        "@type": "Question",
        "name": "배달과 매장 비중은 왜 나눠서 입력하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "배달과 매장은 객단가와 수수료가 다릅니다. 배달은 플랫폼 수수료가 추가로 발생하며, 정확한 계산을 위해 각 채널의 비중과 객단가를 따로 입력합니다."
        }
      },
      {
        "@type": "Question",
        "name": "현실가능성(캐파) 체크는 왜 필요한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "계산상 필요한 매출이 나와도, 실제로 매장의 좌석 수나 주방 처리 능력으로 달성 가능한지 확인해야 합니다. 불가능한 목표를 세우지 않도록 도와줍니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 계산 결과로 사업을 시작해도 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "본 도구는 추정 계산 도구이며, 법률/세무/투자 자문이 아닙니다. 실제 창업이나 중요한 의사결정 시에는 반드시 전문가와 상담하시기 바랍니다."
        }
      },
      {
        "@type": "Question",
        "name": "입력한 정보는 어디에 저장되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "모든 데이터는 귀하의 브라우저 로컬 저장소에만 저장되며, 서버로 전송되지 않습니다. 개인정보를 수집하지 않습니다."
        }
      },
      {
        "@type": "Question",
        "name": "원가율이 2%p 오르면 얼마나 영향이 크나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "원가율 2%p 상승은 공헌이익률을 2%p 낮춥니다. 예를 들어 공헌이익률이 40%→38%로 떨어지면, 필요매출은 약 5% 증가합니다. 원가 관리가 매우 중요합니다."
        }
      },
      {
        "@type": "Question",
        "name": "시나리오 저장은 몇 개까지 가능한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "최대 3개의 시나리오를 로컬 저장소에 저장할 수 있습니다. 임대료 인상, 배달 비중 증가 등 다양한 시나리오를 비교해보세요."
        }
      },
      {
        "@type": "Question",
        "name": "민감도 분석은 어떻게 활용하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "원가율이나 객단가가 변동할 때 필요매출이 얼마나 변하는지 시뮬레이션합니다. 어떤 요소가 수익성에 가장 큰 영향을 미치는지 파악하여 전략을 세울 수 있습니다."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                손익분기점 · 목표매출 · 현실가능성까지<br className="hidden sm:block" />
                <span className="text-primary-600">한 번에</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                자영업자를 위한 30초 재무 시뮬레이터<br />
                이번 달 얼마를 팔아야 본전인지, 목표 이익을 달성하려면 얼마나 필요한지<br />
                그리고 그게 현실적으로 가능한지까지 체크하세요
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/calculator" className="btn-primary text-lg px-8 py-4">
                  지금 바로 계산하기 →
                </Link>
                <Link href="/guide" className="btn-secondary text-lg px-8 py-4">
                  사용법 보기
                </Link>
              </div>
              
              <p className="text-sm text-gray-600">
                ✓ 로그인 불필요 ✓ 개인정보 수집 없음 ✓ 무료 사용
              </p>
            </div>
          </section>
          
          {/* CTA Cards */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold mb-2">손익분기 계산</h3>
                  <p className="text-gray-600 mb-4">
                    월 고정비와 변동비율을 입력하면 손익분기점 매출(월/일)을 즉시 확인
                  </p>
                  <Link href="/calculator" className="text-primary-600 font-semibold hover:underline">
                    계산하기 →
                  </Link>
                </div>
                
                <div className="card hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">목표이익 계산</h3>
                  <p className="text-gray-600 mb-4">
                    목표 순이익(예: 월 300만원)을 달성하려면 얼마나 팔아야 하는지 계산
                  </p>
                  <Link href="/calculator" className="text-primary-600 font-semibold hover:underline">
                    계산하기 →
                  </Link>
                </div>
                
                <div className="card hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2">현실가능성 체크</h3>
                  <p className="text-gray-600 mb-4">
                    좌석·체류시간·영업시간 기준으로 목표가 현실적으로 가능한지 검증
                  </p>
                  <Link href="/calculator" className="text-primary-600 font-semibold hover:underline">
                    체크하기 →
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* 업종별 프리셋 */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                업종별 예시 시나리오
              </h3>
              <p className="text-center text-gray-600 mb-8">
                아래 예시를 클릭하면 계산기로 이동하며 기본값이 채워집니다.<br />
                <span className="text-sm text-orange-600 font-semibold">
                  ※ 예시 숫자는 참고용이며, 실제 사업에는 반드시 본인의 실제 수치를 입력하세요.
                </span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/calculator?preset=restaurant"
                  className="card hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-5xl mb-3">🍜</div>
                  <h4 className="text-lg font-bold mb-2">음식점</h4>
                  <p className="text-sm text-gray-600">
                    매장 60% · 배달 40%<br />
                    객단가 15,000원
                  </p>
                </Link>
                
                <Link
                  href="/calculator?preset=cafe"
                  className="card hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-5xl mb-3">☕</div>
                  <h4 className="text-lg font-bold mb-2">카페</h4>
                  <p className="text-sm text-gray-600">
                    매장 80% · 배달 20%<br />
                    객단가 8,000원
                  </p>
                </Link>
                
                <Link
                  href="/calculator?preset=retail"
                  className="card hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-5xl mb-3">🛍️</div>
                  <h4 className="text-lg font-bold mb-2">소매점</h4>
                  <p className="text-sm text-gray-600">
                    매장 70% · 온라인 30%<br />
                    객단가 35,000원
                  </p>
                </Link>
                
                <Link
                  href="/calculator?preset=service"
                  className="card hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-5xl mb-3">💇</div>
                  <h4 className="text-lg font-bold mb-2">서비스업</h4>
                  <p className="text-sm text-gray-600">
                    매장 100%<br />
                    객단가 50,000원
                  </p>
                </Link>
              </div>
            </div>
          </section>
          
          {/* 핵심 개념 요약 */}
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                핵심 개념 3줄 요약
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-lg mb-1">고정비 vs 변동비</h4>
                  <p className="text-gray-700">
                    <strong>고정비</strong>는 매출과 상관없이 매달 나가는 비용(임대료, 고정 인건비 등).
                    <strong>변동비</strong>는 매출에 비례해 증가하는 비용(원가, 카드 수수료, 배달 수수료 등).
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-lg mb-1">공헌이익률</h4>
                  <p className="text-gray-700">
                    <strong>공헌이익률 = 1 - 변동비율</strong>. 매출 1원당 고정비 회수에 기여하는 금액의 비율.
                    공헌이익률이 높을수록 빠르게 손익분기점을 돌파할 수 있습니다.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-lg mb-1">손익분기 공식</h4>
                  <p className="text-gray-700">
                    <strong>손익분기점 매출 = 고정비 ÷ 공헌이익률</strong>.
                    목표 이익이 있다면 <strong>(고정비 + 목표이익) ÷ 공헌이익률</strong>로 필요매출을 계산합니다.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link href="/guide" className="btn-outline">
                  더 자세한 설명 보기 →
                </Link>
              </div>
            </div>
          </section>
          
          {/* FAQ */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                자주 묻는 질문 (FAQ)
              </h3>
              
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq, index) => (
                  <details key={index} className="card group">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                      <span>{faq.name}</span>
                      <span className="text-primary-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          
          {/* 신뢰 요소 & 면책 */}
          <section className="py-12 bg-yellow-50 border-t-4 border-yellow-400">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-bold mb-4 text-center">⚠️ 중요 안내사항</h3>
              <div className="space-y-3 text-gray-800">
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>본 도구는 <strong>추정 계산 도구</strong>이며, 법률/세무/노무/투자 자문이 아닙니다.</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>실제 사업 의사결정 시에는 <strong>반드시 전문가와 상담</strong>하시기 바랍니다.</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>계산 결과는 입력값의 정확도에 따라 달라지며, 실제와 차이가 있을 수 있습니다.</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>본 사이트는 <strong>개인정보를 수집하지 않으며</strong>, 모든 데이터는 귀하의 브라우저 로컬 저장소에만 저장됩니다.</span>
                </p>
              </div>
            </div>
          </section>
          
          {/* 최종 CTA */}
          <section className="py-16 bg-primary-600 text-white text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-3xl font-bold mb-4">
                지금 바로 손익분기점을 계산해보세요
              </h3>
              <p className="text-xl mb-8">
                30초 입력으로 월/일 필요매출과 필요 주문수를 확인하세요
              </p>
              <Link href="/calculator" className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg">
                계산기 시작하기 →
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
