import { Input } from 'antd';

export function EmployeeSearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  return <Input.Search placeholder="Search by employee ID" enterButton onSearch={onSearch} />;
}
