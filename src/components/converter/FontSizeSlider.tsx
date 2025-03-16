import { useTranslations } from 'next-intl';

interface FontSizeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const FontSizeSlider = ({ value, onChange, min, max }: FontSizeSliderProps) => {
  const t = useTranslations('converter');

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
          {t('rootFontSize')}
        </label>
        <span className="text-sm font-medium text-gray-900">{value}px</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          id="font-size"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="w-16">
          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= min && val <= max) {
                onChange(val);
              }
            }}
            className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FontSizeSlider; 