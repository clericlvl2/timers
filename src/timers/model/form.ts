import { createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import { StorageKey } from "./storage";
import { timersModel } from "./timer";

type FormValue = number | null;

export interface TimerForm {
	hh: FormValue;
	mm: FormValue;
	ss: FormValue;
}
const formSubmitted = createEvent();

const $form = createStore<TimerForm>({
	hh: null,
	mm: null,
	ss: null,
});
const $formError = createStore<string | null>(null);

interface FormChangedPayload {
	key: "hh" | "mm" | "ss";
	value: FormValue;
}

const formChanged = createEvent<FormChangedPayload>();

sample({
	clock: formChanged,
	source: $form,
	fn: (form, { key, value }) => ({ ...form, [key]: value }),
	target: $form,
});

const isFormValid = ({ hh, mm, ss }: TimerForm) => Boolean(hh || mm || ss);

sample({
	clock: formSubmitted,
	source: $form,
	filter: isFormValid,
	target: timersModel.add,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: (t) => !isFormValid(t),
	fn: () => "Fields must not be empty",
	target: $formError,
});

sample({
	clock: timersModel.add,
	fn: () => null,
	target: $formError,
});

sample({
	clock: timersModel.add,
	fn: () => ({ hh: null, mm: null, ss: null }),
	target: $form,
});

persist({
	store: $form,
	key: StorageKey.FormData,
});

export const timerFormModel = {
	form: $form,
	formError: $formError,
	submit: formSubmitted,
	change: formChanged,
};
