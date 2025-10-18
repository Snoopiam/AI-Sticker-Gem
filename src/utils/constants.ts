import { ArtisticStyle, LineStyle, ShadingStyle, AnimationStyle } from "../state/types";

export const ARTISTIC_STYLES: ArtisticStyle[] = [
  'Cartoon Vector', 'Sticker Style', 'Kawaii', 'Chibi', '3D Render', 
  'Lineart', 'Flat', 'WPAP', 'Pop', 'Tritone', 'Dotwork', 
  'Watercolor', 'Oil Painting', 'Pencil Sketch', 'Photorealistic'
];

export const ANIMATION_STYLES: AnimationStyle[] = [
  'Subtle Movement', 'Bouncing', 'Wiggle', 'Spinning', 'Shimmering', 
  'Floating', 'Pulsing', 'Glitching', 'Zoom In-Out', 'Custom'
];

export const COLOR_PALETTES = ['Vibrant', 'Pastel', 'Monochrome'];
export const LINE_STYLES: LineStyle[] = ['Bold', 'Thin', 'Hand-drawn', 'Smooth', 'None'];
export const SHADING_STYLES: ShadingStyle[] = ['Flat', 'Cel-shading', 'Gradient', 'None'];
export const COMPOSITIONS = ['Headshot / Bust', 'Half-Body', 'Full-Body'];
export const PACK_SIZES = [1, 2, 4, 8, 12, 16, 20];
export const RESOLUTIONS = [512, 768, 1024];

export const EXPRESSIONS_LIST = [
    // Greetings
    { name: 'HEY', icon: '👋', description: "Enthusiastic wave with big, friendly smile, one hand raised.", category: 'Greetings' },
    { name: 'Nod', icon: '点头', description: "Slight, respectful nod with polite smile.", category: 'Greetings' },
    { name: 'Respect', icon: '👊', description: "Fist extended forward for a cool fistbump, showing respect.", category: 'Greetings' },
    { name: 'Love You', icon: '❤️', description: "Heart shape made with hands over chest, warm loving expression.", category: 'Greetings' },

    // Gestures
    { name: 'Thumbs Up', icon: '👍', description: "An enthusiastic thumbs up with a confident smile.", category: 'Gestures' },
    { name: 'Approved', icon: '👍👍', description: "Giving two enthusiastic thumbs up with a confident smile.", category: 'Gestures' },
    { name: 'PEACE SIGN', icon: '✌️', description: "Classic V-sign near face with cheerful expression.", category: 'Gestures' },
    { name: 'Heart-hands', icon: '🫶', description: "Perfect heart shape formed with both hands.", category: 'Gestures' },
    { name: 'My Man!!', icon: '👉', description: "Pointing with both hands in a cool, 'that's my man' gesture of approval.", category: 'Gestures' },
    { name: 'F*You!', icon: '🖕', description: "Raising the middle finger with a stern, unimpressed expression.", category: 'Gestures' },


    // Emotions
    { name: 'Laughing', icon: '😂', description: "Hysterical laughter, head thrown back, eyes squeezed shut, cartoon tears of joy.", category: 'Emotions' },
    { name: 'In Love', icon: '😍', description: "Large glowing heart eyes, blissful smile, hands clasped to chest.", category: 'Emotions' },
    { name: 'Sad', icon: '😢', description: "Downcast look, quivering frown, large cartoon tears.", category: 'Emotions' },
    { name: 'Angry', icon: '😠', description: "Furrowed brows, scowl, clenched teeth, steam from ears.", category: 'Emotions' },

    // Reactions
    { name: 'Facepalm', icon: '🤦', description: "Palm pressed to forehead in disbelief, eyes closed in exasperation.", category: 'Reactions' },
    { name: 'Shrug', icon: '🤷', description: "Shoulders raised, palms up, with an indifferent 'I don't know' expression.", category: 'Reactions' },
    { name: 'Mind Blown', icon: '🤯', description: "Top of head exploding with energy/stars, shocked face.", category: 'Reactions' },
    { name: 'Wink', icon: '😉', description: "Playful wink with one eye, confident lopsided smile.", category: 'Poses' },
    
    // Poses
    { name: 'Thinking', icon: '🤔', description: "Finger on chin, looking upward, lightbulb above head.", category: 'Poses' },
    { name: 'Celebrating', icon: '🎉', description: "Arms raised triumphantly, throwing confetti, huge smile.", category: 'Activities' },

    // Surprise
    { name: 'Whoa!', icon: '😮', description: "Lifting sunglasses with a look of surprise and impressiveness.", category: 'Surprise' },
    { name: 'Shocked', icon: '😲', description: "Jaw-dropped, eyes popping out cartoonishly, frozen stiff.", category: 'Surprise' },

    // Custom
    { name: 'Smoke Weed', icon: '🚬', description: "Sitting cross-legged in a red robe, smoking a joint with a blissful expression.", category: 'Custom' },
    { name: 'Puff Pass', icon: '💨', description: "Exhaling a cloud of smoke while pointing off-screen.", category: 'Custom' },
];

export const EXPRESSIONS_MAP = new Map(EXPRESSIONS_LIST.map(e => [e.name, e.description]));

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