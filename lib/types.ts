/**
 * 자영업 손익분기점 시뮬레이터 타입 정의
 */

// 고정비 항목
export interface FixedCosts {
  rent: number;              // 임대료
  maintenance: number;       // 관리비
  utilities: number;         // 고정공과금
  fixedLabor: number;        // 고정인건비
  subscriptions: number;     // 구독/통신
  depreciation: number;      // 리스/감가
  other: number;             // 기타고정비
}

// 변동비율 항목
export interface VariableCosts {
  cogsRate: number;             // 원가율 (%)
  paymentFeeRate: number;       // 결제수수료율 (%)
  platformFeeRate: number;      // 플랫폼수수료율 (%)
  packagingRate: number;        // 포장/소모품율 (%)
  wasteRate?: number;           // 폐기/누락율 (%)
  variableLaborRate?: number;   // 변동인건비율 (%)
}

// 매출 믹스
export interface SalesMix {
  storeShare: number;      // 매장 비중 (%)
  deliveryShare: number;   // 배달 비중 (%)
}

// 객단가
export interface AOV {
  storeAov: number;        // 매장 객단가 (원)
  deliveryAov?: number;    // 배달 객단가 (원)
}

// 현실가능성 캐파 체크 (선택)
export interface CapacityCheck {
  // 매장 캐파
  seats?: number;                    // 좌석 수
  avgDwellMinutes?: number;          // 평균 체류시간 (분)
  netServiceHoursPerDay?: number;    // 순영업시간 (시간/일)
  
  // 배달 캐파
  peakHoursPerDay?: number;          // 피크타임 합계 (시간/일)
  capacityOrdersPerHour?: number;    // 시간당 처리 가능 주문수
  prepMinutes?: number;              // 평균 주문 처리시간 (분)
}

// 비즈니스 입력 (전체)
export interface BusinessInput {
  fixedCosts: FixedCosts;
  variableCosts: VariableCosts;
  salesMix: SalesMix;
  aov: AOV;
  openDays: number;              // 월 영업일수
  targetProfit?: number;         // 목표 순이익 (선택)
  capacityCheck?: CapacityCheck; // 캐파 체크 (선택)
}

// 계산 결과
export interface CalculationResult {
  // 고정비 및 변동비율
  totalFixedCosts: number;
  blendedVariableRate: number;
  contributionMarginRate: number;
  
  // 손익분기점
  breakEvenMonthlyRevenue: number;
  breakEvenDailyRevenue: number;
  
  // 목표이익 필요매출
  targetProfitMonthlyRevenue?: number;
  targetProfitDailyRevenue?: number;
  
  // 필요 주문수/고객수
  requiredOrders: {
    store: {
      monthly: number;
      daily: number;
    };
    delivery: {
      monthly: number;
      daily: number;
    };
    total: {
      monthly: number;
      daily: number;
    };
  };
  
  // 경고/에러
  warnings: string[];
  isValid: boolean;
  
  // 캐파 체크 결과
  capacityAnalysis?: {
    store?: {
      requiredAvgSeatOccupancy: number;
      status: 'feasible' | 'tight' | 'difficult' | 'impossible';
      message: string;
    };
    delivery?: {
      requiredOrdersPerHour: number;
      capacityOrdersPerHour: number;
      status: 'feasible' | 'tight' | 'difficult' | 'impossible';
      message: string;
    };
  };
}

// 시나리오 (로컬스토리지 저장용)
export interface Scenario {
  id: string;
  name: string;
  input: BusinessInput;
  createdAt: number;
}

// 민감도 분석 파라미터
export interface SensitivityParams {
  cogsRateChange: number;   // 원가율 변동 (±%p)
  aovChange: number;        // 객단가 변동 (±%)
}

// 민감도 분석 결과
export interface SensitivityResult {
  scenario: string;
  breakEvenMonthlyRevenue: number;
  targetProfitMonthlyRevenue?: number;
}

// 프리셋 정보
export interface PresetInfo {
  key: string;
  name: string;
  description: string;
}
