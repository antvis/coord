/**
 * Sample to calucation the polar bbox.
 */
function getPolarBbox(startTheta: number, endTheta: number) {
  if (Math.abs(endTheta - startTheta) >= Math.PI * 2) {
    return {
      minX: -0.5,
      maxX: 0.5,
      minY: -0.5,
      maxY: 0.5,
    };
  }

  const xs = [0, Math.cos(startTheta), Math.cos(endTheta)];
  const ys = [0, Math.sin(startTheta), Math.sin(endTheta)];

  for (let i = Math.min(startTheta, endTheta); i < Math.max(startTheta, endTheta); i += Math.PI / 18) {
    xs.push(Math.cos(i));
    ys.push(Math.sin(i));
  }

  return {
    minX: Math.min(...xs) / 2,
    maxX: Math.max(...xs) / 2,
    minY: Math.min(...ys) / 2,
    maxY: Math.max(...ys) / 2,
  };
}
/**
 * Adjust x,y and radius in polar automatically.
 */
export function autoPolar(startTheta: number, endTheta: number, width: number, height: number) {
  const { minX, maxX, minY, maxY } = getPolarBbox(startTheta, endTheta);

  const w = maxX - minX;
  const h = maxY - minY;

  const max = Math.max(width, height);

  // Calucate base on width.
  const offsetRadius = Math.min(width / w, height / h) / max - 1;
  const offsetX = Math.abs(maxX + minX) * (1 + offsetRadius);
  const offsetY = Math.abs(maxY + minY) * (1 + offsetRadius);

  return [
    // x
    offsetX * (Math.abs(maxX) - Math.abs(minX) ? -1 : 1),
    // y
    offsetY * (Math.abs(maxY) - Math.abs(minY) ? -1 : 1),
    // r
    offsetRadius,
  ];
}
