
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	getConfig as apiGet,
	updateConfig as apiUpdate,
} from "./api/configApi";

const Ctx = createContext(null);
export const ALLOWED = ["aboutMe", "address", "birthdate"];

export function ConfigProvider({ children }) {
	const [config, setConfigLocal] = useState({
		page2Components: ["aboutMe"],
		page3Components: ["address"],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const data = await apiGet();
				setConfigLocal(data);
			} catch (e) {
				console.error("Failed to load config:", e);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const setConfig = async (next) => {
		const data = await apiUpdate(next);
		setConfigLocal(data);
	};

	const value = useMemo(
		() => ({ config, setConfig, loading, ALLOWED }),
		[config, loading]
	);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useConfig = () => {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error("useConfig must be used within ConfigProvider");
	return ctx;
};
