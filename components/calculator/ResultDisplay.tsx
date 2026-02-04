'use client';

import { CalculationResult, BusinessInput, SensitivityAnalysis } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent, downloadCSV, copyToClipboard, printPage } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  result: CalculationResult;
  input: BusinessInput;
  sensitivity: SensitivityAnalysis;
}

export default function ResultDisplay({ result, input, sensitivity }: Props) {
  const [showSensitivity, setShowSensitivity] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDownloadCSV = () => {
    const data = [
      ['항목', '값'],
      ['총 고정비', formatCurrency(result.totalFixedCosts)],
      ['공헌이익률', formatPercent(result.contributionMarginRate)],
      ['손익분기 월매출', formatCurrency(result.breakEvenMonthlyRevenue)],
      ['손익분기 일매출', formatCurrency(result.breakEvenDailyRevenue)],
    ];

    if (result.targetProfitMonthlyRevenue) {
      data.push(['목표이익 월매출', formatCurrency(result.targetProfitMonthlyRevenue)]);
      data.push(['목표이익 일매출', formatCurrency(result.targetProfitDailyRevenue!)]);
    }

    data.push(['매장 필요주문(월)', formatNumber(result.storeRequiredOrdersMonthly)]);
    data.push(['매장 필요주문(일)', formatNumber(result.storeRequiredOrdersDaily)]);
    data.push(['배달 필요주문(월)', formatNumber(result.deliveryRequiredOrdersMonthly)]);
    data.push(['배달 필요주문(일)', formatNumber(result.deliveryRequiredOrdersDaily)]);

    downloadCSV(data, `손익분기점_계산결과_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleCopyJSON = async () => {
    const jsonData = JSON.stringify({ input, result }, null, 2);
    const success = await copyToClipboard(jsonData);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const getCapacityStatusColor = (status: string) => {
    switch (status) {
      case 'comfortable':
      case 'sufficient':
        return 'text-green-600 bg-green-50';
      case 'possible':
        return 'text-blue-600 bg-blue-50';
      case 'tight':
        return 'text-orange-600 bg-orange-50';
      case 'impossible':
      case 'overload':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCapacityStatusText = (status: string) => {
    switch (status) {
      case 'comfortable':
        return '여유 있음';
      case 'sufficient':
        return '충분함';
      case 'possible':
        return '가능';
      case 'tight':
        return '빡빡함';
      case 'impossible':
        return '현실적으로 어려움';
      case 'overload':
        return '과부하';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* 에러 표시 */}
      {result.errors.length > 0 && (
        <div className="alert-error">
          <h4 className="font-bold text-red-700 mb-2">❌ 계산 불가</h4>
          {result.errors.map((error, index) => (
            <p key={index} className="text-red-700">{error}</p>
          ))}
          <div className="mt-3 text-sm text-red-600">
            <p className="font-semibold">해결 방법:</p>
            <ul className="list-disc list-inside mt-1">
              <li>원가율을 낮추세요</li>
              <li>수수료율을 줄이세요 (배달 비중 감소 또는 수수료 협상)</li>
              <li>객단가를 올리세요</li>
              <li>포장비/소모품 비용을 줄이세요</li>
            </ul>
          </div>
        </div>
      )}

      {/* 경고 표시 */}
      {result.warnings.length > 0 && (
        <div className="alert-warning">
          <h4 className="font-bold text-yellow-700 mb-2">⚠️ 주의사항</h4>
          {result.warnings.map((warning, index) => (
            <p key={index} className="text-yellow-700">{warning}</p>
          ))}
        </div>
      )}

      {/* 핵심 재무 지표 */}
      {result.isValid && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📊 핵심 재무 지표</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">총 고정비</span>
              <span className="font-bold">{formatCurrency(result.totalFixedCosts)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">매장 변동비율</span>
              <span className="font-bold">{formatPercent(result.storeVariableRate)}</span>
            </div>
            {input.salesMix.deliveryShare > 0 && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">배달 변동비율</span>
                <span className="font-bold">{formatPercent(result.deliveryVariableRate)}</span>
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">혼합 변동비율</span>
              <span className="font-bold">{formatPercent(result.blendedVariableRate)}</span>
            </div>
            <div className="flex justify-between pb-2 bg-primary-50 p-3 rounded">
              <span className="font-bold text-primary-700">공헌이익률</span>
              <span className="font-bold text-primary-700 text-lg">{formatPercent(result.contributionMarginRate)}</span>
            </div>
          </div>
        </div>
      )}

      {/* 손익분기점 */}
      {result.isValid && (
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-900">💰 손익분기점</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-blue-700 mb-1">월 매출</p>
              <p className="text-3xl font-bold text-blue-900">{formatCurrency(result.breakEvenMonthlyRevenue)}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">일 매출</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.breakEvenDailyRevenue)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 목표 이익 필요 매출 */}
      {result.isValid && result.targetProfitMonthlyRevenue && (
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-xl font-bold mb-4 text-green-900">🎯 목표이익 필요매출</h3>
          <p className="text-sm text-green-700 mb-3">
            목표 순이익 {formatCurrency(input.targetProfit || 0)}을 달성하려면
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-green-700 mb-1">월 매출</p>
              <p className="text-3xl font-bold text-green-900">{formatCurrency(result.targetProfitMonthlyRevenue)}</p>
            </div>
            <div>
              <p className="text-sm text-green-700 mb-1">일 매출</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(result.targetProfitDailyRevenue!)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 필요 주문수 */}
      {result.isValid && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📦 필요 주문수/고객수</h3>
          <p className="text-sm text-gray-600 mb-4">
            {result.targetProfitMonthlyRevenue ? '목표이익' : '손익분기'} 달성에 필요한 주문수
          </p>

          {input.salesMix.storeShare > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">매장 ({input.salesMix.storeShare}%)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>월 주문수:</span>
                  <span className="font-bold">{formatNumber(result.storeRequiredOrdersMonthly)}건</span>
                </div>
                <div className="flex justify-between">
                  <span>일 주문수:</span>
                  <span className="font-bold">{formatNumber(result.storeRequiredOrdersDaily)}건</span>
                </div>
              </div>
            </div>
          )}

          {input.salesMix.deliveryShare > 0 && (
            <div className="p-3 bg-orange-50 rounded">
              <h4 className="font-semibold mb-2">배달 ({input.salesMix.deliveryShare}%)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>월 주문수:</span>
                  <span className="font-bold">{formatNumber(result.deliveryRequiredOrdersMonthly)}건</span>
                </div>
                <div className="flex justify-between">
                  <span>일 주문수:</span>
                  <span className="font-bold">{formatNumber(result.deliveryRequiredOrdersDaily)}건</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 현실가능성 캐파 체크 */}
      {result.isValid && result.capacityResult && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">✅ 현실가능성 캐파 체크</h3>

          {result.capacityResult.requiredAvgSeatOccupancy !== undefined && (
            <div className="mb-4 p-4 border rounded">
              <h4 className="font-semibold mb-2">매장 좌석 점유율</h4>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">필요 점유율:</span>
                  <span className="font-bold">{formatPercent(result.capacityResult.requiredAvgSeatOccupancy * 100)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-primary-600 h-4 rounded-full"
                    style={{ width: `${Math.min(100, result.capacityResult.requiredAvgSeatOccupancy * 100)}%` }}
                  />
                </div>
              </div>
              {result.capacityResult.storeCapacityStatus && (
                <div className={`mt-2 p-2 rounded text-center font-semibold ${getCapacityStatusColor(result.capacityResult.storeCapacityStatus)}`}>
                  {getCapacityStatusText(result.capacityResult.storeCapacityStatus)}
                </div>
              )}
            </div>
          )}

          {result.capacityResult.requiredDeliveryOrdersPerHour !== undefined && (
            <div className="p-4 border rounded">
              <h4 className="font-semibold mb-2">배달 처리량</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>필요 시간당 주문:</span>
                  <span className="font-bold">{formatNumber(result.capacityResult.requiredDeliveryOrdersPerHour)}건/시간</span>
                </div>
                <div className="flex justify-between">
                  <span>처리 가능량:</span>
                  <span className="font-bold">{formatNumber(result.capacityResult.deliveryCapacityOrdersPerHour || 0)}건/시간</span>
                </div>
              </div>
              {result.capacityResult.deliveryCapacityStatus && (
                <div className={`mt-2 p-2 rounded text-center font-semibold ${getCapacityStatusColor(result.capacityResult.deliveryCapacityStatus)}`}>
                  {getCapacityStatusText(result.capacityResult.deliveryCapacityStatus)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 민감도 분석 */}
      {result.isValid && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📈 민감도 분석</h3>
          <button
            onClick={() => setShowSensitivity(!showSensitivity)}
            className="btn-outline text-sm w-full mb-3"
          >
            {showSensitivity ? '숨기기' : '민감도 분석 보기'}
          </button>

          {showSensitivity && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">원가율 변화 영향 (±5%p)</h4>
                <div className="space-y-1 text-sm">
                  {sensitivity.cogsRateImpact.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>원가율 {formatPercent(item.rate)}:</span>
                      <span className="font-mono">{formatCurrency(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">객단가 변화 영향 (±10%)</h4>
                <div className="space-y-1 text-sm">
                  {sensitivity.aovImpact.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>객단가 {formatCurrency(item.aov)}:</span>
                      <span className="font-mono">{formatCurrency(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 액션 버튼 */}
      {result.isValid && (
        <div className="card no-print">
          <h3 className="text-lg font-bold mb-3">내보내기/공유</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleDownloadCSV} className="btn-outline text-sm">
              📥 CSV 다운로드
            </button>
            <button onClick={handleCopyJSON} className="btn-outline text-sm">
              {copySuccess ? '✅ 복사됨!' : '📋 JSON 복사'}
            </button>
            <button onClick={printPage} className="btn-outline text-sm col-span-2">
              🖨️ 인쇄/PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
