export class Ticker {
	private tickerId: number | null = null;
	private cancelled = false;

	constructor(private effect: (timestamp: number) => void) {}

	start() {
		this.cancelled = false;
		this.ticker();
	}

	private ticker = () => {
		if (this.cancelled) return;

		this.effect(Date.now());
		this.tickerId = requestAnimationFrame(this.ticker);
	};

	end() {
		if (this.tickerId) cancelAnimationFrame(this.tickerId);

		this.tickerId = null;
		this.cancelled = true;
	}
}
