import { useTranslations } from 'next-intl';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  fromUnit: 'px' | 'rem';
  toUnit: 'px' | 'rem';
  onChangeFromUnit: (unit: 'px' | 'rem') => void;
  onChangeToUnit: (unit: 'px' | 'rem') => void;
  onSwapUnits: () => void;
}

const InputSection = ({
  value,
  onChange,
  fromUnit,
  toUnit,
  onChangeFromUnit,
  onChangeToUnit,
  onSwapUnits
}: InputSectionProps) => {
  const t = useTranslations('converter');

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="value-input" className="block text-sm font-medium text-gray-700 mb-1">
          {t('inputPlaceholder')}
        </label>
        <input
          id="value-input"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="w-full px-4 py-3 text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          autoFocus
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label htmlFor="from-unit" className="block text-sm font-medium text-gray-700 mb-1">
            {t('from')}
          </label>
          <select
            id="from-unit"
            value={fromUnit}
            onChange={(e) => onChangeFromUnit(e.target.value as 'px' | 'rem')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="px">px</option>
            <option value="rem">rem</option>
          </select>
        </div>
        
        <button
          type="button"
          onClick={onSwapUnits}
          className="mt-6 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Swap units"
        >
          <ArrowsRightLeftIcon className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex-1">
          <label htmlFor="to-unit" className="block text-sm font-medium text-gray-700 mb-1">
            {t('to')}
          </label>
          <select
            id="to-unit"
            value={toUnit}
            onChange={(e) => onChangeToUnit(e.target.value as 'px' | 'rem')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="px">px</option>
            <option value="rem">rem</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InputSection; 