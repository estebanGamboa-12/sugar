export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  if (inMax - inMin === 0) return outMin;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
