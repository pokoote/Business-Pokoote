'use client';

import { useState, useEffect } from 'react';
import { BusinessInput, CalculationResult, Scenario } from '@/lib/types';
import { getScenarios, saveScenario, deleteScenario, clearAllScenarios } from '@/lib/storage';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface Props {
  currentInput: BusinessInput;
  currentResult: CalculationResult;
}

export default function ScenarioManager({ currentInput, currentResult }: Props) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioName, setScenarioName] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  // 시나리오 목록 로드
  useEffect(() => {
    setScenarios(getScenarios());
  }, []);

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) {
      alert('시나리오 이름을 입력하세요.');
      return;
    }

    if (!currentResult.isValid) {
      alert('유효한 계산 결과가 있어야 저장할 수 있습니다.');
      return;
    }

    const success = saveScenario({
      name: scenarioName,
      input: currentInput,
      result: currentResult,
    });

    if (success) {
      setScenarioName('');
      setScenarios(getScenarios());
      alert('시나리오가 저장되었습니다.');
    }
  };

  const handleDeleteScenario = (id: string) => {
    if (confirm('이 시나리오를 삭제하시겠습니까?')) {
      deleteScenario(id);
      setScenarios(getScenarios());
    }
  };

  const handleClearAll = () => {
    if (confirm('모든 시나리오를 삭제하시겠습니까?')) {
      clearAllScenarios();
      setScenarios([]);
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">💾 시나리오 저장/비교</h3>

      {/* 저장 */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">현재 계산 저장하기</h4>
        <div className="flex gap-2">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="시나리오 이름 (예: 임대료 인상안)"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            maxLength={50}
          />
          <button
            onClick={handleSaveScenario}
            className="btn-primary whitespace-nowrap"
            disabled={scenarios.length >= 3}
          >
            저장
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          최대 3개까지 저장 가능 (현재: {scenarios.length}/3)
        </p>
      </div>

      {/* 저장된 시나리오 목록 */}
      {scenarios.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">저장된 시나리오</h4>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:underline"
            >
              전체 삭제
            </button>
          </div>

          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-bold">{scenario.name}</h5>
                    <p className="text-xs text-gray-500">
                      {new Date(scenario.createdAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteScenario(scenario.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    삭제
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">손익분기:</span>
                    <span className="ml-1 font-semibold">
                      {formatCurrency(scenario.result.breakEvenMonthlyRevenue)}
                    </span>
                  </div>
                  {scenario.result.targetProfitMonthlyRevenue && (
                    <div>
                      <span className="text-gray-600">목표매출:</span>
                      <span className="ml-1 font-semibold">
                        {formatCurrency(scenario.result.targetProfitMonthlyRevenue)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">공헌이익률:</span>
                    <span className="ml-1 font-semibold">
                      {formatPercent(scenario.result.contributionMarginRate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">고정비:</span>
                    <span className="ml-1 font-semibold">
                      {formatCurrency(scenario.result.totalFixedCosts)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 비교 */}
      {scenarios.length >= 2 && (
        <div>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="btn-outline w-full mb-3"
          >
            {showComparison ? '비교 숨기기' : '시나리오 비교하기'}
          </button>

          {showComparison && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">항목</th>
                    {scenarios.map((scenario) => (
                      <th key={scenario.id} className="border p-2 text-left">
                        {scenario.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">고정비</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2">
                        {formatCurrency(scenario.result.totalFixedCosts)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">변동비율</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2">
                        {formatPercent(scenario.result.blendedVariableRate)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">공헌이익률</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2 font-bold">
                        {formatPercent(scenario.result.contributionMarginRate)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border p-2 font-medium">손익분기 월매출</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2 font-bold">
                        {formatCurrency(scenario.result.breakEvenMonthlyRevenue)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border p-2 font-medium">손익분기 일매출</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2 font-bold">
                        {formatCurrency(scenario.result.breakEvenDailyRevenue)}
                      </td>
                    ))}
                  </tr>
                  {scenarios.some(s => s.result.targetProfitMonthlyRevenue) && (
                    <>
                      <tr className="bg-green-50">
                        <td className="border p-2 font-medium">목표 월매출</td>
                        {scenarios.map((scenario) => (
                          <td key={scenario.id} className="border p-2 font-bold">
                            {scenario.result.targetProfitMonthlyRevenue
                              ? formatCurrency(scenario.result.targetProfitMonthlyRevenue)
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-green-50">
                        <td className="border p-2 font-medium">목표 일매출</td>
                        {scenarios.map((scenario) => (
                          <td key={scenario.id} className="border p-2 font-bold">
                            {scenario.result.targetProfitDailyRevenue
                              ? formatCurrency(scenario.result.targetProfitDailyRevenue)
                              : '-'}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className="border p-2 font-medium">매장 일주문수</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2">
                        {formatCurrency(scenario.result.storeRequiredOrdersDaily)}건
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">배달 일주문수</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="border p-2">
                        {formatCurrency(scenario.result.deliveryRequiredOrdersDaily)}건
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
