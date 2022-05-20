import convert from 'color-convert';

const util = {
  getHueFromRGB : (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h);
  },
  randomRGBValue : () => {
    const R = Math.round(Math.random() * 255);
    const G = Math.round(Math.random() * 255);
    const B = Math.round(Math.random() * 255);
    return [R, G, B];
  },
  getRandomBetweenValue: (min, max) => {
    const diff = max - min;
    let random = Math.random();
    random = Math.floor(random * diff);
    random = random + min;
    return random;
  },
  getVisibleName: (concept) => {
    switch(concept) {
      case 'pale': return 'Pale'
      case 'lightGrayish': return 'Light grayish'
      case 'grayish': return 'Grayish'
      case 'darkGrayish': return 'Dark grayish'
      case 'light': return 'Light'
      case 'soft': return 'Soft'
      case 'dull': return 'Dull'
      case 'dark': return 'Dark'
      case 'bright': return 'Bright'
      case 'strong': return 'Strong'
      case 'deep': return 'Deep'
      case 'vivid': return 'Vivid'
      default : return '';
    }
  },
  getTooltipPlacement: (pi) => {
    if(pi === 0) return 'bottom';
    if(pi > 0 && pi < (0.5)) return 'bottom-start';
    if(pi === (0.5)) return 'right';
    if(pi > (0.5) && pi < 1) return 'top-start';
    if(pi === 1) return 'top';
    if(pi > 1 && pi < (1.5)) return 'top-end';
    if(pi === (1.5)) return 'left';
    if(pi > (1.5) && pi < 2) return 'bottom-end';
    return 'top';
  },
  convertFromRgb: (r,g,b) => {
    return {
      hex: convert.rgb.hex(r,g,b),
      hsl: convert.rgb.hsl(r,g,b),
      hsv: convert.rgb.hsv(r,g,b),
    }
  },
  getRgbStr: (r,g,b) => {
    return `rgb(${r}, ${g}, ${b})`;
  },
  getHslStr: (h,s,l) => {
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  getHsvStr: (h,s,v) => {
    return `hsv(${h}, ${s}%, ${v}%)`;
  },
  getHexStr: (hex) => {
    return `#${hex}`;
  }
}

export default util;