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

interface FormChangedPayload {
	key: "hh" | "mm" | "ss";
	value: FormValue;
}

const formSubmitted = createEvent();
const formChanged = createEvent<FormChangedPayload>();

const $formError = createStore<string | null>(null);
const $form = createStore<TimerForm>({
	hh: null,
	mm: null,
	ss: null,
});

const isFormValid = ({ hh, mm, ss }: TimerForm) => Boolean(hh || mm || ss);

sample({
	clock: formChanged,
	source: $form,
	fn: (form, { key, value }) => ({ ...form, [key]: value }),
	target: $form,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: isFormValid,
	target: timersModel.added,
});

sample({
	clock: formSubmitted,
	source: $form,
	filter: (t) => !isFormValid(t),
	fn: () => "Fields must not be empty",
	target: $formError,
});

sample({
	clock: timersModel.added,
	fn: () => null,
	target: $formError,
});

sample({
	clock: timersModel.added,
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
