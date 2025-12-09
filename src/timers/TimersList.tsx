import { useList } from "effector-react";
import { timerModel } from "./model/timer";
import { TimerRender } from "./TimersListItem";

export const TimersList = () => {
	const list = useList(timerModel.$timers, TimerRender);

	return (
		<ul
			style={{
				margin: 0,
				padding: 0,
				display: "flex",
				flexDirection: "column",
				gap: 4,
			}}
		>
			{list}
		</ul>
	);
};
