import { useUnit } from "effector-react";
import type { ChangeEvent, FormEvent } from "react";
import { timerFormModel } from "./model/form";
import { TimeInput } from "./TimeInput";

const HOUR_CONFIG = {
	MAX: 23,
	MIN: 0,
};

const MIN_CONFIG = {
	MAX: 59,
	MIN: 0,
};

const SEC_CONFIG = {
	MAX: 59,
	MIN: 0,
};

export const TimerForm = () => {
	const [
		onSubmit,
		formData,
		formError,
		onHoursChanged,
		onMinutesChanged,
		onSecondsChanged,
	] = useUnit([
		timerFormModel.formSubmitted,
		timerFormModel.$form,
		timerFormModel.$formError,
		timerFormModel.hhChanged,
		timerFormModel.mmChanged,
		timerFormModel.ssChanged,
	]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
	};

	const createOnChangeHandler = (cb: (val: string) => void) => {
		return (e: ChangeEvent<HTMLInputElement>) => cb(e.target.value);
	};

	return (
		<form
			style={{
				display: "grid",
				gridTemplateRows: "1fr 1fr",
				gridTemplateColumns: "repeat(4, min-content)",
				alignItems: "center",
				gap: "1rem",
				justifyContent: "center",
			}}
			onSubmit={handleSubmit}
		>
			<TimeInput
				value={formData.hh}
				onChange={createOnChangeHandler(onHoursChanged)}
				name="hh"
				max={HOUR_CONFIG.MAX}
				min={HOUR_CONFIG.MIN}
			/>
			<TimeInput
				value={formData.mm}
				onChange={createOnChangeHandler(onMinutesChanged)}
				name="mm"
				max={MIN_CONFIG.MAX}
				min={MIN_CONFIG.MIN}
			/>
			<TimeInput
				value={formData.ss}
				onChange={createOnChangeHandler(onSecondsChanged)}
				name="ss"
				max={SEC_CONFIG.MAX}
				min={SEC_CONFIG.MIN}
			/>

			<button type="submit" style={{ padding: "2px 8px" }}>
				Run
			</button>
			<div
				style={{
					gridColumn: "1/4",
					gridRow: "2/3",
					height: 24,
					color: "brown",
				}}
			>
				{formError}
			</div>
		</form>
	);
};
