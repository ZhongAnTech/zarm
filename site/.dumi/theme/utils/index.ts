export const getLocalizedPathname = (
  path: string,
  zhCN?: boolean,
  search?: string,
  hash?: {
    zhCN?: string;
    enUS?: string;
  },
) => {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  let fullPath: string;
  if (!zhCN) {
    fullPath = /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    fullPath = '/index-cn';
  } else if (pathname.endsWith('/')) {
    fullPath = pathname.replace(/\/$/, '-cn/');
  } else {
    fullPath = `${pathname}-cn`;
    fullPath = fullPath.replace(/(-cn)+/, '-cn');
  }

  if (hash) {
    const localHash = hash[zhCN ? 'zhCN' : 'enUS'];
    fullPath += `#${localHash}`;
  }

  return { pathname: fullPath, search };
};

export const isZhCN = (pathname: string) => {
  return /-cn\/?$/.test(pathname);
};
