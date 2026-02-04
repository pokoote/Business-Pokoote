/**
 * 계산 엔진 유닛 테스트
 */

import { calculateBreakEven } from '@/lib/calculator';
import { BusinessInput } from '@/lib/types';

describe('calculateBreakEven', () => {
  // 테스트 1: 매장 100% 정상
  test('매장 100% 정상 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2.5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 100,
        deliveryShare: 0,
      },
      aov: {
        storeAov: 10000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.isValid).toBe(true);
    expect(result.totalFixedCosts).toBe(1000000);
    expect(result.blendedVariableRate).toBeCloseTo(0.45, 2);
    expect(result.contributionMarginRate).toBeCloseTo(0.55, 2);
    expect(result.breakEvenMonthlyRevenue).toBeCloseTo(1818181.82, 0);
  });

  // 테스트 2: 배달 100% 정상
  test('배달 100% 정상 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 800000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 35,
        paymentFeeRate: 2.5,
        platformFeeRate: 12,
        packagingRate: 5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 0,
        deliveryShare: 100,
      },
      aov: {
        storeAov: 15000,
        deliveryAov: 20000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.isValid).toBe(true);
    expect(result.totalFixedCosts).toBe(800000);
    expect(result.blendedVariableRate).toBeCloseTo(0.545, 2);
    expect(result.contributionMarginRate).toBeCloseTo(0.455, 2);
    expect(result.breakEvenMonthlyRevenue).toBeCloseTo(1758241.76, 0);
  });

  // 테스트 3: 혼합 50/50 정상
  test('매장 50% + 배달 50% 혼합 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1500000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 35,
        paymentFeeRate: 2.5,
        platformFeeRate: 12,
        packagingRate: 3,
        wasteRate: 2,
        variableLaborRate: 5,
      },
      salesMix: {
        storeShare: 50,
        deliveryShare: 50,
      },
      aov: {
        storeAov: 18000,
        deliveryAov: 25000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.isValid).toBe(true);
    expect(result.contributionMarginRate).toBeGreaterThan(0);
    expect(result.breakEvenMonthlyRevenue).toBeGreaterThan(0);
    expect(result.requiredOrders.total.monthly).toBeGreaterThan(0);
  });

  // 테스트 4: contribution_margin_rate <= 0 경고
  test('변동비율 >= 100% 시 경고 및 불가 처리', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 80,
        paymentFeeRate: 2.5,
        platformFeeRate: 15,
        packagingRate: 5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 0,
        deliveryShare: 100,
      },
      aov: {
        storeAov: 10000,
        deliveryAov: 10000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.isValid).toBe(false);
    expect(result.contributionMarginRate).toBeLessThanOrEqual(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.breakEvenMonthlyRevenue).toBe(Infinity);
  });

  // 테스트 5: 입력값 검증
  test('영업일수 검증', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 100,
        deliveryShare: 0,
      },
      aov: {
        storeAov: 10000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.breakEvenDailyRevenue).toBeCloseTo(
      result.breakEvenMonthlyRevenue / input.openDays,
      0
    );
  });

  // 테스트 6: 캐파 체크 점유율 계산
  test('매장 캐파 체크 점유율 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 100,
        deliveryShare: 0,
      },
      aov: {
        storeAov: 10000,
      },
      openDays: 26,
      capacityCheck: {
        seats: 20,
        avgDwellMinutes: 60,
        netServiceHoursPerDay: 10,
      },
    };

    const result = calculateBreakEven(input);

    expect(result.capacityAnalysis).toBeDefined();
    expect(result.capacityAnalysis?.store).toBeDefined();
    expect(result.capacityAnalysis?.store?.requiredAvgSeatOccupancy).toBeGreaterThanOrEqual(0);
    expect(result.capacityAnalysis?.store?.status).toBeDefined();
  });

  // 테스트 7: 목표이익 필요매출
  test('목표이익 필요매출 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2.5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 100,
        deliveryShare: 0,
      },
      aov: {
        storeAov: 10000,
      },
      openDays: 26,
      targetProfit: 500000,
    };

    const result = calculateBreakEven(input);

    expect(result.targetProfitMonthlyRevenue).toBeDefined();
    expect(result.targetProfitMonthlyRevenue).toBeGreaterThan(result.breakEvenMonthlyRevenue);
    expect(result.targetProfitMonthlyRevenue).toBeCloseTo(2727272.73, 0);
  });

  // 테스트 8: 필요 주문수 계산
  test('필요 주문수 계산 검증', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2.5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 100,
        deliveryShare: 0,
      },
      aov: {
        storeAov: 10000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    const expectedOrders = result.breakEvenMonthlyRevenue / input.aov.storeAov;
    expect(result.requiredOrders.store.monthly).toBeCloseTo(expectedOrders, 0);
    expect(result.requiredOrders.total.monthly).toBeCloseTo(expectedOrders, 0);
  });

  // 테스트 9: 배달 캐파 체크
  test('배달 캐파 체크 처리량 계산', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 800000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 35,
        paymentFeeRate: 2.5,
        platformFeeRate: 12,
        packagingRate: 5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 0,
        deliveryShare: 100,
      },
      aov: {
        storeAov: 0,
        deliveryAov: 20000,
      },
      openDays: 26,
      capacityCheck: {
        peakHoursPerDay: 4,
        capacityOrdersPerHour: 8,
      },
    };

    const result = calculateBreakEven(input);

    expect(result.capacityAnalysis).toBeDefined();
    expect(result.capacityAnalysis?.delivery).toBeDefined();
    expect(result.capacityAnalysis?.delivery?.requiredOrdersPerHour).toBeGreaterThanOrEqual(0);
    expect(result.capacityAnalysis?.delivery?.status).toBeDefined();
  });

  // 테스트 10: 매출 믹스 합계 검증
  test('매출 믹스 합계가 100%가 아니면 경고', () => {
    const input: BusinessInput = {
      fixedCosts: {
        rent: 1000000,
        maintenance: 0,
        utilities: 0,
        fixedLabor: 0,
        subscriptions: 0,
        depreciation: 0,
        other: 0,
      },
      variableCosts: {
        cogsRate: 40,
        paymentFeeRate: 2.5,
        platformFeeRate: 0,
        packagingRate: 2.5,
        wasteRate: 0,
        variableLaborRate: 0,
      },
      salesMix: {
        storeShare: 60,
        deliveryShare: 30, // 합계 90%
      },
      aov: {
        storeAov: 10000,
        deliveryAov: 15000,
      },
      openDays: 26,
    };

    const result = calculateBreakEven(input);

    expect(result.warnings).toContain('⚠️ 매출 믹스 합계가 100%가 아닙니다.');
  });
});
