'use client';

import { CalculationResult } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/calculator';

interface Props {
  result: CalculationResult;
}

export default function ResultsDisplay({ result }: Props) {
  if (!result.isValid) {
    return (
      <div className="warning-card">
        <h3 className="text-lg font-bold text-red-700 mb-3">⚠️ 계산 불가능</h3>
        <div className="space-y-2">
          {result.warnings.map((warning, idx) => (
            <p key={idx} className="text-sm text-red-600">
              {warning}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 경고 메시지 */}
      {result.warnings.length > 0 && (
        <div className="warning-card">
          <h3 className="text-lg font-bold text-orange-700 mb-2">⚠️ 주의사항</h3>
          <div className="space-y-1">
            {result.warnings.map((warning, idx) => (
              <p key={idx} className="text-sm text-orange-600">
                {warning}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 핵심 재무 지표 */}
      <div className="result-card">
        <h3 className="text-lg font-bold mb-4">📊 핵심 재무 지표</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-1">고정비</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(result.totalFixedCosts)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-1">혼합 변동비율</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPercent(result.blendedVariableRate)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-1">공헌이익률</p>
            <p className="text-xl font-bold text-primary-600">
              {formatPercent(result.contributionMarginRate)}
            </p>
          </div>
        </div>
      </div>

      {/* 손익분기점 */}
      <div className="success-card">
        <h3 className="text-lg font-bold text-green-700 mb-4">✅ 손익분기점</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">월 손익분기 매출</p>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(result.breakEvenMonthlyRevenue)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">일 손익분기 매출</p>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(result.breakEvenDailyRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* 목표이익 필요매출 */}
      {result.targetProfitMonthlyRevenue && result.targetProfitDailyRevenue && (
        <div className="info-card">
          <h3 className="text-lg font-bold text-blue-700 mb-4">🎯 목표이익 달성 필요매출</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">월 필요매출</p>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(result.targetProfitMonthlyRevenue)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">일 필요매출</p>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(result.targetProfitDailyRevenue)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 필요 주문수/고객수 */}
      <div className="result-card">
        <h3 className="text-lg font-bold mb-4">📈 필요 주문수 (손익분기 기준)</h3>
        <div className="space-y-4">
          {/* 매장 */}
          {result.requiredOrders.store.monthly > 0 && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-primary-600 mb-2">🏪 매장</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">월 필요 주문수</p>
                  <p className="text-lg font-bold">
                    {formatNumber(result.requiredOrders.store.monthly, 0)}건
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">일 필요 주문수</p>
                  <p className="text-lg font-bold">
                    {formatNumber(result.requiredOrders.store.daily, 1)}건
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 배달 */}
          {result.requiredOrders.delivery.monthly > 0 && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-primary-600 mb-2">🛵 배달</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">월 필요 주문수</p>
                  <p className="text-lg font-bold">
                    {formatNumber(result.requiredOrders.delivery.monthly, 0)}건
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">일 필요 주문수</p>
                  <p className="text-lg font-bold">
                    {formatNumber(result.requiredOrders.delivery.daily, 1)}건
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 합계 */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
            <h4 className="font-semibold mb-2">📊 전체 합계</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">월 필요 주문수</p>
                <p className="text-xl font-bold text-primary-700">
                  {formatNumber(result.requiredOrders.total.monthly, 0)}건
                </p>
              </div>
              <div>
                <p className="text-gray-600">일 필요 주문수</p>
                <p className="text-xl font-bold text-primary-700">
                  {formatNumber(result.requiredOrders.total.daily, 1)}건
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 현실가능성 캐파 체크 */}
      {result.capacityAnalysis && (
        <div className="result-card">
          <h3 className="text-lg font-bold mb-4">🔍 현실가능성 캐파 체크</h3>

          {/* 매장 캐파 */}
          {result.capacityAnalysis.store && (
            <div className="mb-4">
              <div
                className={`p-4 rounded-lg border-2 ${
                  result.capacityAnalysis.store.status === 'feasible'
                    ? 'bg-green-50 border-green-300'
                    : result.capacityAnalysis.store.status === 'tight'
                    ? 'bg-yellow-50 border-yellow-300'
                    : result.capacityAnalysis.store.status === 'difficult'
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <h4 className="font-semibold mb-2">🏪 매장 좌석 점유율</h4>
                <p className="text-2xl font-bold mb-1">
                  {formatPercent(result.capacityAnalysis.store.requiredAvgSeatOccupancy, 1)}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    result.capacityAnalysis.store.status === 'feasible'
                      ? 'text-green-700'
                      : result.capacityAnalysis.store.status === 'tight'
                      ? 'text-yellow-700'
                      : result.capacityAnalysis.store.status === 'difficult'
                      ? 'text-orange-700'
                      : 'text-red-700'
                  }`}
                >
                  {result.capacityAnalysis.store.message}
                </p>
              </div>
            </div>
          )}

          {/* 배달 캐파 */}
          {result.capacityAnalysis.delivery && (
            <div>
              <div
                className={`p-4 rounded-lg border-2 ${
                  result.capacityAnalysis.delivery.status === 'feasible'
                    ? 'bg-green-50 border-green-300'
                    : result.capacityAnalysis.delivery.status === 'tight'
                    ? 'bg-yellow-50 border-yellow-300'
                    : result.capacityAnalysis.delivery.status === 'difficult'
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <h4 className="font-semibold mb-2">🛵 배달 처리량</h4>
                <div className="space-y-1 mb-2">
                  <p className="text-sm text-gray-700">
                    필요: {formatNumber(result.capacityAnalysis.delivery.requiredOrdersPerHour, 1)}건/시간
                  </p>
                  <p className="text-sm text-gray-700">
                    처리 가능: {formatNumber(result.capacityAnalysis.delivery.capacityOrdersPerHour, 1)}건/시간
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    result.capacityAnalysis.delivery.status === 'feasible'
                      ? 'text-green-700'
                      : result.capacityAnalysis.delivery.status === 'tight'
                      ? 'text-yellow-700'
                      : result.capacityAnalysis.delivery.status === 'difficult'
                      ? 'text-orange-700'
                      : 'text-red-700'
                  }`}
                >
                  {result.capacityAnalysis.delivery.message}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
