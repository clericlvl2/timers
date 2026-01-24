import { Typography } from "antd";
import { useUnit } from "effector-react/compat";
import { timersModel } from "../model/timer";
import { TimerCard } from "./TimersListItem";

export const TimersList = () => {
	const timers = useUnit(timersModel.$list);

	return (
		<div className="w-full flex flex-col gap-4 text-center">
			{!timers.length && (
				<Typography.Text type="secondary">No timers yet</Typography.Text>
			)}
			{timers.map((timer, index) => (
				<TimerCard key={timer.id ?? index} {...timer} />
			))}
		</div>
	);
};

/**
 * 1. # цифру в начало
 * 2. total под тикер
 * 3. тикер больше
 * 4. кнопки в конец
 * 5. слить плей поз
 * 6. кроестик вместо remove
 */
