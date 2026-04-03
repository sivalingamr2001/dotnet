import { Result } from 'antd';

export function Forbidden() {
  return (
    <Result
      status="403"
      title="Permission required"
      subTitle="Your current role does not have access to this view."
    />
  );
}
