import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Wizard from "./pages/Wizard";
import Admin from "./pages/Admin";
import DataTable from "./pages/DataTable";
import { ConfigProvider } from "./ConfigContext";
import "./index.css";

function Nav() {
	const linkBase = "px-3 py-1.5 rounded-md text-sm";
	return (
		<nav className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 p-3 sm:p-4">
				{/* Removed Zealthy Demo from here */}
				<NavLink
					to="/"
					end
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Onboarding
				</NavLink>
				<NavLink
					to="/admin"
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Admin
				</NavLink>
				<NavLink
					to="/data"
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Data
				</NavLink>
			</div>
		</nav>
	);
}

function App() {
	return (
		<div id="puneeth" className="min-h-screen bg-gray-50 text-gray-900">
			{/* Heading moved outside Nav */}
			<header className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
				<h1 className="text-2xl font-bold text-blue-700">Zealthy Demo</h1>
			</header>

			<Nav />

			<Routes>
				<Route path="/" element={<Wizard />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/data" element={<DataTable />} />
			</Routes>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</BrowserRouter>
);
