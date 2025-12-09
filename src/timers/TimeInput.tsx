import type { InputHTMLAttributes } from "react";

type TimeFormProps = Required<
	Pick<
		InputHTMLAttributes<HTMLInputElement>,
		"name" | "min" | "max" | "value" | "onChange"
	>
>;

const MAX_TIME_INPUT_LENGTH = 2;

export const TimeInput = (props: TimeFormProps) => {
	return (
		<div style={{ display: "flex", gap: 4 }}>
			<label htmlFor={props.name}>{props.name}</label>
			<input
				{...props}
				id={props.name}
				type="number"
				maxLength={MAX_TIME_INPUT_LENGTH}
			/>
		</div>
	);
};
