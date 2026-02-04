import {
  BusinessInput,
  CalculationResult,
  CapacityResult,
  SensitivityAnalysis,
} from './types';

/**
 * 고정비 합계 계산
 */
export function calculateTotalFixedCosts(fixedCosts: BusinessInput['fixedCosts']): number {
  return (
    fixedCosts.rent +
    fixedCosts.maintenance +
    fixedCosts.utilities +
    fixedCosts.fixedLabor +
    fixedCosts.subscriptions +
    fixedCosts.depreciation +
    fixedCosts.other
  );
}

/**
 * 채널별 변동비율 계산
 */
export function calculateVariableRates(
  variableCosts: BusinessInput['variableCosts']
): { storeRate: number; deliveryRate: number } {
  const baseRate =
    variableCosts.cogsRate +
    variableCosts.paymentFeeRate +
    variableCosts.packagingRate +
    (variableCosts.wasteRate || 0) +
    (variableCosts.variableLaborRate || 0);

  const storeRate = baseRate;
  const deliveryRate = baseRate + variableCosts.platformFeeRate;

  return { storeRate, deliveryRate };
}

/**
 * 혼합 변동비율 계산 (가중평균)
 */
export function calculateBlendedVariableRate(
  storeRate: number,
  deliveryRate: number,
  salesMix: BusinessInput['salesMix']
): number {
  const storeShare = salesMix.storeShare / 100;
  const deliveryShare = salesMix.deliveryShare / 100;

  return storeRate * storeShare + deliveryRate * deliveryShare;
}

/**
 * 공헌이익률 계산
 */
export function calculateContributionMarginRate(blendedVariableRate: number): number {
  return 100 - blendedVariableRate;
}

/**
 * 손익분기점 매출 계산
 */
export function calculateBreakEvenRevenue(
  fixedCosts: number,
  contributionMarginRate: number
): { monthly: number; daily: number; valid: boolean } {
  if (contributionMarginRate <= 0) {
    return { monthly: Infinity, daily: Infinity, valid: false };
  }

  const monthly = (fixedCosts / contributionMarginRate) * 100;
  return { monthly, daily: 0, valid: true };
}

/**
 * 목표이익 달성 필요매출 계산
 */
export function calculateTargetProfitRevenue(
  fixedCosts: number,
  targetProfit: number,
  contributionMarginRate: number
): { monthly: number; daily: number; valid: boolean } {
  if (contributionMarginRate <= 0) {
    return { monthly: Infinity, daily: Infinity, valid: false };
  }

  const monthly = ((fixedCosts + targetProfit) / contributionMarginRate) * 100;
  return { monthly, daily: 0, valid: true };
}

/**
 * 필요 주문수 계산
 */
export function calculateRequiredOrders(
  requiredRevenue: number,
  salesMix: BusinessInput['salesMix'],
  aov: BusinessInput['aov'],
  openDays: number
): {
  storeMonthly: number;
  storeDaily: number;
  deliveryMonthly: number;
  deliveryDaily: number;
} {
  const storeShare = salesMix.storeShare / 100;
  const deliveryShare = salesMix.deliveryShare / 100;

  const storeRevenue = requiredRevenue * storeShare;
  const deliveryRevenue = requiredRevenue * deliveryShare;

  const storeMonthly = storeShare > 0 ? storeRevenue / aov.storeAov : 0;
  const deliveryMonthly =
    deliveryShare > 0 && aov.deliveryAov ? deliveryRevenue / aov.deliveryAov : 0;

  return {
    storeMonthly,
    storeDaily: storeMonthly / openDays,
    deliveryMonthly,
    deliveryDaily: deliveryMonthly / openDays,
  };
}

/**
 * 매장 캐파 체크 (좌석 점유율 기반)
 */
export function checkStoreCapacity(
  requiredCustomersPerDay: number,
  seats: number,
  avgDwellMinutes: number,
  netServiceHoursPerDay: number
): { occupancy: number; status: 'comfortable' | 'possible' | 'tight' | 'impossible' } {
  const totalAvailableMinutes = seats * netServiceHoursPerDay * 60;
  const requiredMinutes = requiredCustomersPerDay * avgDwellMinutes;
  const occupancy = requiredMinutes / totalAvailableMinutes;

  let status: 'comfortable' | 'possible' | 'tight' | 'impossible';
  if (occupancy < 0.4) {
    status = 'comfortable';
  } else if (occupancy < 0.7) {
    status = 'possible';
  } else if (occupancy < 0.9) {
    status = 'tight';
  } else {
    status = 'impossible';
  }

  return { occupancy, status };
}

