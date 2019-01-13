import {
  BEST_IV_ID,
  DECENT_IV_ID,
  FANTASTIC_IV_ID,
  IVID,
  NO_GOOD_IV_ID,
  PRETTY_GOOD_IV_ID,
  VERY_GOOD_IV_ID,
} from './pokemon-ivs';

type IVRange = [number, number];

const iVRanges: { [key: string]: IVRange } = {
  [BEST_IV_ID]: [31, 31],
  [FANTASTIC_IV_ID]: [30, 30],
  [VERY_GOOD_IV_ID]: [26, 29],
  [PRETTY_GOOD_IV_ID]: [16, 25],
  [DECENT_IV_ID]: [1, 15],
  [NO_GOOD_IV_ID]: [0, 0],
};

/**
 * Given a number, will return the ID of the corresponding IV group
 * @example getIVRangeId(10); // Will return 'decent'
 */
export const getIVRangeId = (value: number): IVID => {
  // @ts-ignore
  const ids: IVID[] = Object.keys(iVRanges);

  for (let x = 0; x <= ids.length - 1; x++) {
    const id = ids[x];
    const range = iVRanges[id];
    if (value >= range[0] && value <= range[1]) {
      return id;
    }
  }

  /**
   * Since 'best' range has infinity as maximum, and 'no good' has -infinity as minimum,
   * it should never reach point
   */
  return ids[0];
};
