/**
 * Generate CSS box-shadow pixel art from a 2D array of colors.
 * Each cell in the grid maps to a pixel (box-shadow unit).
 *
 * @param {string[][]} grid - 2D array where each cell is a CSS color or '' for transparent
 * @param {number} pixelSize - Size of each pixel in px (default 4)
 * @returns {string} CSS box-shadow value
 */
export function gridToBoxShadow(grid, pixelSize = 4) {
  const shadows = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const color = grid[y][x];
      if (color) {
        shadows.push(
          `${(x + 1) * pixelSize}px ${(y + 1) * pixelSize}px 0 0 ${color}`
        );
      }
    }
  }
  return shadows.join(', ');
}

/**
 * Create a simple color palette mapping for pixel art
 */
export const PIXEL_COLORS = {
  sand: '#E8D5B7',
  sandDark: '#C4A882',
  terra: '#C67B4B',
  terraDark: '#A0522D',
  blue: '#1E6091',
  blueLight: '#2E86C1',
  gold: '#D4A017',
  goldBright: '#FFD700',
  red: '#C0392B',
  redLight: '#E74C3C',
  mint: '#1ABC9C',
  mintDark: '#16A085',
  purple: '#6C3483',
  purpleLight: '#8E44AD',
  charcoal: '#2C3E50',
  night: '#1A1A2E',
  white: '#FFFFFF',
  skin: '#FDBCB4',
  skinDark: '#D4956B',
  brown: '#5C4033',
  brownLight: '#8B6914',
};
