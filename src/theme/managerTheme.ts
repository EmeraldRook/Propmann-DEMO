import type { ThemeConfig } from 'antd';

const managerTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0f766e',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#0f766e',
    borderRadius: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f0fdfa',
  },
  components: {
    Layout: {
      siderBg: 'transparent',
      headerBg: '#ffffff',
      bodyBg: '#f0fdfa',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: 'rgba(15,118,110,0.25)',
      darkItemHoverBg: 'rgba(255,255,255,0.08)',
      darkItemColor: 'rgba(255,255,255,0.6)',
      darkItemSelectedColor: '#ffffff',
      itemBorderRadius: 8,
      iconSize: 18,
    },
    Card: {
      borderRadiusLG: 16,
    },
    Button: {
      borderRadius: 12,
    },
    Table: {
      borderRadiusLG: 12,
    },
  },
};

export default managerTheme;
