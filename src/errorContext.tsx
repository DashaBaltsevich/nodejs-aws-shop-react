import React, { createContext, useContext, ReactNode } from "react"

interface ErrorContextType {
	handleError: (error: Error) => void
	handleSuccess: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const useError = (): ErrorContextType => {
	const context = useContext(ErrorContext)
	if (!context) {
		throw new Error("useError must be used within an ErrorProvider")
	}
	return context
}

interface ErrorProviderProps {
	children: ReactNode
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
	const handleError = (error: Error) => {
		if (error.message.includes("401")) {
			alert("Unauthorized access. Please log in.")
		} else if (error.message.includes("403")) {
			alert("Access denied. You do not have permission to upload the file.")
		} else {
			alert(error.message)
		}
	}

	const handleSuccess = () => {
		alert("File uploaded successfully!")
	}

	return (
		<ErrorContext.Provider value={{ handleError, handleSuccess }}>
			{children}
		</ErrorContext.Provider>
	)
}
