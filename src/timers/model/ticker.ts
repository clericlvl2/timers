import { Ticker } from "@shared";
import { createEffect, createEvent, createStore, sample } from "effector";
import { throttle } from "patronum";

const TICK_TIMEOUT = 50;

export const startTick = createEvent();
export const endTick = createEvent();
const tick = createEvent<number>();
const throttledTick = throttle({ source: tick, timeout: TICK_TIMEOUT });

const $isTickerRunning = createStore(false);

const ticker = new Ticker(tick);

export const startTickerFx = createEffect(() => ticker.start());
export const endTickerFx = createEffect(() => ticker.end());

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

export const tickerModel = {
	tick: throttledTick,
	isRunning: $isTickerRunning,
	start: startTick,
	end: endTick,
};
