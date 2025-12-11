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
		action: timersModel.start,
	},
	[TimerStatus.Running]: {
		iconComponent: PauseCircleOutlined,
		action: timersModel.pause,
	},
	[TimerStatus.Completed]: {
		iconComponent: ReloadOutlined,
		action: timersModel.resume,
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
