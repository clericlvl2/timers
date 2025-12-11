import type { ItemId } from "@shared";
import { Button } from "antd";
import { useMemo } from "react";
import { timersModel } from "./model/timer";

export const useItemActions = (id: ItemId) =>
	useMemo(
		() => [
			{
				id: "play",
				component: <Button onClick={() => timersModel.start(id)}>Play</Button>,
			},
			{
				id: "pause",
				component: <Button onClick={() => timersModel.pause(id)}>Pause</Button>,
			},
			{
				id: "remove",
				component: (
					<Button danger onClick={() => timersModel.remove(id)}>
						Remove
					</Button>
				),
			},
		],
		[id],
	);
