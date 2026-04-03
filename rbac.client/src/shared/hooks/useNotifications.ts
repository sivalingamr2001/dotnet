import { useQuery } from '@tanstack/react-query';

export interface NotificationRecord {
  id: number;
  title: string;
  type: 'request' | 'approval' | 'alert';
  unread: boolean;
}

const notificationData: NotificationRecord[] = [
  { id: 1, title: 'Request 1042 approved by HOD', type: 'approval', unread: true },
  { id: 2, title: 'IT queue has 1 pending grant', type: 'alert', unread: true },
  { id: 3, title: 'Access expiry due in 5 days', type: 'alert', unread: false },
];

export const useNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: async () => notificationData,
    refetchInterval: 30000,
  });
