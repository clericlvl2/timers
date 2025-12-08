import { App } from "@app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

export const getRootElement = (): HTMLElement => {
	const el = document.getElementById("root");

	if (!el) {
		throw new Error("Unable to locate root element");
	}

	return el;
};

const root = createRoot(getRootElement());

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