/**
 * 배달 캐파 체크 (시간당 처리량 기반)
 */
export function checkDeliveryCapacity(
  requiredOrdersPerDay: number,
  peakHoursPerDay: number,
  capacityOrdersPerHour?: number,
  prepMinutes?: number
): {
  requiredPerHour: number;
  capacityPerHour: number;
  status: 'sufficient' | 'possible' | 'overload';
} {
  const requiredPerHour = requiredOrdersPerDay / peakHoursPerDay;

  let capacityPerHour: number;
  if (capacityOrdersPerHour) {
    capacityPerHour = capacityOrdersPerHour;
  } else if (prepMinutes) {
    capacityPerHour = 60 / prepMinutes;
  } else {
    capacityPerHour = 0;
  }

  let status: 'sufficient' | 'possible' | 'overload';
  const utilizationRate = requiredPerHour / capacityPerHour;
  if (utilizationRate < 0.7) {
    status = 'sufficient';
  } else if (utilizationRate < 1.0) {
    status = 'possible';
  } else {
    status = 'overload';
  }

  return { requiredPerHour, capacityPerHour, status };
}

/**
 * 메인 계산 함수
 */
export function calculateBreakEven(input: BusinessInput): CalculationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // 1. 고정비 계산
  const totalFixedCosts = calculateTotalFixedCosts(input.fixedCosts);

  // 2. 변동비율 계산
  const { storeRate, deliveryRate } = calculateVariableRates(input.variableCosts);

  // 3. 혼합 변동비율 계산
  const blendedVariableRate = calculateBlendedVariableRate(storeRate, deliveryRate, input.salesMix);

  // 4. 공헌이익률 계산
  const contributionMarginRate = calculateContributionMarginRate(blendedVariableRate);

  // 5. 공헌이익률 검증
  if (contributionMarginRate <= 0) {
    errors.push('매출이 늘수록 손해가 발생하는 구조입니다. 원가율, 수수료율을 줄이거나 객단가를 올려야 합니다.');
  }

  if (contributionMarginRate < 10) {
    warnings.push('공헌이익률이 매우 낮습니다. 원가율이나 수수료를 줄이는 것을 고려하세요.');
  }

  // 6. 손익분기점 계산
  const breakEven = calculateBreakEvenRevenue(totalFixedCosts, contributionMarginRate);
  const breakEvenDailyRevenue = breakEven.valid ? breakEven.monthly / input.openDays : Infinity;

  // 7. 목표 매출 계산 (선택)
  let targetProfitMonthlyRevenue: number | undefined;
  let targetProfitDailyRevenue: number | undefined;

  if (input.targetProfit && input.targetProfit > 0) {
    const targetRevenue = calculateTargetProfitRevenue(
      totalFixedCosts,
      input.targetProfit,
      contributionMarginRate
    );
    if (targetRevenue.valid) {
      targetProfitMonthlyRevenue = targetRevenue.monthly;
      targetProfitDailyRevenue = targetRevenue.monthly / input.openDays;
    }
  }

  // 8. 필요 주문수 계산 (손익분기 또는 목표매출 기준)
  const baseRevenue = targetProfitMonthlyRevenue || breakEven.monthly;
  const requiredOrders = calculateRequiredOrders(baseRevenue, input.salesMix, input.aov, input.openDays);

  // 9. 캐파 체크 (선택)
  let capacityResult: CapacityResult | undefined;

  if (input.capacityCheck) {
    capacityResult = {};

    // 매장 캐파
    if (
      input.capacityCheck.seats &&
      input.capacityCheck.avgDwellMinutes &&
      input.capacityCheck.netServiceHoursPerDay
    ) {
      const storeCapacity = checkStoreCapacity(
        requiredOrders.storeDaily,
        input.capacityCheck.seats,
        input.capacityCheck.avgDwellMinutes,
        input.capacityCheck.netServiceHoursPerDay
      );
      capacityResult.requiredAvgSeatOccupancy = storeCapacity.occupancy;
      capacityResult.storeCapacityStatus = storeCapacity.status;

      if (storeCapacity.status === 'tight') {
        warnings.push('매장 좌석 점유율이 빡빡합니다. 체류시간 단축이나 좌석 증대를 고려하세요.');
      } else if (storeCapacity.status === 'impossible') {
        warnings.push('매장 캐파로는 목표 달성이 매우 어렵습니다. 배달 비중을 늘리거나 구조를 재검토하세요.');
      }
    }

    // 배달 캐파
    if (
      input.capacityCheck.peakHoursPerDay &&
      (input.capacityCheck.capacityOrdersPerHour || input.capacityCheck.prepMinutes)
    ) {
      const deliveryCapacity = checkDeliveryCapacity(
        requiredOrders.deliveryDaily,
        input.capacityCheck.peakHoursPerDay,
        input.capacityCheck.capacityOrdersPerHour,
        input.capacityCheck.prepMinutes
      );
      capacityResult.requiredDeliveryOrdersPerHour = deliveryCapacity.requiredPerHour;
      capacityResult.deliveryCapacityOrdersPerHour = deliveryCapacity.capacityPerHour;
      capacityResult.deliveryCapacityStatus = deliveryCapacity.status;

      if (deliveryCapacity.status === 'overload') {
        warnings.push('배달 주문 처리량이 부족합니다. 주방 효율 개선이나 배달 인력 증대가 필요합니다.');
      }
    }
  }

  return {
    totalFixedCosts,
    storeVariableRate: storeRate,
    deliveryVariableRate: deliveryRate,
    blendedVariableRate,
    contributionMarginRate,
    breakEvenMonthlyRevenue: breakEven.monthly,
    breakEvenDailyRevenue,
    targetProfitMonthlyRevenue,
    targetProfitDailyRevenue,
    storeRequiredOrdersMonthly: requiredOrders.storeMonthly,
    storeRequiredOrdersDaily: requiredOrders.storeDaily,
    deliveryRequiredOrdersMonthly: requiredOrders.deliveryMonthly,
    deliveryRequiredOrdersDaily: requiredOrders.deliveryDaily,
    capacityResult,
    warnings,
    errors,
    isValid: errors.length === 0 && breakEven.valid,
  };
}

