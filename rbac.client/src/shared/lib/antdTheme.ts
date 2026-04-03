import { theme, type ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#2563EB',
    colorBgBase: '#0F1117',
    colorBgContainer: '#0e1220',
    colorBorder: '#1e2740',
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
  components: {
    Table: { colorBgContainer: '#0a0e18' },
    Layout: { siderBg: '#08090f', headerBg: '#0e1220', bodyBg: '#0F1117' },
    Menu: { itemBg: '#08090f' },
  },
};
