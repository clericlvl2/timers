import { type Timer, timerModel } from "./model/timer";

const formatTimeValue = (value: number | null) => {
	return (value ?? "").toString().padStart(2, "0");
};

const TIME_VALUE_SEPARATOR = " : ";

const TimerValue = ({ hh, mm, ss }: Pick<Timer, "hh" | "mm" | "ss">) => {
	const value = [hh, mm, ss].map(formatTimeValue).join(TIME_VALUE_SEPARATOR);

	return <span>{value}</span>;
};

const TimerControlPanel = ({ id }: Pick<Timer, "id">) => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<button type="button" onClick={() => timerModel.timerStarted(id)}>
				Play
			</button>
			<button type="button" onClick={() => timerModel.timerPaused(id)}>
				Pause
			</button>
			<button type="button" onClick={() => timerModel.timerRemoved(id)}>
				Remove
			</button>
		</div>
	);
};

export const TimerRender = (
	{ hh, mm, ss, id, status }: Timer,
	index: number,
) => {
	return (
		<li style={{ display: "flex", gap: 8, justifyContent: "center" }}>
			<span>[{index + 1}]</span>
			<span>Status: "{status}"</span>
			<TimerValue hh={hh} mm={mm} ss={ss} />
			<TimerControlPanel id={id} />
		</li>
	);
};
