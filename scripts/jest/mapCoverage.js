const { createReporter } = require('istanbul-api');
const istanbulCoverage = require('istanbul-lib-coverage');

const map = istanbulCoverage.createCoverageMap();
const reporter = createReporter();

const platforms = ['h5', 'rn'];

platforms.forEach((p) => {
  // eslint-disable-next-line
  const coverage = require(`../../coverage/coverage-${p}-final.json`);
  Object.keys(coverage).forEach(
    filename => map.addFileCoverage(coverage[filename]),
  );
});

reporter.addAll(['json', 'lcov', 'text']);
reporter.write(map);
