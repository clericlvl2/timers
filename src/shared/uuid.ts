// todo replace

export const createIdGenerator = () => {
	let counter = 0;
	return () => ++counter;
};
