import { TimersView } from "../timers";

// todo tailwind or ant design

export const App = () => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h1>Create Timers!</h1>
			<TimersView />
		</div>
	);
};
