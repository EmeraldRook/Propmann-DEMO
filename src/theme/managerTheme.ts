import type { ThemeConfig } from 'antd';

const managerTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0f766e',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    colorInfo: '#0284c7',
    borderRadius: 12,
    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Card: {
      borderRadiusLG: 16,
    },
    Button: {
      borderRadius: 10,
    },
    Table: {
      borderRadius: 12,
    },
    Select: {
      borderRadius: 10,
    },
  },
};

export default managerTheme;
