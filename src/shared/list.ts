import type { WithId } from "./types";

export const updateListById = <Item extends WithId>(
	list: Item[],
	id: Item["id"],
	payload: Partial<Item>,
): Item[] => {
	const itemIndex = list.findIndex((item) => item.id === id);

	if (itemIndex === -1) {
		return list;
	}

	const copied = list.slice();
	const item = copied[itemIndex];

	if (!item) {
		return list;
	}

	copied[itemIndex] = {
		...item,
		...payload,
	};

	return copied;
};
