import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">ℹ️ 소개</h1>
          
          {/* 도구의 목적 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">도구의 목적</h2>
            <p className="text-gray-700 mb-4">
              <strong>손익분기점 계산기</strong>는 자영업자가 "이번 달에 얼마를 팔아야 하는지"를 
              30초 안에 확인할 수 있도록 만든 무료 재무 시뮬레이터입니다.
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold mb-2">이 도구로 할 수 있는 것:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>손익분기점 매출 계산 (월/일)</li>
                <li>목표 순이익 달성에 필요한 매출 계산</li>
                <li>필요한 주문수/고객수 계산 (매장/배달 분리)</li>
                <li>좌석·체류시간 기반 현실가능성(캐파) 체크</li>
                <li>원가율·객단가 변화에 따른 민감도 분석</li>
                <li>최대 3개 시나리오 저장/비교 (임대료 인상, 배달 비중 증가 등)</li>
              </ul>
            </div>
          </section>

          {/* 면책사항 */}
          <section className="card mb-8 border-2 border-yellow-400">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">⚠️ 면책사항 (반드시 읽어주세요)</h2>
            
            <div className="space-y-4 text-gray-800">
              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-bold mb-2">1. 추정 계산 도구입니다</p>
                <p className="text-sm">
                  본 도구는 입력된 데이터를 기반으로 <strong>추정 계산</strong>을 수행하는 도구입니다.
                  법률 자문, 세무 자문, 회계 자문, 노무 자문, 투자 자문이 아닙니다.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-bold mb-2">2. 실제와 차이가 있을 수 있습니다</p>
                <p className="text-sm">
                  계산 결과는 입력값의 정확도에 따라 달라지며, 실제 사업 결과와 차이가 있을 수 있습니다.
                  모든 사업은 고유한 상황과 변수가 있으므로, 본 도구의 결과를 맹신하지 마시고 
                  참고 자료로만 활용하시기 바랍니다.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-bold mb-2">3. 전문가 상담을 권장합니다</p>
                <p className="text-sm">
                  창업, 사업 확장, 구조 변경 등 중요한 의사결정 시에는 반드시 
                  <strong>세무사, 회계사, 경영 컨설턴트 등 전문가와 상담</strong>하시기 바랍니다.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-bold mb-2">4. 책임 제한</p>
                <p className="text-sm">
                  본 도구의 사용으로 인해 발생하는 직간접적 손해, 손실, 기회 상실 등에 대해 
                  제작자 및 운영자는 어떠한 법적 책임도 지지 않습니다.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded border border-red-300">
                <p className="font-bold text-red-700 mb-2">5. 사용자의 책임</p>
                <p className="text-sm text-red-600">
                  본 도구를 사용함으로써 귀하는 위 내용을 이해하고 동의한 것으로 간주됩니다.
                  모든 입력 데이터의 정확성과 사업 의사결정의 책임은 전적으로 사용자에게 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 데이터 처리 방침 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">🔒 데이터 처리 방침</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">개인정보 수집 없음</h3>
                <p className="text-gray-700 text-sm">
                  본 사이트는 <strong>개인정보를 일절 수집하지 않습니다</strong>. 
                  이름, 전화번호, 이메일, 사업자번호 등 어떠한 개인 식별 정보도 요구하지 않습니다.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">로컬 저장소만 사용</h3>
                <p className="text-gray-700 text-sm mb-2">
                  입력하신 모든 데이터와 시나리오는 <strong>귀하의 브라우저 로컬 저장소(localStorage)</strong>에만 저장됩니다.
                </p>
                <div className="bg-green-50 p-3 rounded text-sm">
                  <p className="font-semibold text-green-800 mb-1">이것이 의미하는 것:</p>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    <li>데이터가 서버로 전송되지 않습니다</li>
                    <li>제작자/운영자가 귀하의 데이터를 볼 수 없습니다</li>
                    <li>브라우저 캐시를 삭제하면 저장된 시나리오도 삭제됩니다</li>
                    <li>다른 기기나 브라우저에서는 저장된 시나리오를 볼 수 없습니다</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">로그인/회원가입 없음</h3>
                <p className="text-gray-700 text-sm">
                  본 사이트는 로그인이나 회원가입을 요구하지 않습니다. 
                  방문 즉시 모든 기능을 자유롭게 사용할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">쿠키 사용 최소화</h3>
                <p className="text-gray-700 text-sm">
                  필수적인 기능 구동을 위한 최소한의 쿠키만 사용하며, 
                  추적/마케팅 목적의 쿠키는 사용하지 않습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 기술 스택 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">🛠️ 기술 스택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">프론트엔드</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• TypeScript</li>
                  <li>• TailwindCSS</li>
                  <li>• Recharts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">검증 & 상태관리</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Zod (입력 검증)</li>
                  <li>• React State</li>
                  <li>• Browser localStorage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 오픈소스 & 기여 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">🤝 개선 제안 & 문의</h2>
            <p className="text-gray-700 mb-4">
              본 도구는 자영업자분들에게 실질적인 도움을 드리기 위해 만들어졌습니다.
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold mb-2">이런 경우 연락주세요:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>계산 로직에 오류가 있는 것 같아요</li>
                <li>이런 기능이 추가되면 좋겠어요</li>
                <li>사용 중 버그를 발견했어요</li>
                <li>UI/UX 개선 아이디어가 있어요</li>
              </ul>
            </div>
          </section>

          {/* 업데이트 내역 */}
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">📅 버전 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="border-l-4 border-primary-500 pl-3">
                <p className="font-bold">v1.0.0 (2024-01-01)</p>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  <li>손익분기점 계산 기능</li>
                  <li>목표이익 필요매출 계산</li>
                  <li>현실가능성 캐파 체크</li>
                  <li>시나리오 저장/비교 (최대 3개)</li>
                  <li>민감도 분석</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary-600 to-blue-700 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              지금 바로 손익분기점을 계산해보세요
            </h3>
            <p className="mb-6">
              무료, 로그인 불필요, 30초 완성
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                계산기 시작하기
              </Link>
              <Link href="/guide" className="inline-block bg-primary-700 text-white font-bold px-8 py-3 rounded-lg border-2 border-white hover:bg-primary-800 transition-colors">
                가이드 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
