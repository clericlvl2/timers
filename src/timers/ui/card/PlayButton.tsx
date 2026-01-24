import {
	PauseCircleOutlined,
	PlayCircleOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useMemo } from "react";
import { type Timer, TimerStatus, timersModel } from "../../model/timer";

const playButtonConfig = {
	[TimerStatus.Paused]: {
		iconComponent: PlayCircleOutlined,
		action: timersModel.started,
	},
	[TimerStatus.Running]: {
		iconComponent: PauseCircleOutlined,
		action: timersModel.paused,
	},
	[TimerStatus.Completed]: {
		iconComponent: ReloadOutlined,
		action: timersModel.resumed,
	},
};
const usePlayButtonConfig = (status: TimerStatus) => {
	return useMemo(() => playButtonConfig[status], [status]);
};
export const PlayButton = ({ id, status }: Pick<Timer, "id" | "status">) => {
	const { action, iconComponent: IconComponent } = usePlayButtonConfig(status);
	return (
		<Button size="large" icon={<IconComponent />} onClick={() => action(id)} />
	);
};
