import type { Timer } from "../../model/timer";
import { useItemActions } from "./useTimerActions";

export const TimerActions = ({ id, status }: Pick<Timer, "id" | "status">) => {
	const actions = useItemActions({ id, status });

	return (
		<div className="flex flex-wrap sm:justify-end  gap-2">
			{actions.map(({ component, id }) => (
				<span key={id}>{component}</span>
			))}
		</div>
	);
};
