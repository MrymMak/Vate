export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;

		if (path === "/") {
			return new Response("Vate Backend is Running!", {
				status: 200,
				headers: { "Content-Type": "text/plain" },
			});
		}

		const sessionId = path.split("/").pop();
		const backendUrl = `https://vate-proxy.vategpt.workers.dev/api/session/${sessionId}`;

		try {
			const response = await fetch(backendUrl, {
				headers: {
					"x-api-key": env.CLOUDFLARE_API_KEY,
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				return new Response(JSON.stringify({ error: "Failed to fetch session data" }), {
					status: response.status,
					headers: { "Content-Type": "application/json" }
				});
			}

			return new Response(response.body, {
				status: response.status,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

		} catch (error) {
			return new Response(JSON.stringify({ error: "Server Error", details: error.message }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
	}
};