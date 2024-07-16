import React from "react"
import { createRoot } from "react-dom/client"
import App from "~/components/App/App"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { theme } from "~/theme"
import { ErrorProvider } from "./errorContext"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: Infinity,
			onError: (error) => {
				console.log(error)
				if (error instanceof Error) {
					if (error.message.includes("401")) {
						alert("Unauthorized access. Please log in.")
					} else if (error.message.includes("403")) {
						alert(
							"Access denied. You do not have permission to view this resource."
						)
					}
				}
			},
		},
	},
})

if (import.meta.env.DEV) {
	const { worker } = await import("./mocks/browser")
	worker.start({ onUnhandledRequest: "bypass" })
}

const container = document.getElementById("app")
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ErrorProvider>
						<App />
					</ErrorProvider>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
