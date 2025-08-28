// src/api/submissionsApi.js
import axiosClient from "./axiosClient";

export const listSubmissions = async (params = {}) => {
	const { data } = await axiosClient.get("/api/submissions", { params });
	return data;
};

export const upsertSubmission = async (payload) => {
	const { data } = await axiosClient.post("/api/submissions", payload);
	return data;
};