/**
 * 민감도 분석
 */
export function calculateSensitivityAnalysis(
  input: BusinessInput,
  cogsRangePercent: number = 5,
  aovRangePercent: number = 10
): SensitivityAnalysis {
  const baseResult = calculateBreakEven(input);
  const targetRevenue = baseResult.targetProfitMonthlyRevenue || baseResult.breakEvenMonthlyRevenue;

  // 원가율 민감도 (-5%p ~ +5%p)
  const cogsRateImpact = [];
  for (let i = -cogsRangePercent; i <= cogsRangePercent; i++) {
    const modifiedInput = {
      ...input,
      variableCosts: {
        ...input.variableCosts,
        cogsRate: Math.max(0, Math.min(100, input.variableCosts.cogsRate + i)),
      },
    };
    const result = calculateBreakEven(modifiedInput);
    const revenue = result.targetProfitMonthlyRevenue || result.breakEvenMonthlyRevenue;
    cogsRateImpact.push({ rate: modifiedInput.variableCosts.cogsRate, revenue });
  }

  // 객단가 민감도 (-10% ~ +10%)
  const aovImpact = [];
  for (let i = -aovRangePercent; i <= aovRangePercent; i += 2) {
    const factor = 1 + i / 100;
    const modifiedInput = {
      ...input,
      aov: {
        storeAov: input.aov.storeAov * factor,
        deliveryAov: input.aov.deliveryAov ? input.aov.deliveryAov * factor : undefined,
      },
    };
    const result = calculateBreakEven(modifiedInput);
    const revenue = result.targetProfitMonthlyRevenue || result.breakEvenMonthlyRevenue;
    aovImpact.push({ aov: modifiedInput.aov.storeAov, revenue });
  }

  return { cogsRateImpact, aovImpact };
}
