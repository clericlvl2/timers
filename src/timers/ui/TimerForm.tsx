import { Button, Card, Form, InputNumber } from "antd";
import { useUnit } from "effector-react";
import { $view, formChanged, formSubmitted } from "../model/form";

const fieldsConfig = [
	{
		key: "hh",
		placeholder: "Hours...",
		max: 23,
		min: 0,
	},
	{
		key: "mm",
		placeholder: "Minutes...",
		max: 59,
		min: 0,
	},
	{
		key: "ss",
		placeholder: "Seconds...",
		max: 59,
		min: 0,
	},
] as const;

export const TimerForm = () => {
	const [{ form, showErrors }, onSubmit, onChange] = useUnit([
		$view,
		formSubmitted,
		formChanged,
	]);

	return (
		<Card className="w-full">
			<Form
				className="flex flex-col gap-2 items-stretch sm:items-baseline sm:flex-row sm:gap-4"
				onFinish={onSubmit}
			>
				{fieldsConfig.map((f) => (
					<InputNumber
						style={{ width: "100%" }}
						key={f.key}
						value={form[f.key]}
						min={f.min}
						max={f.max}
						placeholder={f.placeholder}
						status={showErrors ? "error" : ""}
						onChange={(value) => onChange({ key: f.key, value })}
					/>
				))}
				<Button type="primary" htmlType="submit" className="w-full">
					Run
				</Button>
			</Form>
		</Card>
	);
};
