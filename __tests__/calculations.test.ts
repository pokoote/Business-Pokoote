import {
  calculateTotalFixedCosts,
  calculateVariableRates,
  calculateBlendedVariableRate,
  calculateContributionMarginRate,
  calculateBreakEvenRevenue,
  calculateTargetProfitRevenue,
  calculateRequiredOrders,
  checkStoreCapacity,
  checkDeliveryCapacity,
  calculateBreakEven,
} from '@/lib/calculations';
import { BusinessInput } from '@/lib/types';

describe('계산 엔진 테스트', () => {
  describe('고정비 계산', () => {
    it('고정비 합계를 정확히 계산해야 함', () => {
      const fixedCosts = {
        rent: 2000000,
        maintenance: 200000,
        utilities: 300000,
        fixedLabor: 3000000,
        subscriptions: 150000,
        depreciation: 400000,
        other: 200000,
      };
      
      expect(calculateTotalFixedCosts(fixedCosts)).toBe(6250000);
    });
  });

  describe('변동비율 계산', () => {
    it('매장과 배달 변동비율을 정확히 계산해야 함', () => {
      const variableCosts = {
        cogsRate: 35,
        paymentFeeRate: 2.5,
        platformFeeRate: 12,
        packagingRate: 3,
        wasteRate: 2,
        variableLaborRate: 0,
      };
      
      const result = calculateVariableRates(variableCosts);
      
      // 매장: 35 + 2.5 + 3 + 2 = 42.5%
      expect(result.storeRate).toBe(42.5);
      
      // 배달: 35 + 2.5 + 12 + 3 + 2 = 54.5%
      expect(result.deliveryRate).toBe(54.5);
    });
  });

  describe('혼합 변동비율 계산', () => {
    it('매장/배달 비중에 따른 가중평균을 정확히 계산해야 함', () => {
      const storeRate = 42.5;
      const deliveryRate = 54.5;
      const salesMix = { storeShare: 60, deliveryShare: 40 };
      
      const blended = calculateBlendedVariableRate(storeRate, deliveryRate, salesMix);
      
      // 42.5 * 0.6 + 54.5 * 0.4 = 25.5 + 21.8 = 47.3
      expect(blended).toBeCloseTo(47.3, 1);
    });
  });

  describe('공헌이익률 계산', () => {
    it('공헌이익률을 정확히 계산해야 함', () => {
      const blendedVariableRate = 47.3;
      const contributionMargin = calculateContributionMarginRate(blendedVariableRate);
      
      // 100 - 47.3 = 52.7
      expect(contributionMargin).toBeCloseTo(52.7, 1);
    });
  });

  describe('손익분기점 계산 - 매장 100%', () => {
    it('매장 100% 시나리오에서 정상적으로 계산되어야 함', () => {
      const input: BusinessInput = {
        fixedCosts: {
          rent: 2000000,
          maintenance: 200000,
          utilities: 300000,
          fixedLabor: 3000000,
          subscriptions: 150000,
          depreciation: 400000,
          other: 150000,
        },
        variableCosts: {
          cogsRate: 35,
          paymentFeeRate: 2.5,
          platformFeeRate: 0,
          packagingRate: 3,
          wasteRate: 2,
          variableLaborRate: 0,
        },
        salesMix: {
          storeShare: 100,
          deliveryShare: 0,
        },
        aov: {
          storeAov: 15000,
        },
        openDays: 26,
        targetProfit: 0,
      };

      const result = calculateBreakEven(input);

      expect(result.isValid).toBe(true);
      expect(result.totalFixedCosts).toBe(6200000);
      expect(result.contributionMarginRate).toBeCloseTo(57.5, 1); // 100 - 42.5
      expect(result.breakEvenMonthlyRevenue).toBeCloseTo(10782609, 0);
      expect(result.breakEvenDailyRevenue).toBeCloseTo(414715, 0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('손익분기점 계산 - 배달 100%', () => {
    it('배달 100% 시나리오에서 정상적으로 계산되어야 함', () => {
      const input: BusinessInput = {
        fixedCosts: {
          rent: 2000000,
          maintenance: 200000,
          utilities: 300000,
          fixedLabor: 3000000,
          subscriptions: 150000,
          depreciation: 400000,
          other: 150000,
        },
        variableCosts: {
          cogsRate: 35,
          paymentFeeRate: 2.5,
          platformFeeRate: 12,
          packagingRate: 3,
          wasteRate: 2,
          variableLaborRate: 0,
        },
        salesMix: {
          storeShare: 0,
          deliveryShare: 100,
        },
        aov: {
          storeAov: 15000,
          deliveryAov: 18000,
        },
        openDays: 26,
        targetProfit: 0,
      };

      const result = calculateBreakEven(input);

      expect(result.isValid).toBe(true);
      expect(result.contributionMarginRate).toBeCloseTo(45.5, 1); // 100 - 54.5
      expect(result.breakEvenMonthlyRevenue).toBeCloseTo(13626374, 0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('손익분기점 계산 - 매장/배달 혼합 50/50', () => {
    it('매장/배달 50/50 혼합 시나리오에서 정상적으로 계산되어야 함', () => {
      const input: BusinessInput = {
        fixedCosts: {
          rent: 2000000,
          maintenance: 200000,
          utilities: 300000,
          fixedLabor: 3000000,
          subscriptions: 150000,
          depreciation: 400000,
          other: 150000,
        },
        variableCosts: {
          cogsRate: 35,
          paymentFeeRate: 2.5,
          platformFeeRate: 12,
          packagingRate: 3,
          wasteRate: 2,
          variableLaborRate: 0,
        },
        salesMix: {
          storeShare: 50,
          deliveryShare: 50,
        },
        aov: {
          storeAov: 15000,
          deliveryAov: 18000,
        },
        openDays: 26,
        targetProfit: 0,
      };

      const result = calculateBreakEven(input);

      expect(result.isValid).toBe(true);
      // 혼합 변동비율: 42.5 * 0.5 + 54.5 * 0.5 = 48.5
      expect(result.blendedVariableRate).toBeCloseTo(48.5, 1);
      expect(result.contributionMarginRate).toBeCloseTo(51.5, 1);
      expect(result.breakEvenMonthlyRevenue).toBeCloseTo(12038835, 0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('공헌이익률 <= 0 경고 처리', () => {
    it('변동비율이 100% 이상일 때 에러를 반환해야 함', () => {
      const input: BusinessInput = {
        fixedCosts: {
          rent: 2000000,
          maintenance: 200000,
          utilities: 300000,
          fixedLabor: 3000000,
          subscriptions: 150000,
          depreciation: 400000,
          other: 150000,
        },
        variableCosts: {
          cogsRate: 80, // 매우 높은 원가율
          paymentFeeRate: 2.5,
          platformFeeRate: 15,
          packagingRate: 5,
          wasteRate: 3,
          variableLaborRate: 0,
        },
        salesMix: {
          storeShare: 0,
          deliveryShare: 100,
        },
        aov: {
          storeAov: 15000,
          deliveryAov: 18000,
        },
        openDays: 26,
        targetProfit: 0,
      };

      const result = calculateBreakEven(input);

      expect(result.isValid).toBe(false);
      expect(result.contributionMarginRate).toBeLessThanOrEqual(0);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('매출이 늘수록 손해');
    });
  });

  describe('입력 오류 검증', () => {
    it('객단가가 0이면 계산이 되지 않아야 함', () => {
      const salesMix = { storeShare: 100, deliveryShare: 0 };
      const aov = { storeAov: 0 };
      const openDays = 26;

      expect(() => {
        calculateRequiredOrders(10000000, salesMix, aov, openDays);
      }).toThrow();
    });
  });

  describe('캐파 체크 - 좌석 점유율 계산', () => {
    it('좌석 점유율을 정확히 계산하고 상태를 판정해야 함', () => {
      const requiredCustomersPerDay = 50;
      const seats = 20;
      const avgDwellMinutes = 60;
      const netServiceHoursPerDay = 10;

      const result = checkStoreCapacity(
        requiredCustomersPerDay,
        seats,
        avgDwellMinutes,
        netServiceHoursPerDay
      );

      // 필요 시간: 50명 * 60분 = 3000분
      // 가용 시간: 20석 * 10시간 * 60분 = 12000분
      // 점유율: 3000 / 12000 = 0.25 = 25%
      expect(result.occupancy).toBeCloseTo(0.25, 2);
      expect(result.status).toBe('comfortable');
    });

    it('점유율이 90% 이상일 때 impossible 상태를 반환해야 함', () => {
      const requiredCustomersPerDay = 200;
      const seats = 20;
      const avgDwellMinutes = 60;
      const netServiceHoursPerDay = 10;

      const result = checkStoreCapacity(
        requiredCustomersPerDay,
        seats,
        avgDwellMinutes,
        netServiceHoursPerDay
      );

      // 필요 시간: 200명 * 60분 = 12000분
      // 가용 시간: 20석 * 10시간 * 60분 = 12000분
      // 점유율: 100%
      expect(result.occupancy).toBeCloseTo(1.0, 2);
      expect(result.status).toBe('impossible');
    });
  });

  describe('캐파 체크 - 배달 처리량 계산', () => {
    it('배달 처리량을 정확히 계산하고 상태를 판정해야 함', () => {
      const requiredOrdersPerDay = 80;
      const peakHoursPerDay = 4;
      const capacityOrdersPerHour = 30;

      const result = checkDeliveryCapacity(
        requiredOrdersPerDay,
        peakHoursPerDay,
        capacityOrdersPerHour
      );

      // 필요: 80건 / 4시간 = 20건/시간
      // 가능: 30건/시간
      // 가동률: 20/30 = 0.67 = 67%
      expect(result.requiredPerHour).toBeCloseTo(20, 1);
      expect(result.capacityPerHour).toBe(30);
      expect(result.status).toBe('possible');
    });

    it('처리량이 부족할 때 overload 상태를 반환해야 함', () => {
      const requiredOrdersPerDay = 120;
      const peakHoursPerDay = 4;
      const capacityOrdersPerHour = 25;

      const result = checkDeliveryCapacity(
        requiredOrdersPerDay,
        peakHoursPerDay,
        capacityOrdersPerHour
      );

      // 필요: 120건 / 4시간 = 30건/시간
      // 가능: 25건/시간
      // 가동률: 30/25 = 1.2 = 120% (과부하)
      expect(result.requiredPerHour).toBeCloseTo(30, 1);
      expect(result.capacityPerHour).toBe(25);
      expect(result.status).toBe('overload');
    });
  });
});
