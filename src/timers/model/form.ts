import { createEvent, createStore, sample } from "effector";
import { type TimerForm, timerModel } from "./timer";

// todo formChanged

const hhChanged = createEvent<string>();
const mmChanged = createEvent<string>();
const ssChanged = createEvent<string>();
const formSubmitted = createEvent();

const $form = createStore<TimerForm>({
	hh: "",
	mm: "",
	ss: "",
});

const $formError = createStore<string | null>(null);

sample({
	clock: hhChanged,
	source: $form,
	fn: (form, hh) => ({ ...form, hh }),
	target: $form,
});

sample({
	clock: mmChanged,
	source: $form,
	fn: (form, mm) => ({ ...form, mm }),
	target: $form,
});

sample({
	clock: ssChanged,
	source: $form,
	fn: (form, ss) => ({ ...form, ss }),
	target: $form,
});

const isFormValid = (formData: TimerForm) =>
	Boolean(Number(formData.hh) || Number(formData.mm) || Number(formData.ss));

sample({
	clock: formSubmitted,
	source: $form,
	filter: isFormValid,
	target: timerModel.timerAdded,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: (t) => !isFormValid(t),
	fn: () => "Fields must not be empty",
	target: $formError,
});

sample({
	clock: timerModel.timerAdded,
	fn: () => null,
	target: $formError,
});

sample({
	clock: timerModel.timerAdded,
	fn: () => ({ hh: "", mm: "", ss: "" }),
	target: $form,
});

export const timerFormModel = {
	$form,
	$formError,
	formSubmitted,
	hhChanged,
	mmChanged,
	ssChanged,
};
