import { combine, createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import { not, reset } from "patronum";
import { StorageKey } from "./storage";
import { timersModel } from "./timer";

type Time = number | null;

export interface TimerForm {
	label: string | null;
	hh: Time;
	mm: Time;
	ss: Time;
}

type FormChangedPayload =
	| { key: "hh" | "mm" | "ss"; value: Time }
	| { key: "label"; value: string | null };

const formSubmitted = createEvent();
const formChanged = createEvent<FormChangedPayload>();
const formReset = createEvent();

const $showErrors = createStore(false);
const $form = createStore<TimerForm>({
	label: null,
	hh: null,
	mm: null,
	ss: null,
});

const $formErrors = $form.map(({ hh, mm, ss }) => ({
	label: null,
	hh: null,
	mm: null,
	ss: null,
	form: !hh && !mm && !ss ? "Timer must be greater than 0" : null,
}));

const $isFormValid = $formErrors.map((errors) =>
	Object.values(errors).every((error) => error === null),
);

const $view = combine({
	form: $form,
	errors: $formErrors,
	showErrors: $showErrors,
	isValid: $isFormValid,
});

sample({
	clock: formChanged,
	source: $form,
	filter: (currentForm, { key, value }) => currentForm[key] !== value,
	fn: (form, { key, value }) => ({ ...form, [key]: value }),
	target: $form,
});

sample({
	clock: formChanged,
	filter: $isFormValid,
	fn: () => false,
	target: $showErrors,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: not($isFormValid),
	fn: () => true,
	target: $showErrors,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: $isFormValid,
	target: [timersModel.added, formReset],
});

reset({
	clock: formReset,
	target: [$form],
});

persist({
	store: $form,
	key: StorageKey.FormData,
});

export { $view, formChanged, formSubmitted };
