// todo configs + magic numbers

export const getTotalTimeMs = (
	hh: number | null,
	mm: number | null,
	ss: number | null,
) => ((hh ?? 0) * 60 * 60 + (mm ?? 0) * 60 + (ss ?? 0)) * 1000;

export const getFromTotalTime = (timeMs: number) => {
	const timeS = Math.ceil(timeMs / 1000);

	return {
		hh: Math.floor(timeS / 3600),
		mm: Math.floor((timeS % 3600) / 60),
		ss: Math.floor((timeS % 3600) % 60),
	};
};
