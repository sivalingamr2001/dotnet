import {
  AuditOutlined,
  FolderOpenOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { ItemType } from 'antd/es/menu/interface';

export const useRoleMenu = (role: string | null): ItemType[] => {
  if (role === 'HOD') return [
    { key: '/dashboard', icon: <TeamOutlined />, label: 'Overview' },
    { key: '/hod', icon: <SafetyOutlined />, label: 'Approvals' },
  ];
  if (role === 'IT') return [
    { key: '/dashboard', icon: <AuditOutlined />, label: 'Overview' },
    { key: '/it', icon: <SafetyOutlined />, label: 'IT Queue' },
  ];
  return [
    { key: '/dashboard', icon: <FolderOpenOutlined />, label: 'Overview' },
    { key: '/requests', icon: <SafetyOutlined />, label: 'My Requests' },
  ];
};
