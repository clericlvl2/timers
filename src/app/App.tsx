import { Typography } from "antd";
import { TimersView } from "../timers";

export const App = () => {
	return (
		<div className="min-w-xs max-w-3xl m-auto min-h-screen flex flex-col items-center p-8 gap-6">
			<Typography.Title level={2}>Create Timers!</Typography.Title>

			<TimersView />
		</div>
	);
};
