'use client';

import { BusinessInput } from '@/lib/types';
import { getPresetNames, getPresetByKey } from '@/lib/presets';

interface Props {
  input: BusinessInput;
  setInput: (input: BusinessInput) => void;
}

export default function InputForm({ input, setInput }: Props) {
  const [showFixedCostDetails, setShowFixedCostDetails] = useState(false);
  const [showCapacityCheck, setShowCapacityCheck] = useState(false);

  const presets = getPresetNames();

  const handlePresetClick = (key: string) => {
    const preset = getPresetByKey(key);
    if (preset) {
      setInput(preset);
      if (preset.capacityCheck) {
        setShowCapacityCheck(true);
      }
    }
  };

  const updateFixedCosts = (field: keyof BusinessInput['fixedCosts'], value: number) => {
    setInput({
      ...input,
      fixedCosts: {
        ...input.fixedCosts,
        [field]: value,
      },
    });
  };

  const updateVariableCosts = (field: keyof BusinessInput['variableCosts'], value: number) => {
    setInput({
      ...input,
      variableCosts: {
        ...input.variableCosts,
        [field]: value,
      },
    });
  };

  const updateSalesMix = (field: keyof BusinessInput['salesMix'], value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    const otherField = field === 'storeShare' ? 'deliveryShare' : 'storeShare';
    setInput({
  ...input,
  salesMix: {
    storeShare: field === 'storeShare' ? newValue : 100 - newValue,
    deliveryShare: field === 'deliveryShare' ? newValue : 100 - newValue,
   },
  });
  };

  const updateAov = (field: keyof BusinessInput['aov'], value: number) => {
    setInput({
      ...input,
      aov: {
        ...input.aov,
        [field]: value,
      },
    });
  };

  const updateCapacityCheck = (field: keyof NonNullable<BusinessInput['capacityCheck']>, value: number | undefined) => {
    setInput({
      ...input,
      capacityCheck: {
        ...input.capacityCheck,
        [field]: value,
      },
    });
  };

  const totalFixedCosts = Object.values(input.fixedCosts).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6">
      {/* 업종 프리셋 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">업종 프리셋 (선택)</h3>
        <p className="text-sm text-gray-600 mb-3">
          예시 값으로 빠르게 시작하세요. <span className="text-orange-600 font-semibold">실제 값으로 반드시 수정하세요.</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => handlePresetClick(preset.key)}
              className="btn-outline text-sm py-2"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 고정비 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">1. 월 고정비 <span className="text-red-500">*필수</span></h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            고정비 합계 (원)
          </label>
          <input
            type="number"
            className="input-field text-lg font-bold"
            value={totalFixedCosts}
            readOnly
          />
        </div>

        <button
          onClick={() => setShowFixedCostDetails(!showFixedCostDetails)}
          className="text-primary-600 text-sm font-semibold mb-3"
        >
          {showFixedCostDetails ? '▼ 세부항목 접기' : '▶ 세부항목 펼치기'}
        </button>

        {showFixedCostDetails && (
          <div className="space-y-3 border-t pt-3">
            <div>
              <label className="block text-sm font-medium mb-1">임대료 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.rent}
                onChange={(e) => updateFixedCosts('rent', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">관리비 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.maintenance}
                onChange={(e) => updateFixedCosts('maintenance', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">고정공과금 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.utilities}
                onChange={(e) => updateFixedCosts('utilities', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">고정인건비 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.fixedLabor}
                onChange={(e) => updateFixedCosts('fixedLabor', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">구독/통신 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.subscriptions}
                onChange={(e) => updateFixedCosts('subscriptions', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">리스/감가 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.depreciation}
                onChange={(e) => updateFixedCosts('depreciation', Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">기타고정비 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.fixedCosts.other}
                onChange={(e) => updateFixedCosts('other', Number(e.target.value))}
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      {/* 변동비율 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">2. 변동비율 (매출 대비 %) <span className="text-red-500">*필수</span></h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">원가율 (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.cogsRate}
              onChange={(e) => updateVariableCosts('cogsRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">결제수수료율 (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.paymentFeeRate}
              onChange={(e) => updateVariableCosts('paymentFeeRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">플랫폼수수료율 (배달 사용시) (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.platformFeeRate}
              onChange={(e) => updateVariableCosts('platformFeeRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">포장/소모품율 (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.packagingRate}
              onChange={(e) => updateVariableCosts('packagingRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">폐기/누락율 (선택) (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.wasteRate || 0}
              onChange={(e) => updateVariableCosts('wasteRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">변동인건비율 (선택) (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.variableCosts.variableLaborRate || 0}
              onChange={(e) => updateVariableCosts('variableLaborRate', Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* 매출 믹스 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">3. 매출 믹스 <span className="text-red-500">*필수</span></h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">매장 비중 (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.salesMix.storeShare}
              onChange={(e) => updateSalesMix('storeShare', Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">배달 비중 (%)</label>
            <input
              type="number"
              className="input-field"
              value={input.salesMix.deliveryShare}
              onChange={(e) => updateSalesMix('deliveryShare', Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          <p className="text-sm text-gray-600">
            합계: {input.salesMix.storeShare + input.salesMix.deliveryShare}%
          </p>
        </div>
      </div>

      {/* 객단가 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">4. 객단가 <span className="text-red-500">*필수</span></h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">매장 객단가 (원)</label>
            <input
              type="number"
              className="input-field"
              value={input.aov.storeAov}
              onChange={(e) => updateAov('storeAov', Number(e.target.value))}
              min="1"
            />
          </div>
          {input.salesMix.deliveryShare > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">배달 객단가 (원)</label>
              <input
                type="number"
                className="input-field"
                value={input.aov.deliveryAov || 0}
                onChange={(e) => updateAov('deliveryAov', Number(e.target.value))}
                min="1"
              />
            </div>
          )}
        </div>
      </div>

      {/* 영업일수 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">5. 월 영업일수 <span className="text-red-500">*필수</span></h3>
        <input
          type="number"
          className="input-field"
          value={input.openDays}
          onChange={(e) => setInput({ ...input, openDays: Number(e.target.value) })}
          min="1"
          max="31"
        />
      </div>

      {/* 목표 순이익 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">6. 목표 순이익 (선택)</h3>
        <p className="text-sm text-gray-600 mb-3">
          달성하고 싶은 월 순이익을 입력하세요. 비워두면 손익분기점만 계산합니다.
        </p>
        <input
          type="number"
          className="input-field"
          value={input.targetProfit || 0}
          onChange={(e) => setInput({ ...input, targetProfit: Number(e.target.value) })}
          min="0"
          placeholder="예: 3000000"
        />
      </div>

      {/* 현실가능성 캐파 체크 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3">7. 현실가능성 캐파 체크 (선택)</h3>
        <button
          onClick={() => setShowCapacityCheck(!showCapacityCheck)}
          className="btn-outline text-sm mb-3"
        >
          {showCapacityCheck ? '숨기기' : '캐파 체크 입력하기'}
        </button>

        {showCapacityCheck && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <h4 className="font-semibold mb-2">매장 캐파</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">좌석 수</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.seats || ''}
                    onChange={(e) => updateCapacityCheck('seats', e.target.value ? Number(e.target.value) : undefined)}
                    min="1"
                    placeholder="예: 20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">평균 체류시간 (분)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.avgDwellMinutes || ''}
                    onChange={(e) => updateCapacityCheck('avgDwellMinutes', e.target.value ? Number(e.target.value) : undefined)}
                    min="1"
                    placeholder="예: 60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">순영업시간 (시간/일)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.netServiceHoursPerDay || ''}
                    onChange={(e) => updateCapacityCheck('netServiceHoursPerDay', e.target.value ? Number(e.target.value) : undefined)}
                    min="0.1"
                    step="0.5"
                    placeholder="예: 10"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">배달 캐파</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">피크타임 합계 (시간/일)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.peakHoursPerDay || ''}
                    onChange={(e) => updateCapacityCheck('peakHoursPerDay', e.target.value ? Number(e.target.value) : undefined)}
                    min="0.1"
                    step="0.5"
                    placeholder="예: 4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">시간당 처리 가능 주문수</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.capacityOrdersPerHour || ''}
                    onChange={(e) => updateCapacityCheck('capacityOrdersPerHour', e.target.value ? Number(e.target.value) : undefined)}
                    min="0.1"
                    placeholder="예: 8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">또는 평균 주문 처리시간 (분)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.capacityCheck?.prepMinutes || ''}
                    onChange={(e) => updateCapacityCheck('prepMinutes', e.target.value ? Number(e.target.value) : undefined)}
                    min="0.1"
                    placeholder="예: 7.5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// useState import 추가
import { useState } from 'react';
