/*
  calc frequency of first numbers according to Benford's law
 */

let distribution: { [k: string]: number };

const benfordDistribution = (): { [k: string]: number } => {
  if (!distribution) {
    distribution = {};
    for (let n = 1; n < 10; n += 1) {
      distribution[String(n)] = Math.log10(1 + 1 / n) * 100;
    }
  }
  return distribution;
};

export default benfordDistribution;
