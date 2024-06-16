export const hexToRgb = (hex: string) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');
    
  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export const getLuminance = (r, g, b) => {
  // Convert RGB values to the range [0, 1]
  r /= 255;
  g /= 255;
  b /= 255;

  // Apply gamma correction
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const isLightOrDark = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5 ? 'light' : 'dark';
}