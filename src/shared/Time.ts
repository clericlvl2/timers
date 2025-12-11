export const TIME_UNITS = {
	SEC_PER_HOUR: 3600,
	MIN_PER_HOUR: 60,
	SEC_PER_MIN: 60,
	MS_PER_SECOND: 1000,
};

export class Time {
	hours: number;
	minutes: number;
	seconds: number;
	total: number;

	constructor(hours: number, minutes: number, seconds: number);
	constructor(ms: number);
	constructor(msOrHours: number, minutes?: number, seconds?: number) {
		if (minutes !== undefined && seconds !== undefined) {
			this.hours = msOrHours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.total = this.getTotalTimeMs(msOrHours, minutes, seconds);
		} else {
			const { hh, mm, ss } = this.getFromTotalTime(msOrHours);
			this.hours = hh;
			this.minutes = mm;
			this.seconds = ss;
			this.total = msOrHours;
		}
	}

	private getFromTotalTime(ms: number) {
		const s = Math.ceil(ms / TIME_UNITS.MS_PER_SECOND);

		return {
			hh: Math.floor(s / TIME_UNITS.SEC_PER_HOUR),
			mm: Math.floor((s % TIME_UNITS.SEC_PER_HOUR) / TIME_UNITS.SEC_PER_MIN),
			ss: Math.floor(s % TIME_UNITS.SEC_PER_MIN),
		};
	}

	private getTotalTimeMs(hours: number, minutes: number, seconds: number) {
		return (
			((hours ?? 0) * TIME_UNITS.SEC_PER_HOUR +
				(minutes ?? 0) * TIME_UNITS.MIN_PER_HOUR +
				(seconds ?? 0)) *
			TIME_UNITS.MS_PER_SECOND
		);
	}

	private format(value: number | null) {
		return (value ?? 0).toString().padStart(2, "0");
	}

	/** строгий формат 01:32:10 */
	raw() {
		return `${this.format(this.hours)}:${this.format(this.minutes)}:${this.format(this.seconds)}`;
	}

	/** компактный формат:
	 * 1h 32m 10s
	 * 25m 1s
	 * 42s
	 */
	pretty() {
		const parts = [
			this.hours > 0 && `${this.hours}h`,
			this.minutes > 0 && `${this.minutes}m`,
			this.seconds > 0 && `${this.seconds}s`,
		].filter(Boolean);

		return parts.length ? parts.join(" ") : "0s";
	}
}
