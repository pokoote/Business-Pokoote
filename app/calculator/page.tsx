'use client';

import { useState, useEffect } from 'react';
import { BusinessInput, CalculationResult, Scenario } from '@/lib/types';
import { calculateBreakEven, sensitivityCogsRate, sensitivityAov } from '@/lib/calculator';
import { getEmptyInput } from '@/lib/presets';
import InputForm from '@/components/calculator/InputForm';
import ResultsDisplay from '@/components/calculator/ResultsDisplay';

export default function CalculatorPage() {
  const [input, setInput] = useState<BusinessInput>(getEmptyInput());
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // 계산 실행 (입력 변경 시 자동)
  useEffect(() => {
    const calculated = calculateBreakEven(input);
    setResult(calculated);
  }, [input]);

  // 로컬스토리지에서 시나리오 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('scenarios');
    if (saved) {
      try {
        setScenarios(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load scenarios:', e);
      }
    }
  }, []);

  // 시나리오 저장
  const saveScenario = () => {
    const name = prompt('시나리오 이름을 입력하세요:');
    if (!name) return;

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name,
      input: { ...input },
      createdAt: Date.now(),
    };

    const updated = [...scenarios, newScenario].slice(-3); // 최대 3개만 저장
    setScenarios(updated);
    localStorage.setItem('scenarios', JSON.stringify(updated));
    alert(`시나리오 "${name}"이(가) 저장되었습니다.`);
  };

  // 시나리오 불러오기
  const loadScenario = (scenario: Scenario) => {
    setInput(scenario.input);
    alert(`시나리오 "${scenario.name}"을(를) 불러왔습니다.`);
  };

  // 시나리오 삭제
  const deleteScenario = (id: string) => {
    const updated = scenarios.filter((s) => s.id !== id);
    setScenarios(updated);
    localStorage.setItem('scenarios', JSON.stringify(updated));
  };

  // JSON 복사
  const copyJSON = () => {
    const json = JSON.stringify(input, null, 2);
    navigator.clipboard.writeText(json);
    alert('시나리오 JSON이 클립보드에 복사되었습니다.');
  };

  // CSV 다운로드
  const downloadCSV = () => {
    if (!result) return;

    const csv = `항목,값
고정비,${result.totalFixedCosts}
혼합 변동비율,${(result.blendedVariableRate * 100).toFixed(2)}%
공헌이익률,${(result.contributionMarginRate * 100).toFixed(2)}%
월 손익분기 매출,${result.breakEvenMonthlyRevenue}
일 손익분기 매출,${result.breakEvenDailyRevenue}
${result.targetProfitMonthlyRevenue ? `월 목표이익 필요매출,${result.targetProfitMonthlyRevenue}\n` : ''}${result.targetProfitDailyRevenue ? `일 목표이익 필요매출,${result.targetProfitDailyRevenue}\n` : ''}월 필요 주문수,${result.requiredOrders.total.monthly}
일 필요 주문수,${result.requiredOrders.total.daily}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `손익분기점_결과_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // 인쇄
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            손익분기점 계산기
          </h1>
          <p className="text-gray-600">
            자영업 손익분기점, 목표매출, 현실가능성까지 한 번에 계산하세요.
          </p>
        </div>

        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 영역 */}
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4">📝 입력</h2>
              <InputForm input={input} setInput={setInput} />
            </div>

            {/* 액션 버튼 */}
            <div className="card">
              <h3 className="font-bold mb-3">💾 시나리오 관리</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={saveScenario} className="btn-primary text-sm">
                  시나리오 저장
                </button>
                <button onClick={copyJSON} className="btn-outline text-sm">
                  JSON 복사
                </button>
                <button onClick={downloadCSV} className="btn-outline text-sm" disabled={!result}>
                  CSV 다운로드
                </button>
                <button onClick={handlePrint} className="btn-outline text-sm">
                  인쇄/PDF
                </button>
              </div>

              {/* 저장된 시나리오 목록 */}
              {scenarios.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">저장된 시나리오 ({scenarios.length}/3)</h4>
                  <div className="space-y-2">
                    {scenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded border"
                      >
                        <span className="text-sm font-medium">{scenario.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadScenario(scenario)}
                            className="text-xs text-primary-600 hover:underline"
                          >
                            불러오기
                          </button>
                          <button
                            onClick={() => deleteScenario(scenario.id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 결과 영역 */}
          <div>
            <div className="card">
              <h2 className="text-xl font-bold mb-4">📊 결과</h2>
              {result ? (
                <ResultsDisplay result={result} />
              ) : (
                <p className="text-gray-500">입력값을 입력하면 결과가 표시됩니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* 면책사항 */}
        <div className="mt-8 card bg-yellow-50 border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-2">⚠️ 면책사항</h3>
          <p className="text-sm text-yellow-700">
            본 계산기는 추정 계산 도구이며, 법률/세무/노무/투자 자문이 아닙니다.
            실제 사업 결정 시 전문가의 조언을 받으시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
