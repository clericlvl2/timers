import { Typography } from "antd";

export const TimeDisplay = ({ value }: { value: string }) => {
	return <Typography.Title level={3}>{value}</Typography.Title>;
};
