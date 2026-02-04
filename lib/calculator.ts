/**
 * 자영업 손익분기점 시뮬레이터 계산 엔진
 * 순수 함수로 구현하여 테스트 가능하도록 작성
 */

import { BusinessInput, CalculationResult } from './types';

/**
 * 메인 계산 함수
 */
export function calculateBreakEven(input: BusinessInput): CalculationResult {
  const warnings: string[] = [];
  
  // 1. 고정비 합계
  const totalFixedCosts = Object.values(input.fixedCosts).reduce((sum, val) => sum + val, 0);
  
  // 2. 채널별 변동비율
  const storeVariableRate = calculateChannelVariableRate(input.variableCosts, 'store');
  const deliveryVariableRate = calculateChannelVariableRate(input.variableCosts, 'delivery');
  
  // 3. 혼합 변동비율 (가중평균)
  const storeShare = input.salesMix.storeShare / 100;
  const deliveryShare = input.salesMix.deliveryShare / 100;
  const blendedVariableRate = storeShare * storeVariableRate + deliveryShare * deliveryVariableRate;
  
  // 4. 공헌이익률
  const contributionMarginRate = 1 - blendedVariableRate;
  
  // 5. 공헌이익률 검증
  if (contributionMarginRate <= 0) {
    warnings.push('⚠️ 매출이 늘수록 손해가 발생하는 구조입니다!');
    warnings.push('💡 해결 방법: 원가율↓, 수수료율↓, 포장비↓, 객단가↑, 배달 비중 조정');
    
    return {
      totalFixedCosts,
      blendedVariableRate,
      contributionMarginRate,
      breakEvenMonthlyRevenue: Infinity,
      breakEvenDailyRevenue: Infinity,
      requiredOrders: {
        store: { monthly: Infinity, daily: Infinity },
        delivery: { monthly: Infinity, daily: Infinity },
        total: { monthly: Infinity, daily: Infinity },
      },
      warnings,
      isValid: false,
    };
  }
  
  // 6. 손익분기점
  const breakEvenMonthlyRevenue = totalFixedCosts / contributionMarginRate;
  const breakEvenDailyRevenue = breakEvenMonthlyRevenue / input.openDays;
  
  // 7. 목표이익 필요매출
  let targetProfitMonthlyRevenue: number | undefined;
  let targetProfitDailyRevenue: number | undefined;
  
  if (input.targetProfit && input.targetProfit > 0) {
    targetProfitMonthlyRevenue = (totalFixedCosts + input.targetProfit) / contributionMarginRate;
    targetProfitDailyRevenue = targetProfitMonthlyRevenue / input.openDays;
  }
  
  // 8. 필요 주문수 계산 (손익분기점 기준)
  const requiredOrders = calculateRequiredOrders(
    breakEvenMonthlyRevenue,
    input.salesMix,
    input.aov,
    input.openDays
  );
  
  // 9. 캐파 체크
  let capacityAnalysis;
  if (input.capacityCheck) {
    capacityAnalysis = analyzeCapacity(
      requiredOrders,
      input.capacityCheck,
      input.openDays
    );
    
    // 캐파 경고 추가
    if (capacityAnalysis.store && capacityAnalysis.store.status === 'impossible') {
      warnings.push(`⚠️ 매장 캐파: ${capacityAnalysis.store.message}`);
    }
    if (capacityAnalysis.delivery && capacityAnalysis.delivery.status === 'impossible') {
      warnings.push(`⚠️ 배달 캐파: ${capacityAnalysis.delivery.message}`);
    }
  }
  
  // 10. 입력값 검증 경고
  if (input.salesMix.storeShare + input.salesMix.deliveryShare !== 100) {
    warnings.push('⚠️ 매출 믹스 합계가 100%가 아닙니다.');
  }
  
  return {
    totalFixedCosts,
    blendedVariableRate,
    contributionMarginRate,
    breakEvenMonthlyRevenue,
    breakEvenDailyRevenue,
    targetProfitMonthlyRevenue,
    targetProfitDailyRevenue,
    requiredOrders,
    warnings,
    isValid: true,
    capacityAnalysis,
  };
}

/**
 * 채널별 변동비율 계산
 */
function calculateChannelVariableRate(
  variableCosts: BusinessInput['variableCosts'],
  channel: 'store' | 'delivery'
): number {
  const baseRate = 
    variableCosts.cogsRate +
    variableCosts.paymentFeeRate +
    variableCosts.packagingRate +
    (variableCosts.wasteRate || 0) +
    (variableCosts.variableLaborRate || 0);
  
  if (channel === 'delivery') {
    return (baseRate + variableCosts.platformFeeRate) / 100;
  }
  
  return baseRate / 100;
}

/**
 * 필요 주문수 계산
 */
function calculateRequiredOrders(
  requiredMonthlyRevenue: number,
  salesMix: BusinessInput['salesMix'],
  aov: BusinessInput['aov'],
  openDays: number
) {
  const storeShare = salesMix.storeShare / 100;
  const deliveryShare = salesMix.deliveryShare / 100;
  
  const storeRequiredMonthlyRevenue = requiredMonthlyRevenue * storeShare;
  const deliveryRequiredMonthlyRevenue = requiredMonthlyRevenue * deliveryShare;
  
  const storeRequiredOrdersMonthly = aov.storeAov > 0 
    ? storeRequiredMonthlyRevenue / aov.storeAov 
    : 0;
  const deliveryRequiredOrdersMonthly = (aov.deliveryAov || 0) > 0
    ? deliveryRequiredMonthlyRevenue / (aov.deliveryAov || 1)
    : 0;
  
  return {
    store: {
      monthly: storeRequiredOrdersMonthly,
      daily: storeRequiredOrdersMonthly / openDays,
    },
    delivery: {
      monthly: deliveryRequiredOrdersMonthly,
      daily: deliveryRequiredOrdersMonthly / openDays,
    },
    total: {
      monthly: storeRequiredOrdersMonthly + deliveryRequiredOrdersMonthly,
      daily: (storeRequiredOrdersMonthly + deliveryRequiredOrdersMonthly) / openDays,
    },
  };
}

