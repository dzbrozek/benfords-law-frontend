import benfordDistribution from 'core/benfordDistribution';

describe("Benford's distribution", () => {
  it('should calc distribution', () => {
    expect(benfordDistribution()).toEqual({
      '1': 30.10299956639812,
      '2': 17.609125905568124,
      '3': 12.493873660829992,
      '4': 9.691001300805642,
      '5': 7.918124604762482,
      '6': 6.694678963061322,
      '7': 5.799194697768673,
      '8': 5.115252244738129,
      '9': 4.575749056067514,
    });
  });
});
