import { Typography } from "antd";
import { TimersView } from "../timers";

export const App = () => {
	return (
		<div className="min-h-screen flex flex-col items-center p-8 gap-6">
			<Typography.Title level={2}>Create Timers!</Typography.Title>

			<TimersView />
		</div>
	);
};
