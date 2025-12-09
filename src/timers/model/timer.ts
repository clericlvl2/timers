import {
	createIdGenerator,
	getFromTotalTime,
	getTotalTimeMs,
	Ticker,
	updateListById,
} from "@shared";
import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample,
} from "effector";

export interface TimerForm {
	hh: string;
	mm: string;
	ss: string;
}

enum TimerStatus {
	Running = "running",
	Paused = "paused",
	Completed = "completed",
}

type ItemId = number;

// todo timeleft [hh,mm,ss]

export interface Timer {
	id: ItemId;
	status: TimerStatus;
	createdAt: number;
	timestamp: number;
	elapsed: number;
	hh: number;
	mm: number;
	ss: number;
	total: number;
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

const generateId = createIdGenerator();

sample({
	clock: timerAdded,
	source: $timers,
	fn: (list, item) => {
		const hh = Number(item.hh);
		const mm = Number(item.mm);
		const ss = Number(item.ss);
		const total = getTotalTimeMs(hh, mm, ss);
		const now = Date.now();
		const mapped = {
			hh,
			mm,
			ss,
			total,
			elapsed: 0,
			status: TimerStatus.Running,
			createdAt: now,
			timestamp: now,
			id: generateId(),
		};

		return [...list, mapped];
	},
	target: $timers,
});

const isStatusSettable =
	(status: TimerStatus) => (list: Timer[], id: ItemId) => {
		const item = list.find((item) => item.id === id);

		return (
			!!item && item.status !== TimerStatus.Completed && item.status !== status
		);
	};

sample({
	clock: timerStarted,
	source: $timers,
	filter: isStatusSettable(TimerStatus.Running),
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
	filter: isStatusSettable(TimerStatus.Paused),
	fn: (list, id) =>
		updateListById(list, id, {
			status: TimerStatus.Paused,
		}),
	target: $timers,
});

sample({
	clock: timerRemoved,
	source: $timers,
	fn: (list, id) => list.filter((item) => item.id !== id),
	target: $timers,
});

const tick = createEvent<number>();
const startTick = createEvent();
const endTick = createEvent();
const $isTickerRunning = createStore(false);

const ticker = new Ticker(tick);

const startTickerFx = createEffect(() => ticker.start());
const endTickerFx = createEffect(() => ticker.end());

sample({
	source: startTick,
	fn: () => true,
	target: [startTickerFx, $isTickerRunning],
});

sample({
	source: endTick,
	fn: () => false,
	target: [endTickerFx, $isTickerRunning],
});

sample({
	clock: $runningTimersCount,
	source: $isTickerRunning,
	filter: (isRunning, count) => !isRunning && count > 0,
	target: startTick,
});

sample({
	clock: $runningTimersCount,
	source: $isTickerRunning,
	filter: (isRunning, count) => isRunning && count === 0,
	target: endTick,
});

sample({
	clock: tick,
	source: $timers,
	fn: (list, nowTimestamp) => {
		return list.map((item) => {
			if (item.status !== TimerStatus.Running) {
				return item;
			}

			const timeElapsedMs =
				item.elapsed + Math.floor(nowTimestamp - item.timestamp);
			const timeToLiveMs = Math.max(0, item.total - timeElapsedMs);
			const timeToDisplay = getFromTotalTime(timeToLiveMs);

			const updatedItem = {
				...item,
				...timeToDisplay,
				timestamp: nowTimestamp,
				elapsed: timeElapsedMs,
			};

			if (timeToLiveMs > 0) {
				return updatedItem;
			}

			return {
				...updatedItem,
				elapsed: item.total,
				status: TimerStatus.Completed,
			};
		});
	},
	target: $timers,
});

export const timerModel = {
	$timers,
	timerRemoved,
	timerAdded,
	timerStarted,
	timerPaused,
};
