import { BusinessInput } from './types';

export const businessPresets: Record<string, BusinessInput> = {
  restaurant: {
    fixedCosts: {
      rent: 2000000,
      maintenance: 200000,
      utilities: 300000,
      fixedLabor: 3000000,
      subscriptions: 150000,
      depreciation: 400000,
      other: 200000,
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
      storeShare: 60,
      deliveryShare: 40,
    },
    aov: {
      storeAov: 15000,
      deliveryAov: 18000,
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
      rent: 1500000,
      maintenance: 150000,
      utilities: 200000,
      fixedLabor: 2000000,
      subscriptions: 100000,
      depreciation: 300000,
      other: 150000,
    },
    variableCosts: {
      cogsRate: 25,
      paymentFeeRate: 2.5,
      platformFeeRate: 13,
      packagingRate: 2,
      wasteRate: 1,
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
      rent: 1800000,
      maintenance: 180000,
      utilities: 250000,
      fixedLabor: 2500000,
      subscriptions: 120000,
      depreciation: 350000,
      other: 180000,
    },
    variableCosts: {
      cogsRate: 50,
      paymentFeeRate: 2.5,
      platformFeeRate: 15,
      packagingRate: 2,
      wasteRate: 0,
      variableLaborRate: 0,
    },
    salesMix: {
      storeShare: 70,
      deliveryShare: 30,
    },
    aov: {
      storeAov: 35000,
      deliveryAov: 40000,
    },
    openDays: 26,
    targetProfit: 2800000,
  },
  service: {
    fixedCosts: {
      rent: 1200000,
      maintenance: 120000,
      utilities: 150000,
      fixedLabor: 2200000,
      subscriptions: 200000,
      depreciation: 250000,
      other: 150000,
    },
    variableCosts: {
      cogsRate: 15,
      paymentFeeRate: 2.5,
      platformFeeRate: 0,
      packagingRate: 1,
      wasteRate: 0,
      variableLaborRate: 5,
    },
    salesMix: {
      storeShare: 100,
      deliveryShare: 0,
    },
    aov: {
      storeAov: 50000,
    },
    openDays: 22,
    targetProfit: 3500000,
    capacityCheck: {
      seats: 5,
      avgDwellMinutes: 120,
      netServiceHoursPerDay: 9,
    },
  },
};

export function getPresetByKey(key: string): BusinessInput | null {
  return businessPresets[key] || null;
}

export function getPresetNames(): Array<{ key: string; name: string }> {
  return [
    { key: 'restaurant', name: '음식점' },
    { key: 'cafe', name: '카페' },
    { key: 'retail', name: '소매점' },
    { key: 'service', name: '서비스업' },
  ];
}
