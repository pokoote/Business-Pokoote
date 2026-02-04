/**
 * 업종별 프리셋 데이터
 * 예시 값이므로 사용자가 실제 값으로 수정해야 함
 */

import { BusinessInput, PresetInfo } from './types';

// 프리셋 목록
export const presetList: PresetInfo[] = [
  {
    key: 'restaurant',
    name: '음식점',
    description: '일반 음식점 예시 (실제 값으로 수정 필요)',
  },
  {
    key: 'cafe',
    name: '카페',
    description: '카페 예시 (실제 값으로 수정 필요)',
  },
  {
    key: 'retail',
    name: '소매',
    description: '소매업 예시 (실제 값으로 수정 필요)',
  },
  {
    key: 'service',
    name: '서비스',
    description: '서비스업 예시 (실제 값으로 수정 필요)',
  },
];

// 프리셋 데이터
const presets: Record<string, BusinessInput> = {
  restaurant: {
    fixedCosts: {
      rent: 3000000,
      maintenance: 300000,
      utilities: 500000,
      fixedLabor: 4000000,
      subscriptions: 150000,
      depreciation: 500000,
      other: 300000,
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
      storeShare: 60,
      deliveryShare: 40,
    },
    aov: {
      storeAov: 18000,
      deliveryAov: 25000,
    },
    openDays: 26,
    targetProfit: 3000000,
    capacityCheck: {
      seats: 20,
      avgDwellMinutes: 60,
      netServiceHoursPerDay: 10,
      peakHoursPerDay: 4,
      capacityOrdersPerHour: 8,
    },
  },
  
  cafe: {
    fixedCosts: {
      rent: 2500000,
      maintenance: 250000,
      utilities: 400000,
      fixedLabor: 3000000,
      subscriptions: 100000,
      depreciation: 400000,
      other: 200000,
    },
    variableCosts: {
      cogsRate: 30,
      paymentFeeRate: 2.5,
      platformFeeRate: 10,
      packagingRate: 4,
      wasteRate: 3,
      variableLaborRate: 0,
    },
    salesMix: {
      storeShare: 80,
      deliveryShare: 20,
    },
    aov: {
      storeAov: 8000,
      deliveryAov: 12000,
    },
    openDays: 26,
    targetProfit: 2500000,
    capacityCheck: {
      seats: 25,
      avgDwellMinutes: 90,
      netServiceHoursPerDay: 12,
      peakHoursPerDay: 3,
      capacityOrdersPerHour: 6,
    },
  },
  
  retail: {
    fixedCosts: {
      rent: 2000000,
      maintenance: 200000,
      utilities: 300000,
      fixedLabor: 2500000,
      subscriptions: 100000,
      depreciation: 300000,
      other: 150000,
    },
    variableCosts: {
      cogsRate: 50,
      paymentFeeRate: 2.5,
      platformFeeRate: 0,
      packagingRate: 2,
      wasteRate: 1,
      variableLaborRate: 0,
    },
    salesMix: {
      storeShare: 100,
      deliveryShare: 0,
    },
    aov: {
      storeAov: 35000,
    },
    openDays: 26,
    targetProfit: 2000000,
  },
  
  service: {
    fixedCosts: {
      rent: 1500000,
      maintenance: 150000,
      utilities: 200000,
      fixedLabor: 3500000,
      subscriptions: 200000,
      depreciation: 300000,
      other: 100000,
    },
    variableCosts: {
      cogsRate: 15,
      paymentFeeRate: 2.5,
      platformFeeRate: 0,
      packagingRate: 1,
      wasteRate: 0,
      variableLaborRate: 10,
    },
    salesMix: {
      storeShare: 100,
      deliveryShare: 0,
    },
    aov: {
      storeAov: 80000,
    },
    openDays: 22,
    targetProfit: 2500000,
  },
};

/**
 * 프리셋 이름 목록 가져오기
 */
export function getPresetNames(): PresetInfo[] {
  return presetList;
}

/**
 * 특정 프리셋 데이터 가져오기
 */
export function getPresetByKey(key: string): BusinessInput | null {
  return presets[key] || null;
}

/**
 * 기본 빈 입력값
 */
export function getEmptyInput(): BusinessInput {
  return {
    fixedCosts: {
      rent: 0,
      maintenance: 0,
      utilities: 0,
      fixedLabor: 0,
      subscriptions: 0,
      depreciation: 0,
      other: 0,
    },
    variableCosts: {
      cogsRate: 0,
      paymentFeeRate: 0,
      platformFeeRate: 0,
      packagingRate: 0,
      wasteRate: 0,
      variableLaborRate: 0,
    },
    salesMix: {
      storeShare: 100,
      deliveryShare: 0,
    },
    aov: {
      storeAov: 0,
    },
    openDays: 26,
  };
}
