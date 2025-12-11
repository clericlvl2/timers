import { TimerForm } from "./ui/TimerForm";
import { TimersList } from "./ui/TimersList";

export const TimersView = () => {
	return (
		<div className="w-full flex flex-col items-center gap-4">
			<TimerForm />
			<TimersList />
		</div>
	);
};
