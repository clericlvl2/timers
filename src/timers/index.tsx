import { TimerForm } from "./TimerForm";
import { TimersList } from "./TimersList";

export const TimersView = () => {
	return (
		<div className="flex flex-col items-center gap-4 min-w-xs">
			<TimerForm />
			<TimersList />
		</div>
	);
};
