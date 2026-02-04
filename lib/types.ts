import { z } from 'zod';

// 입력 데이터 검증 스키마
export const FixedCostsSchema = z.object({
  rent: z.number().min(0, '임대료는 0 이상이어야 합니다'),
  maintenance: z.number().min(0, '관리비는 0 이상이어야 합니다'),
  utilities: z.number().min(0, '공과금은 0 이상이어야 합니다'),
  fixedLabor: z.number().min(0, '고정인건비는 0 이상이어야 합니다'),
  subscriptions: z.number().min(0, '구독/통신비는 0 이상이어야 합니다'),
  depreciation: z.number().min(0, '리스/감가는 0 이상이어야 합니다'),
  other: z.number().min(0, '기타고정비는 0 이상이어야 합니다'),
});

export const VariableCostsSchema = z.object({
  cogsRate: z.number().min(0, '원가율은 0 이상이어야 합니다').max(100, '원가율은 100 이하여야 합니다'),
  paymentFeeRate: z.number().min(0).max(100),
  platformFeeRate: z.number().min(0).max(100),
  packagingRate: z.number().min(0).max(100),
  wasteRate: z.number().min(0).max(100).optional(),
  variableLaborRate: z.number().min(0).max(100).optional(),
});

export const SalesMixSchema = z.object({
  storeShare: z.number().min(0).max(100),
  deliveryShare: z.number().min(0).max(100),
}).refine((data) => data.storeShare + data.deliveryShare === 100, {
  message: '매장 비중과 배달 비중의 합은 100%여야 합니다',
});

export const AverageOrderValueSchema = z.object({
  storeAov: z.number().min(1, '객단가는 1원 이상이어야 합니다'),
  deliveryAov: z.number().min(1, '객단가는 1원 이상이어야 합니다').optional(),
});

export const CapacityCheckSchema = z.object({
  // 매장 캐파
  seats: z.number().min(1, '좌석 수는 1 이상이어야 합니다').optional(),
  avgDwellMinutes: z.number().min(1, '체류시간은 1분 이상이어야 합니다').optional(),
  netServiceHoursPerDay: z.number().min(0.1, '영업시간은 0.1시간 이상이어야 합니다').optional(),
  
  // 배달 캐파
  peakHoursPerDay: z.number().min(0.1).optional(),
  capacityOrdersPerHour: z.number().min(0.1).optional(),
  prepMinutes: z.number().min(0.1).optional(),
});

export const BusinessInputSchema = z.object({
  fixedCosts: FixedCostsSchema,
  variableCosts: VariableCostsSchema,
  salesMix: SalesMixSchema,
  aov: AverageOrderValueSchema,
  openDays: z.number().min(1, '영업일수는 1일 이상이어야 합니다').max(31, '영업일수는 31일 이하여야 합니다'),
  targetProfit: z.number().min(0).optional(),
  capacityCheck: CapacityCheckSchema.optional(),
});

export type FixedCosts = z.infer<typeof FixedCostsSchema>;
export type VariableCosts = z.infer<typeof VariableCostsSchema>;
export type SalesMix = z.infer<typeof SalesMixSchema>;
export type AverageOrderValue = z.infer<typeof AverageOrderValueSchema>;
export type CapacityCheck = z.infer<typeof CapacityCheckSchema>;
export type BusinessInput = z.infer<typeof BusinessInputSchema>;

// 계산 결과 타입
export interface CalculationResult {
  // 기본 재무 지표
  totalFixedCosts: number;
  storeVariableRate: number;
  deliveryVariableRate: number;
  blendedVariableRate: number;
  contributionMarginRate: number;
  
  // 손익분기점
  breakEvenMonthlyRevenue: number;
  breakEvenDailyRevenue: number;
  
  // 목표 매출 (있을 경우)
  targetProfitMonthlyRevenue?: number;
  targetProfitDailyRevenue?: number;
  
  // 필요 주문수
  storeRequiredOrdersMonthly: number;
  storeRequiredOrdersDaily: number;
  deliveryRequiredOrdersMonthly: number;
  deliveryRequiredOrdersDaily: number;
  
  // 캐파 체크 결과
  capacityResult?: CapacityResult;
  
  // 경고/에러
  warnings: string[];
  errors: string[];
  isValid: boolean;
}

export interface CapacityResult {
  // 매장 캐파
  requiredAvgSeatOccupancy?: number;
  storeCapacityStatus?: 'comfortable' | 'possible' | 'tight' | 'impossible';
  
  // 배달 캐파
  requiredDeliveryOrdersPerHour?: number;
  deliveryCapacityOrdersPerHour?: number;
  deliveryCapacityStatus?: 'sufficient' | 'possible' | 'overload';
}

export interface SensitivityAnalysis {
  cogsRateImpact: Array<{ rate: number; revenue: number }>;
  aovImpact: Array<{ aov: number; revenue: number }>;
}

export interface Scenario {
  id: string;
  name: string;
  input: BusinessInput;
  result: CalculationResult;
  createdAt: number;
}
