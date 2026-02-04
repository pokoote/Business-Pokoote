'use client';

import { useState, useEffect } from 'react';
import { BusinessInput } from '@/lib/types';
import { getPresetByKey } from '@/lib/presets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputForm from '@/components/calculator/InputForm';
import ResultDisplay from '@/components/calculator/ResultDisplay';
import ScenarioManager from '@/components/calculator/ScenarioManager';
import { calculateBreakEven, calculateSensitivityAnalysis } from '@/lib/calculations';

export default function CalculatorPage() {
  // URL에서 프리셋 파라미터 읽기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const presetKey = params.get('preset');
      
      if (presetKey) {
        const preset = getPresetByKey(presetKey);
        if (preset) {
          setInput(preset);
        }
      }
    }
  }, []);

  const [input, setInput] = useState<BusinessInput>({
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
      paymentFeeRate: 2.5,
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
      storeAov: 10000,
      deliveryAov: 10000,
    },
    openDays: 26,
    targetProfit: 0,
  });

  const result = calculateBreakEven(input);
  const sensitivity = calculateSensitivityAnalysis(input);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              손익분기점 · 목표매출 계산기
            </h1>
            <p className="text-gray-600">
              아래 정보를 입력하면 실시간으로 손익분기점, 목표매출, 필요 주문수를 계산합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 입력 폼 */}
            <div>
              <InputForm input={input} setInput={setInput} />
            </div>

            {/* 결과 표시 */}
            <div>
              <ResultDisplay result={result} input={input} sensitivity={sensitivity} />
            </div>
          </div>

          {/* 시나리오 관리 */}
          <div className="mt-8">
            <ScenarioManager currentInput={input} currentResult={result} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
