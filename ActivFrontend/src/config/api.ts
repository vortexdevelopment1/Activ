const backendUrl = import.meta.env.VITE_API_URL || (
	import.meta.env.DEV
		? "http://localhost:5000"
		: "https://activ-backend-hsi3.onrender.com"
);

export const API = `${backendUrl.replace(/\/$/, "")}/api`;