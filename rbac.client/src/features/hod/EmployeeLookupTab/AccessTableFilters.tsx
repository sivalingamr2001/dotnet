import { Select, Space } from 'antd';

const options = ['All', 'Read', 'Write', 'Full'].map((value) => ({ value, label: value }));

export function AccessTableFilters({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return <Space><Select defaultValue="All" options={options} onChange={onChange} /></Space>;
}
