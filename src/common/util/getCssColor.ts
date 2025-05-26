import cssColors from '../const/cssColors';

const HEX_COLOR_REGEX = /^#?(?<hex>[0-9A-Fa-f]{3,8})$/;

export const getCssColor = (inp: string): string | undefined => {
  const match = new RegExp(HEX_COLOR_REGEX).exec(inp);
  const hexColor = match?.groups?.hex.toUpperCase().repeat(2).slice(0, 6);

  if (!hexColor) {
    return cssColors[inp]?.toUpperCase();
  }

  return `#${hexColor}`;
};
