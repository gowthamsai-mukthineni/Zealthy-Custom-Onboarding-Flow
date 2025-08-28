// src/api/configApi.js
import axiosClient from "./axiosClient";

export const getConfig = async () => {
	const { data } = await axiosClient.get("/api/config");
	return data;
};

export const updateConfig = async (payload) => {
	const { data } = await axiosClient.put("/api/config", payload);
	return data;
};
