import { FACILITIES, METHODS } from './constants';

function normalize(x) {
  return x.toLowerCase().replace(/[^0-9a-z]/g, '');
}

// Planets we like
const special = [
  '47 UMa',
  '4 UMa',
  '51 Peg',
  '55 Cnc',
  '61 Vir',
  '75 Cet',
  '91 Aqr',
  'BD+15 2940',
  'BD+20 2457',
  'BD-10 3166b',
  'BD-11 4672b',
  'CI Tau',
  'CoRoT-16 b',
  'Kepler-174d',
  'HD 180314b',
  'HD 9446',
  'HD 95089 c',
  'HD 96063 b',
  'HD 98736 b',
  'HD 96127 b',
  'HD 208527 b',
  'HD 21693 c',
  'HD 11755 b',
  'HD 7199 b',
  'WASP-38b',
  'WASP-35b',
  'WASP45b',
  'WASP-61b',
  'WASP-67b',
  'WASP-6b',
  'WASP-70A b',
  'WASP-73b',
  'WASP-79b',
  'WASP-7b',
  'HR 858 b',
  '2MASS J01225093-2439505 b',

].map(x => normalize(x));

const bad = [
  'OGLE-2015-BLG-0966L b',
  'OGLE-2016-BLG-0263L b',
  'OGLE-2018-BLG-1011L c',
  'OGLE-2015-BLG-0051L b',
  'OGLE-2016-BLG-0613L AB b',
  'OGLE-2017-BLG-0373L b',
  'OGLE-2014-BLG-1760L b',
  'OGLE-TR-056 b',
  'OGLE-2015-BLG-1649L b',
  'OGLE-2016-BLG-1195L b',
  'OGLE-2016-BLG-1190L b',
  'OGLE-2015-BLG-0954L b',
  'OGLE-2017-BLG-0482L b',
  'OGLE-2018-BLG-0596L b',
  'OGLE-2018-BLG-0740L b',
  'OGLE-2018-BLG-1011L b',
  'OGLE-2017-BLG-1140L b',
  'OGLE-2016-BLG-1067L b',
  'OGLE-2017-BLG-1522L b',
  'OGLE-2017-BLG-1434L b',
  'OGLE-2017-BLG-0173L b',
  'OGLE-2015-BLG-1670L b',
].map(x => normalize(x));

function weight(name) {
  const normalized = normalize(name);

  if (special.some(x => normalized.includes(x))) return 20;
  if (bad.some(x => normalized.includes(x))) return 0.05;
  if (normalized.includes('kepler')) return 0.2;
  if (normalized.includes('hd')) return 1.4;
  if (normalized.includes('wasp')) return 14.2;
  return 1;
}

function float(x) {
  if (x == '') return null;
  const parsed = parseFloat(x);
  if (isNaN(parsed)) return null;
  return parsed;
}

export function parseCsv(text) {
  return text
    .split("\n")
    .filter(x => x.trim().length > 0)
    .map(x => x.split(",")).map(v => {
      return [{
        name: v[0],
        fn: v[0].replace(/ /g, ''),
        ra: v[1],
        dec: v[2],
        dist: float(v[3]),
        distErr: float(v[4]),
        orbPer: float(v[5]),
        orbPerErr: float(v[6]),
        mass: float(v[7]),
        massErr: float(v[8]),
        radius: float(v[9]),
        radiusErr: float(v[10]),
        facility: FACILITIES[v[11]],
        method: METHODS[v[12]],
      }, weight(v[0])
      ];
    });
}
