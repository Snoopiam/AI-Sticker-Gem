// src/utils/constants.ts
// This file centralizes the selectable options for our UI.

import { ArtisticStyle, LineStyle, ShadingStyle } from "../state/types";

export const ARTISTIC_STYLES: ArtisticStyle[] = [
  'Cartoon Vector', 'Sticker Style', 'Kawaii', 'Chibi', '3D Render', 
  'Lineart', 'Flat', 'WPAP', 'Pop', 'Tritone', 'Dotwork', 
  'Watercolor', 'Oil Painting', 'Pencil Sketch', 'Photorealistic'
];

export const COLOR_PALETTES = ['Vibrant', 'Pastel', 'Monochrome'];
export const LINE_STYLES: LineStyle[] = ['Bold', 'Thin', 'Hand-drawn', 'Smooth', 'None'];
export const SHADING_STYLES: ShadingStyle[] = ['Flat', 'Cel-shading', 'Gradient', 'None'];
export const COMPOSITIONS = ['Headshot / Bust', 'Half-Body', 'Full-Body'];
export const PACK_SIZES = [1, 2, 4, 8, 12, 16, 20];
export const RESOLUTIONS = [512, 768, 1024];

export const EXPRESSIONS = [
  { name: 'HEY', icon: '👋' }, { name: 'Nod', icon: '点头' }, { name: 'High Five', icon: '🙏' },
  { name: 'Thumbs Up', icon: '👍' }, { name: 'PEACE SIGN', icon: '✌️' }, { name: 'Heart-hands', icon: '🫶' },
  { name: 'Laughing', icon: '😂' }, { name: 'In Love', icon: '😍' }, { name: 'Sad', icon: '😢' }, { name: 'Angry', icon: '😠' },
  { name: 'Facepalm', icon: '🤦' }, { name: 'Shrug', icon: '🤷' }, { name: 'Mind Blown', icon: '🤯' },
  { name: 'Wink', icon: '😉' }, { name: 'Thinking', icon: '🤔' }, { name: 'Celebrating', icon: '🎉' }
];

// Detailed descriptions for each expression to enhance prompt engineering
export const EXPRESSIONS_MAP = new Map<string, string>([
  ['HEY', 'Waving hello with a friendly and welcoming gesture, raised hand, happy expression'],
  ['Nod', 'Nodding in agreement or acknowledgment, subtle head movement, confident and assured'],
  ['High Five', 'Giving a high five with an energetic and celebratory pose, hand raised up'],
  ['Thumbs Up', 'Giving a thumbs up gesture with approval and positivity, confident smile'],
  ['PEACE SIGN', 'Making a peace or victory sign with fingers, cheerful and optimistic'],
  ['Heart-hands', 'Making a heart shape with hands, showing love and affection, warm expression'],
  ['Laughing', 'Laughing out loud with pure joy, eyes closed or squinting, mouth wide open'],
  ['In Love', 'Heart-eyes expression, deeply in love, blushing cheeks, dreamy and affectionate'],
  ['Sad', 'Sad and disappointed expression, tears or teary eyes, downcast look, somber mood'],
  ['Angry', 'Angry and frustrated expression, furrowed brows, frowning, intense and upset'],
  ['Facepalm', 'Facepalm gesture showing embarrassment or disbelief, hand covering face'],
  ['Shrug', 'Shrugging shoulders with a "I don\'t know" or indifferent gesture, neutral expression'],
  ['Mind Blown', 'Mind blown expression, shocked and amazed, hands on head, wide eyes'],
  ['Wink', 'Playful wink with one eye closed, flirty and mischievous smile'],
  ['Thinking', 'Thinking pose with hand on chin or head, contemplative and curious expression'],
  ['Celebrating', 'Celebrating with joy and excitement, arms raised, confetti or party mood']
]);

export const ANIMATION_STYLES = [
  'Subtle Movement', 'Bouncing', 'Wiggle', 'Spinning', 'Shimmering',
  'Floating', 'Pulsing', 'Glitching', 'Zoom In-Out', 'Custom'
];

// --- STYLE COMPATIBILITY MATRIX ---
// Defines which line and shading styles are valid for each artistic style.
export const STYLE_COMPATIBILITY: Record<ArtisticStyle, { lines: LineStyle[], shades: ShadingStyle[] }> = {
  'Cartoon Vector': { lines: ['Bold', 'Thin', 'Smooth'], shades: ['Flat', 'Cel-shading', 'Gradient'] },
  'Sticker Style':  { lines: ['Bold', 'Smooth'], shades: ['Cel-shading', 'Gradient'] },
  'Kawaii':         { lines: ['Bold', 'Thin', 'Smooth'], shades: ['Flat', 'Cel-shading', 'Gradient'] },
  'Chibi':          { lines: ['Bold', 'Smooth'], shades: ['Cel-shading', 'Gradient'] },
  '3D Render':      { lines: ['None'], shades: ['Gradient'] },
  'Lineart':        { lines: ['Bold', 'Thin', 'Hand-drawn', 'Smooth'], shades: ['None'] },
  'Flat':           { lines: ['Bold', 'Thin', 'Smooth', 'None'], shades: ['Flat'] },
  'WPAP':           { lines: ['Bold'], shades: ['Flat'] },
  'Pop':            { lines: ['Bold', 'Thin'], shades: ['Flat', 'Cel-shading'] },
  'Tritone':        { lines: ['Bold', 'Smooth', 'None'], shades: ['Flat'] },
  'Dotwork':        { lines: ['Thin'], shades: ['None'] },
  'Watercolor':     { lines: ['Thin', 'Hand-drawn', 'None'], shades: ['Gradient', 'None'] },
  'Oil Painting':   { lines: ['Bold', 'Hand-drawn', 'Smooth', 'None'], shades: ['Gradient'] },
  'Pencil Sketch':  { lines: ['Thin', 'Hand-drawn'], shades: ['None'] },
  'Photorealistic': { lines: ['None'], shades: ['Gradient'] },
};

