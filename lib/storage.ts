import { Scenario, BusinessInput } from './types';

const STORAGE_KEY = 'breakeven_scenarios';
const MAX_SCENARIOS = 3;

/**
 * localStorage에서 시나리오 목록 가져오기
 */
export function getScenarios(): Scenario[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('시나리오 불러오기 실패:', error);
    return [];
  }
}

/**
 * localStorage에 시나리오 저장
 */
export function saveScenario(scenario: Omit<Scenario, 'id' | 'createdAt'>): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const scenarios = getScenarios();
    
    // 최대 개수 체크
    if (scenarios.length >= MAX_SCENARIOS) {
      throw new Error(`최대 ${MAX_SCENARIOS}개의 시나리오만 저장할 수 있습니다.`);
    }
    
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    
    scenarios.push(newScenario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    return true;
  } catch (error) {
    console.error('시나리오 저장 실패:', error);
    alert(error instanceof Error ? error.message : '시나리오 저장에 실패했습니다.');
    return false;
  }
}

/**
 * localStorage에서 시나리오 삭제
 */
export function deleteScenario(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const scenarios = getScenarios();
    const filtered = scenarios.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('시나리오 삭제 실패:', error);
    return false;
  }
}

/**
 * 모든 시나리오 삭제
 */
export function clearAllScenarios(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('시나리오 전체 삭제 실패:', error);
    return false;
  }
}

/**
 * 시나리오를 JSON 문자열로 변환
 */
export function exportScenarioToJSON(scenario: Scenario): string {
  return JSON.stringify(scenario, null, 2);
}

/**
 * JSON 문자열을 시나리오로 변환
 */
export function importScenarioFromJSON(json: string): Scenario | null {
  try {
    const parsed = JSON.parse(json);
    // 기본 검증
    if (!parsed.name || !parsed.input || !parsed.result) {
      throw new Error('잘못된 시나리오 형식입니다.');
    }
    return parsed as Scenario;
  } catch (error) {
    console.error('시나리오 불러오기 실패:', error);
    return null;
  }
}
