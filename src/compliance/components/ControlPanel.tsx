// src/compliance/components/ControlPanel.tsx
import React, { useEffect } from 'react';
import { AppState, Action } from '../../state/types';
import { Select } from './shared/Select';
import { ExpressionButton } from './shared/ExpressionButton';
import * as Constants from '../../utils/constants';

interface ControlPanelProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ state, dispatch }) => {
  const { settings, selectedExpressions } = state;

  // Get compatible line and shading styles based on the current artistic style
  const compatibility = Constants.STYLE_COMPATIBILITY[settings.artisticStyle];
  const compatibleLineStyles = compatibility.lines;
  const compatibleShadingStyles = compatibility.shades;

  // Auto-correct incompatible line and shading styles when artistic style changes
  useEffect(() => {
    if (!compatibleLineStyles.includes(settings.lineStyle)) {
      dispatch({
        type: 'SET_SETTING',
        payload: { key: 'lineStyle', value: compatibleLineStyles[0] },
      });
    }
    if (!compatibleShadingStyles.includes(settings.shadingStyle)) {
      dispatch({
        type: 'SET_SETTING',
        payload: { key: 'shadingStyle', value: compatibleShadingStyles[0] },
      });
    }
  }, [settings.artisticStyle, settings.lineStyle, settings.shadingStyle, compatibleLineStyles, compatibleShadingStyles, dispatch]);

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    // Coerce value to number if it's a numeric setting
    const isNumeric = ['packSize', 'resolution'].includes(key);
    dispatch({
      type: 'SET_SETTING',
      payload: { key, value: isNumeric ? Number(value) : value },
    });
  };

  const handleExpressionToggle = (expressionName: string) => {
    dispatch({ type: 'TOGGLE_EXPRESSION', payload: { expressionName } });
  };

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg h-full flex flex-col space-y-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-white mb-2">Control Panel</h2>
      
      {/* SECTION 1: Input Mode */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Input Mode</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleSettingChange('inputMode', 'image')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              settings.inputMode === 'image'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Image Upload
          </button>
          <button
            onClick={() => handleSettingChange('inputMode', 'text')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              settings.inputMode === 'text'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Text Prompt
          </button>
        </div>
      </div>

      {/* SECTION 2: Subject (Text Mode Only) */}
      {settings.inputMode === 'text' && (
        <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
          <h3 className="font-semibold text-purple-300">Subject Description</h3>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-400">What/Who</label>
            <input
              type="text"
              value={settings.textSubject}
              onChange={(e) => handleSettingChange('textSubject', e.target.value)}
              placeholder="e.g., A cute cat, A warrior, A robot..."
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-400">Characteristics</label>
            <textarea
              value={settings.textCharacteristics}
              onChange={(e) => handleSettingChange('textCharacteristics', e.target.value)}
              placeholder="e.g., wearing a hat, blue eyes, holding a sword..."
              rows={3}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
        </div>
      )}

      {/* SECTION 3: Expression & Pose */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Expression & Pose</h3>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-400">Expressions (Select Multiple)</label>
          <div className="grid grid-cols-3 gap-2">
            {Constants.EXPRESSIONS.map((expression) => (
              <ExpressionButton
                key={expression.name}
                label={`${expression.icon} ${expression.name}`}
                isSelected={selectedExpressions.includes(expression.name)}
                onClick={() => handleExpressionToggle(expression.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-400">Output Format</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleSettingChange('outputFormat', 'static')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                settings.outputFormat === 'static'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Static
            </button>
            <button
              onClick={() => handleSettingChange('outputFormat', 'animated')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                settings.outputFormat === 'animated'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Animated
            </button>
          </div>
        </div>
        {settings.outputFormat === 'animated' && (
          <>
            <Select 
              label="Animation Style"
              value={settings.animationStyle}
              options={Constants.ANIMATION_STYLES}
              onChange={(v) => handleSettingChange('animationStyle', v)}
            />
            {settings.animationStyle === 'Custom' && (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-400">Custom Animation Prompt</label>
                <input
                  type="text"
                  value={settings.customAnimationPrompt}
                  onChange={(e) => handleSettingChange('customAnimationPrompt', e.target.value)}
                  placeholder="Describe the animation..."
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
            )}
          </>
        )}
      </div>
      
      {/* SECTION 4: Style & Format */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Style & Format</h3>
        <Select 
          label="Artistic Style"
          value={settings.artisticStyle}
          options={Constants.ARTISTIC_STYLES}
          onChange={(v) => handleSettingChange('artisticStyle', v)}
        />
        <Select 
          label="Color Palette"
          value={settings.colorPalette}
          options={Constants.COLOR_PALETTES}
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
          options={Constants.COMPOSITIONS}
          onChange={(v) => handleSettingChange('composition', v)}
        />
      </div>

      {/* SECTION 5: Pack & Quality */}
      <div className="space-y-3 p-3 bg-gray-900/50 rounded-md">
        <h3 className="font-semibold text-purple-300">Pack & Quality</h3>
        <Select 
          label="Pack Size"
          value={settings.packSize}
          options={Constants.PACK_SIZES}
          onChange={(v) => handleSettingChange('packSize', v)}
        />
        <Select 
          label="Resolution (px)"
          value={settings.resolution}
          options={Constants.RESOLUTIONS}
          onChange={(v) => handleSettingChange('resolution', v)}
        />
      </div>
    </div>
  );
};

