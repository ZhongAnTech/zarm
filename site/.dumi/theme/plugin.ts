import { IApi } from 'dumi';

export default (api: IApi) => {
  api.modifyRoutes((routes) => {
    routes.gallery = {
      id: 'gallery',
      path: 'gallery',
      absPath: '/gallery',
      parentId: 'GlobalLayout',
      file: require.resolve('../gallery/index.tsx'),
    };

    return routes;
  });
};
