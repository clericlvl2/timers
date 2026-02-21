const TIME_UNITS = {
	SEC_PER_HOUR: 3600,
	SEC_PER_MIN: 60,
	MS_PER_SECOND: 1000,
};

export class Time {
	hours: number;
	minutes: number;
	seconds: number;
	total: number;

	constructor(hours: number, minutes: number, seconds: number);
	constructor(totalMs: number);
	constructor(totalMsOrHours: number, minutes?: number, seconds?: number) {
		if (minutes !== undefined && seconds !== undefined) {
			const hours = totalMsOrHours;
			this.hours = hours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.total = this.calculateDurationFromTime(hours, minutes, seconds);
		} else {
			const totalMs = totalMsOrHours;
			const { hh, mm, ss } = this.calculateTimeFromDuration(totalMs);
			this.hours = hh;
			this.minutes = mm;
			this.seconds = ss;
			this.total = totalMs;
		}
	}

	/** подсчитать время: 5000000ms => { hh: 1, mm: 23, ss: 20 } */
	private calculateTimeFromDuration(ms: number) {
		const s = Math.ceil(ms / TIME_UNITS.MS_PER_SECOND);

		return {
			hh: Math.floor(s / TIME_UNITS.SEC_PER_HOUR),
			mm: Math.floor((s % TIME_UNITS.SEC_PER_HOUR) / TIME_UNITS.SEC_PER_MIN),
			ss: Math.floor(s % TIME_UNITS.SEC_PER_MIN),
		};
	}

	/** подсчитать длительность: 2m 2s => 122000ms */
	private calculateDurationFromTime(hh: number, mm: number, ss: number) {
		return (
			(hh * TIME_UNITS.SEC_PER_HOUR + mm * TIME_UNITS.SEC_PER_MIN + ss) *
			TIME_UNITS.MS_PER_SECOND
		);
	}

	/** hh:mm:ss формат 01:32:10 */
	raw() {
		return [this.hours, this.minutes, this.seconds]
			.map((v) => v.toString().padStart(2, "0"))
			.join(":");
	}

	/** hms формат: 1h 32m 10s */
	pretty() {
		const parts = [
			this.hours > 0 && `${this.hours}h`,
			this.minutes > 0 && `${this.minutes}m`,
			this.seconds > 0 && `${this.seconds}s`,
		].filter(Boolean);

		return parts.length ? parts.join(" ") : "0s";
	}
}
