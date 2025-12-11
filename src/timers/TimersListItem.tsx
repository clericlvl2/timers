import type { ItemId } from "@shared";
import { Card, Col, Row, Tag, Typography } from "antd";
import type { Timer } from "./model/timer";
import { TimerStatus } from "./model/timer";
import { useItemActions } from "./useTimerActions";

const TimerActions = ({ id }: { id: ItemId }) => {
	const actions = useItemActions(id);

	return (
		<div className="flex flex-wrap gap-2">
			{actions.map(({ component, id }) => (
				<span key={id}>{component}</span>
			))}
		</div>
	);
};

const TimeDisplay = ({ value }: { value: string }) => {
	return (
		<Typography.Title
			level={4}
			className="!m-0 font-mono tracking-wide select-none"
		>
			{value}
		</Typography.Title>
	);
};

const TotalTimeDisplay = ({ value }: { value: string }) => {
	return (
		<Typography.Text type="secondary">Total duration: {value}</Typography.Text>
	);
};

const StatusTag = ({ status }: { status: TimerStatus }) => {
	return (
		<Tag color={status === TimerStatus.Running ? "green" : "default"}>
			<Typography.Text>{status}</Typography.Text>
		</Tag>
	);
};

const IndexDisplay = ({ value }: { value: number }) => {
	return <Typography.Text type="secondary">#{value}</Typography.Text>;
};

export const TimerCard = ({
	timer,
	index,
}: {
	timer: Timer;
	index?: number;
}) => {
	const { id, displayTime, displayTotal, status } = timer;

	return (
		<Card>
			<Row justify="space-between" align="middle" className="mb-1">
				<Col>
					<TimeDisplay value={displayTime} />
				</Col>

				{index !== undefined && index > -1 && (
					<Col>
						<IndexDisplay value={index + 1} />
					</Col>
				)}
			</Row>

			<Row className="mb-3">
				<Col>
					<StatusTag status={status} />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col>
					<TotalTimeDisplay value={displayTotal} />
				</Col>
			</Row>

			<TimerActions id={id} />
		</Card>
	);
};
