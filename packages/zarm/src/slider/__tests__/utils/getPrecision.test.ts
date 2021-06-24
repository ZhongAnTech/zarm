import getPrecision from '../../utils/getPrecision';

describe('#getPrecision', () => {
  it.each`
    step        | expected
    ${2.3}      | ${1}
    ${3.0}      | ${0}
    ${1}        | ${0}
    ${3.222}    | ${3}
    ${3.002}    | ${3}
    ${0.002}    | ${3}
    ${NaN}      | ${0}
    ${Infinity} | ${0}
  `('precision should be $expected when step = $step', ({ step, expected }) => {
    expect(getPrecision(step)).toEqual(expected);
  });
});
