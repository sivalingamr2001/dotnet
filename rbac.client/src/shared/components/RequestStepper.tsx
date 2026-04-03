import { Steps } from 'antd';

const statusMap: Record<string, { current: number; status?: 'error' }> = {
  PendingHOD: { current: 0 },
  PendingIT: { current: 1 },
  Approved: { current: 2 },
  RejectedByHOD: { current: 0, status: 'error' },
  RejectedByIT: { current: 1, status: 'error' },
};

export function RequestStepper({
  currentStatus,
}: {
  currentStatus: string;
  rejectedAt?: 'HOD' | 'IT';
}) {
  const meta = statusMap[currentStatus] ?? { current: 0 };
  return (
    <Steps
      current={meta.current}
      status={meta.status}
      items={[{ title: 'Submitted' }, { title: 'HOD Review' }, { title: 'IT Grant' }]}
    />
  );
}
