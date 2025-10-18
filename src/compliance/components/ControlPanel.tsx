import React, { useEffect, useMemo, useRef } from 'react';
import { AppState, Action, Settings } from '../../state/types';
import { Select } from './shared/Select';
import { ExpressionButton } from './shared/ExpressionButton';
import { useImageUpload } from '../../hooks/useImageUpload';
import {
  ARTISTIC_STYLES,
  COLOR_PALETTES,
  COMPOSITIONS,
  PACK_SIZES,
  RESOLUTIONS,
  EXPRESSIONS_LIST,
  STYLE_COMPATIBILITY,
  ANIMATION_STYLES
} from '../../utils/constants';

interface ControlPanelProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ state, dispatch }) => {
  const { settings, selectedExpressions, sourceImage, isCalibrated } = state;
  const { handleImageChange, removeImage } = useImageUpload(dispatch);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSettingChange = (key: keyof Settings, value: any) => {
    const isNumeric = ['packSize', 'resolution'].includes(key);
    dispatch({
      type: 'SET_SETTING',
      payload: { key, value: isNumeric ? Number(value) : value },
    });
  };

  const handleExpressionToggle = (expressionName: string) => {
    dispatch({ type: 'TOGGLE_EXPRESSION', payload: { expressionName } });
  };

  const { compatibleLineStyles, compatibleShadingStyles } = useMemo(() => {
    const compatibility = STYLE_COMPATIBILITY[settings.artisticStyle];
    return {
      compatibleLineStyles: compatibility.lines,
      compatibleShadingStyles: compatibility.shades,
    };
  }, [settings.artisticStyle]);

  useEffect(() => {
    if (!compatibleLineStyles.includes(settings.lineStyle)) {
      handleSettingChange('lineStyle', compatibleLineStyles[0]);
    }
    if (!compatibleShadingStyles.includes(settings.shadingStyle)) {
      handleSettingChange('shadingStyle', compatibleShadingStyles[0]);
    }
  }, [compatibleLineStyles, compatibleShadingStyles, settings.lineStyle, settings.shadingStyle]);


  return (
    <div className="bg-gray-800/50 p-4 rounded-lg h-full flex flex-col space-y-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-white mb-2">Control Panel</h2>

      {/* SECTION 1: Input Mode */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Input Mode</h3>
        <div className="flex space-x-4">
          {['image', 'text'].map(mode => (
            <label key={mode} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="inputMode"
                value={mode}
                checked={settings.inputMode === mode}
                onChange={() => handleSettingChange('inputMode', mode)}
                className="form-radio h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <span className="capitalize">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SECTION 2: Subject & Identity */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Subject & Identity</h3>
        {settings.inputMode === 'image' ? (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            {!sourceImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/50 transition"
              >
                <p className="text-gray-400">Click to Upload Image</p>
              </div>
            ) : (
              <div className="relative">
                <img src={sourceImage} alt="Uploaded preview" className="w-full h-32 object-cover rounded-lg" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 rounded-b-lg flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${isCalibrated ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {isCalibrated ? '✓ Calibrated' : 'Not Calibrated'}
                  </span>
                  <button 
                    onClick={() => dispatch({ type: 'START_CALIBRATION' })}
                    className="bg-purple-600 text-white text-xs px-3 py-1 rounded hover:bg-purple-700 transition"
                  >
                    Calibrate
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="e.g., A wise wizard cat"
              value={settings.textSubject}
              onChange={(e) => handleSettingChange('textSubject', e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            />
            <textarea
              placeholder="e.g., Wearing star-patterned robes, has green eyes"
              value={settings.textCharacteristics}
              onChange={(e) => handleSettingChange('textCharacteristics', e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
              rows={2}
            />
          </div>
        )}
      </div>

      {/* SECTION 3: Expression & Pose */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Expression & Pose</h3>

        {/* Output Format Toggle */}
        <div className="flex space-x-2 bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => handleSettingChange('outputFormat', 'static')}
            className={`w-1/2 py-1 rounded-md text-sm transition ${settings.outputFormat === 'static' ? 'bg-purple-600' : 'hover:bg-gray-600'}`}
          >Static</button>
          <button
            onClick={() => handleSettingChange('outputFormat', 'animated')}
            className={`w-1/2 py-1 rounded-md text-sm transition ${settings.outputFormat === 'animated' ? 'bg-purple-600' : 'hover:bg-gray-600'}`}
          >Animated</button>
        </div>

        {settings.outputFormat === 'animated' && <p className="text-xs text-purple-300">Select only one expression for animated stickers.</p>}

        <div className="grid grid-cols-4 gap-2">
          {EXPRESSIONS_LIST.map(exp => (
            <ExpressionButton
              key={exp.name}
              {...exp}
              isSelected={selectedExpressions.includes(exp.name)}
              onClick={() => handleExpressionToggle(exp.name)}
            />
          ))}
        </div>

        {/* Animation Controls - Conditional */}
        {settings.outputFormat === 'animated' && (
          <div className="space-y-3 pt-3 border-t border-gray-700">
            <Select
              label="Animation Style"
              value={settings.animationStyle}
              options={ANIMATION_STYLES}
              onChange={(v) => handleSettingChange('animationStyle', v as any)}
            />
            {settings.animationStyle === 'Custom' && (
              <input
                type="text"
                placeholder="Describe the animation..."
                value={settings.customAnimationPrompt}
                onChange={(e) => handleSettingChange('customAnimationPrompt', e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
              />
            )}
          </div>
        )}
      </div>

      {/* SECTION 4: Style & Format */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Style & Format</h3>
        <Select
          label="Artistic Style"
          value={settings.artisticStyle}
          options={ARTISTIC_STYLES}
          onChange={(v) => handleSettingChange('artisticStyle', v)}
        />
        <Select
          label="Color Palette"
          value={settings.colorPalette}
          options={COLOR_PALETTES}
          onChange={(v) => handleSettingChange('colorPalette', v)}
        />
        <Select
          label="Line Style"
          value={settings.lineStyle}
          options={compatibleLineStyles}
          onChange={(v) => handleSettingChange('lineStyle', v)}
        />
        <Select
          label="Shading Style"
          value={settings.shadingStyle}
          options={compatibleShadingStyles}
          onChange={(v) => handleSettingChange('shadingStyle', v)}
        />
        <Select
          label="Composition"
          value={settings.composition}
          options={COMPOSITIONS}
          onChange={(v) => handleSettingChange('composition', v)}
        />
      </div>

      {/* SECTION 5: Pack & Quality */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Pack & Quality</h3>
        <Select
          label="Pack Size"
          value={settings.packSize}
          options={PACK_SIZES}
          onChange={(v) => handleSettingChange('packSize', v)}
        />
        <Select
          label="Resolution (px)"
          value={settings.resolution}
          options={RESOLUTIONS}
          onChange={(v) => handleSettingChange('resolution', v)}
        />
      </div>
    </div>
  );
};
