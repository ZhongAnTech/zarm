import path from 'path';
import fs from 'fs';
import { Configuration } from 'webpack';

export interface FileInfo {
  filePath?: string;
  type?: string;
}

const fileTree = (list: FileInfo[], dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      fileTree(list, filePath);
    } else {
      const type = path.extname(files[i]).substring(1);
      list.push({ filePath, type });
    }
  }
};

// 获取项目文件
const getProjectPath = (dir = './'): string => {
  return path.join(process.cwd(), dir);
};

export interface CustomConfig extends Configuration {
  entries: object;
  banner: string;
  setBabelOptions: (options: string | { [index: string]: any }) => void;
  setRules: (rules: Configuration['module']['rules']) => void;
  setPlugins: (plugins: Configuration['plugins']) => void;
}

// 获取项目文件
const getCustomConfig = (configFileName = 'zarm.config.js'): Partial<CustomConfig> => {
  const configPath = path.join(process.cwd(), configFileName);
  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line import/no-dynamic-require
    return require(configPath);
  }
  return {};
};

export { fileTree, getProjectPath, getCustomConfig };
