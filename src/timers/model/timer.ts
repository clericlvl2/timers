import { createUUID, type ItemId, Time, updateListById } from "@shared";
import { combine, createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import type { TimerForm } from "./form";
import { StorageKey } from "./storage";
import { tickerModel } from "./ticker";

export interface Timer {
	id: ItemId;
	status: TimerStatus;
	displayTime: string;
	displayTotal: string;
	createdAt: number;
	timestamp: number;
	elapsed: number;
	total: number;
}

export enum TimerStatus {
	Running = "running",
	Paused = "paused",
	Completed = "completed",
}

const $timers = createStore<Timer[]>([]);
const $runningTimersCount = combine(
	$timers,
	(timers) =>
		timers.filter((timer) => timer.status === TimerStatus.Running).length,
);

const timerAdded = createEvent<TimerForm>();
const timerStarted = createEvent<ItemId>();
const timerPaused = createEvent<ItemId>();
const timerRemoved = createEvent<ItemId>();
const timerResumed = createEvent<ItemId>();

const createTimer = ({ hh, mm, ss }: TimerForm) => {
	const now = Date.now();
	const time = new Time(Number(hh), Number(mm), Number(ss));

	return {
		total: time.total,
		displayTime: time.raw(),
		displayTotal: time.pretty(),
		elapsed: 0,
		status: TimerStatus.Running,
		createdAt: now,
		timestamp: now,
		id: createUUID(),
	};
};

// todo i dont like it
const isTimerStatusSettable =
	(status: TimerStatus) => (list: Timer[], id: ItemId) => {
		const item = list.find((item) => item.id === id);

		return (
			!!item && item.status !== TimerStatus.Completed && item.status !== status
		);
	};

const isTimerRunnable = isTimerStatusSettable(TimerStatus.Running);
const isTimerPausable = isTimerStatusSettable(TimerStatus.Paused);

sample({
	clock: timerAdded,
	source: $timers,
	fn: (list, formData) => [...list, createTimer(formData)],
	target: $timers,
});

sample({
	clock: timerStarted,
	source: $timers,
	filter: isTimerRunnable,
	fn: (list, id) =>
		updateListById(list, id, {
			timestamp: Date.now(),
			status: TimerStatus.Running,
		}),
	target: $timers,
});

sample({
	clock: timerPaused,
	source: $timers,
	filter: isTimerPausable,
	fn: (list, id) =>
		updateListById(list, id, {
			status: TimerStatus.Paused,
		}),
	target: $timers,
});

sample({
	clock: timerResumed,
	source: $timers,
	fn: (list, id) =>
		updateListById(list, id, {
			status: TimerStatus.Running,
			elapsed: 0,
			timestamp: Date.now(),
		}),
	target: $timers,
});

sample({
	clock: timerRemoved,
	source: $timers,
	fn: (list, id) => list.filter((item) => item.id !== id),
	target: $timers,
});

sample({
	clock: $runningTimersCount,
	source: tickerModel.$isRunning,
	filter: (isRunning, count) => !isRunning && count > 0,
	target: tickerModel.started,
});

sample({
	clock: $runningTimersCount,
	source: tickerModel.$isRunning,
	filter: (isRunning, count) => isRunning && count === 0,
	target: tickerModel.stopped,
});

sample({
	clock: tickerModel.tick,
	source: $timers,
	fn: (list, nowTimestamp) => {
		return list.map((timer) => {
			if (timer.status !== TimerStatus.Running) {
				return timer;
			}

			const timeElapsedMs =
				timer.elapsed + Math.floor(nowTimestamp - timer.timestamp);
			const timeToLiveMs = Math.max(0, timer.total - timeElapsedMs);

			const updatedItem = {
				...timer,
				displayTime: new Time(timeToLiveMs).raw(),
				timestamp: nowTimestamp,
				elapsed: timeElapsedMs,
			};

			if (timeToLiveMs > 0) {
				return updatedItem;
			}

			return {
				...updatedItem,
				elapsed: timer.total,
				status: TimerStatus.Completed,
			};
		});
	},
	target: $timers,
});

persist({
	store: $timers,
	key: StorageKey.TimersList,
});

/**
 * NORMALIZED DATA
 */

// const $timersMap = createStore<Map<ItemId, Timer>>(new Map());
// const $timersList = $timersMap.map((map) => map.values());
//
// sample({
//     clock: timerAdded,
//     source: $timersMap,
//     fn: (map, formData) => {
//         const timer = createTimer(formData);
//         map.set(timer.id, timer);
//
//         return map;
//     },
//     target: $timersMap,
// });

export const timersModel = {
	$list: $timers,
	removed: timerRemoved,
	resumed: timerResumed,
	added: timerAdded,
	started: timerStarted,
	paused: timerPaused,
};
