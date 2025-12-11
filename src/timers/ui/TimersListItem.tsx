import { Card } from "antd";
import type { Timer } from "../model/timer";
import { TimeDisplay } from "./card/TimeDisplay";
import { TimerActions } from "./card/TimerActions";
import { TotalTimeDisplay } from "./card/TotalTimeDisplay";

export const TimerCard = ({ id, displayTime, displayTotal, status }: Timer) => {
	return (
		<Card>
			<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center">
				<div>
					<TimeDisplay value={displayTime} />
					<TotalTimeDisplay value={displayTotal} />
				</div>

				<div className="flex ">
					<TimerActions id={id} status={status} />
				</div>
			</div>
		</Card>
	);
};
