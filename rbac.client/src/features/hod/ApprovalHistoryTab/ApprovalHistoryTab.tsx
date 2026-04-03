import { Card } from 'antd';
import { HistoryTable } from './HistoryTable';
import { useApprovalHistory } from '../useApprovalHistory';

export function ApprovalHistoryTab() {
  const { data = [], isLoading } = useApprovalHistory();
  return <Card><HistoryTable data={data} isLoading={isLoading} /></Card>;
}
