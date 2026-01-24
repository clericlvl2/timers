import { Ticker } from "@shared";
import { createEffect, createEvent, createStore, sample } from "effector";
import { throttle } from "patronum";

const TICK_TIMEOUT_MS = 50;

const tick = createEvent<number>();
const throttledTick = throttle({ source: tick, timeout: TICK_TIMEOUT_MS });
const tickerStarted = createEvent();
const tickerStopped = createEvent();

const $isRunning = createStore(false);

const ticker = new Ticker(() => tick(Date.now()));

export const startTickerFx = createEffect(() => ticker.start());
export const endTickerFx = createEffect(() => ticker.stop());

sample({
	source: tickerStarted,
	fn: () => true,
	target: [startTickerFx, $isRunning],
});

sample({
	source: tickerStopped,
	fn: () => false,
	target: [endTickerFx, $isRunning],
});

export const tickerModel = {
	$isRunning,
	tick: throttledTick,
	started: tickerStarted,
	stopped: tickerStopped,
};