/**
 * 현실가능성 캐파 체크
 */
function analyzeCapacity(
  requiredOrders: CalculationResult['requiredOrders'],
  capacityCheck: NonNullable<BusinessInput['capacityCheck']>,
  openDays: number
) {
  const analysis: NonNullable<CalculationResult['capacityAnalysis']> = {};
  
  // 매장 캐파 체크
  if (
    capacityCheck.seats &&
    capacityCheck.avgDwellMinutes &&
    capacityCheck.netServiceHoursPerDay
  ) {
    const requiredStoreCustomersPerDay = requiredOrders.store.daily;
    const totalAvailableSeatMinutes = 
      capacityCheck.seats * capacityCheck.netServiceHoursPerDay * 60;
    const requiredSeatMinutes = 
      requiredStoreCustomersPerDay * capacityCheck.avgDwellMinutes;
    const requiredAvgSeatOccupancy = requiredSeatMinutes / totalAvailableSeatMinutes;
    
    let status: 'feasible' | 'tight' | 'difficult' | 'impossible';
    let message: string;
    
    if (requiredAvgSeatOccupancy <= 0.40) {
      status = 'feasible';
      message = '여유 있음 (가능)';
    } else if (requiredAvgSeatOccupancy <= 0.70) {
      status = 'tight';
      message = '가능 (피크 운영 중요)';
    } else if (requiredAvgSeatOccupancy <= 0.90) {
      status = 'difficult';
      message = '빡빡함 (개선 필요)';
    } else {
      status = 'impossible';
      message = '현실적으로 어려움 (강력 경고)';
    }
    
    analysis.store = {
      requiredAvgSeatOccupancy,
      status,
      message,
    };
  }
  
  // 배달 캐파 체크
  if (capacityCheck.peakHoursPerDay) {
    const requiredDeliveryOrdersPerDay = requiredOrders.delivery.daily;
    const requiredOrdersPerHour = requiredDeliveryOrdersPerDay / capacityCheck.peakHoursPerDay;
    
    let capacityOrdersPerHour: number;
    if (capacityCheck.capacityOrdersPerHour) {
      capacityOrdersPerHour = capacityCheck.capacityOrdersPerHour;
    } else if (capacityCheck.prepMinutes) {
      capacityOrdersPerHour = 60 / capacityCheck.prepMinutes;
    } else {
      // 캐파 정보 없으면 스킵
      return analysis;
    }
    
    const utilizationRate = requiredOrdersPerHour / capacityOrdersPerHour;
    
    let status: 'feasible' | 'tight' | 'difficult' | 'impossible';
    let message: string;
    
    if (utilizationRate <= 0.70) {
      status = 'feasible';
      message = '여유 있음 (가능)';
    } else if (utilizationRate <= 0.90) {
      status = 'tight';
      message = '가능 (효율 중요)';
    } else if (utilizationRate <= 1.10) {
      status = 'difficult';
      message = '빡빡함 (프로세스 개선 필요)';
    } else {
      status = 'impossible';
      message = '처리 불가능 (주방 증설 또는 배달 비중 축소 필요)';
    }
    
    analysis.delivery = {
      requiredOrdersPerHour,
      capacityOrdersPerHour,
      status,
      message,
    };
  }
  
  return analysis;
}

/**
 * 민감도 분석: 원가율 변동
 */
export function sensitivityCogsRate(
  input: BusinessInput,
  changePoints: number[]
): Array<{ cogsRate: number; breakEvenMonthlyRevenue: number }> {
  return changePoints.map((change) => {
    const adjustedInput: BusinessInput = {
      ...input,
      variableCosts: {
        ...input.variableCosts,
        cogsRate: input.variableCosts.cogsRate + change,
      },
    };
    const result = calculateBreakEven(adjustedInput);
    return {
      cogsRate: adjustedInput.variableCosts.cogsRate,
      breakEvenMonthlyRevenue: result.breakEvenMonthlyRevenue,
    };
  });
}

/**
 * 민감도 분석: 객단가 변동
 */
export function sensitivityAov(
  input: BusinessInput,
  changePercentages: number[]
): Array<{ aovChangePercent: number; breakEvenMonthlyRevenue: number }> {
  return changePercentages.map((changePercent) => {
    const multiplier = 1 + changePercent / 100;
    const adjustedInput: BusinessInput = {
      ...input,
      aov: {
        storeAov: input.aov.storeAov * multiplier,
        deliveryAov: input.aov.deliveryAov ? input.aov.deliveryAov * multiplier : undefined,
      },
    };
    const result = calculateBreakEven(adjustedInput);
    return {
      aovChangePercent: changePercent,
      breakEvenMonthlyRevenue: result.breakEvenMonthlyRevenue,
    };
  });
}

/**
 * 숫자 포맷팅 유틸리티
 */
export function formatCurrency(value: number): string {
  if (!isFinite(value)) return '계산 불가';
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals: number = 0): string {
  if (!isFinite(value)) return '계산 불가';
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  if (!isFinite(value)) return '계산 불가';
  return `${formatNumber(value * 100, decimals)}%`;
}
