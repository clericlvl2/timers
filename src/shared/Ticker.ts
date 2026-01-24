enum TickerState {
	Idle = "idle",
	Running = "running",
	Stopped = "stopped",
}

export class Ticker {
	private state: TickerState = TickerState.Idle;
	private tickerId: number | null = null;

	constructor(private _callback: () => void) {}

	start() {
		if (this.state === TickerState.Running) {
			return;
		}

		this.state = TickerState.Running;

		this._scheduler();
	}

	stop() {
		if (this.state === TickerState.Stopped) {
			return;
		}

		this.state = TickerState.Stopped;

		if (this.tickerId) {
			cancelAnimationFrame(this.tickerId);
			this.tickerId = null;
		}
	}

	private _scheduler() {
		if (this.state !== TickerState.Running) return;

		try {
			this.tickerId = requestAnimationFrame(() => {
				this._callback();
				this._scheduler();
			});
		} catch (error) {
			this.state = TickerState.Stopped;
			console.error("Ticker error:", error);
			throw error;
		}
	}
}
