import { Select } from 'antd';

const options = ['All', 'RequestCreated', 'HODApproved', 'ITApproved', 'Revoked'].map((value) => ({ value }));

export function AuditFilters({ onChange }: { onChange: (value: string) => void }) {
  return <Select defaultValue="All" options={options} onChange={onChange} />;
}
