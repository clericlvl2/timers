import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMemo } from "react";
import { type Timer, timersModel } from "../../model/timer";
import { PlayButton } from "./PlayButton";

export const useItemActions = ({ id, status }: Pick<Timer, "id" | "status">) =>
	useMemo(
		() => [
			{
				id: "play",
				component: <PlayButton id={id} status={status} />,
			},
			{
				id: "remove",
				component: (
					<Button
						icon={<CloseCircleOutlined />}
						size="large"
						danger
						onClick={() => timersModel.remove(id)}
					/>
				),
			},
		],
		[id, status],
	);
