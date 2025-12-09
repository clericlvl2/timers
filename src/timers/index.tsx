import { TimerForm } from "./TimerForm";
import { TimersList } from "./TimersList";

export const TimersView = () => {
	return (
		<div
			style={{
				display: "flex",
				gap: 12,
				flexDirection: "column",
				width: "100%",
			}}
		>
			<TimerForm />
			<TimersList />
		</div>
	);
};
