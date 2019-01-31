import chroma from 'chroma-js';
import { log } from '../../common/utils/logger';

export const areSimilarColors = (sample: string, comparision: string, similitude: number) => {
  const sampleRGB = chroma(sample).rgb();
  const comparisionRGB = chroma(comparision).rgb();
  let d = 0;

  for (let i = 0; i < sampleRGB.length; i++) {
    d += (sampleRGB[i] - comparisionRGB[i]) * (sampleRGB[i] - comparisionRGB[i]);
  }

  log(`Comparing <${sample}> to <${comparision}>: ${Math.sqrt(d)}`);

  return Math.sqrt(d) < similitude;
};
