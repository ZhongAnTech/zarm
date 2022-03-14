import execa from 'execa';
import { getProjectPath } from './utils';

export interface ITestConfig {
  mode: 'native';
  updateSnapshot: boolean;
  coverage: boolean;
  setupFilesAfterEnv: string;
  watch?: boolean;
}

export default ({ mode, updateSnapshot, coverage, setupFilesAfterEnv, watch }: Partial<ITestConfig>) => {
  const configFile = require.resolve(
    `./config/jestConfig/${mode === 'native' ? 'index.native' : 'index'}`,
  );
  const args = [
    require.resolve('jest/bin/jest'),
    `--config=${configFile}`,
    `--setupFilesAfterEnv=${getProjectPath(setupFilesAfterEnv)}`,
  ];
  updateSnapshot && args.push('-u');
  coverage && args.push('--coverage');
  watch && args.push("--watch");
  execa('node', args, { stdio: 'inherit' });
};
