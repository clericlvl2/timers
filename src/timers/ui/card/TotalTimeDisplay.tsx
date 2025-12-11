import { Typography } from "antd";

export const TotalTimeDisplay = ({ value }: { value: string }) => {
	return <Typography.Text type="secondary">Duration: {value}</Typography.Text>;
};
