import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import axios from "axios"
import { useMutation } from "react-query"
import { useError } from "~/errorContext"

type CSVFileImportProps = {
	url: string
	title: string
}

const uploadFile = async (file: File, url: string): Promise<Response> => {
	console.log("uploadFile to", url)

	const headers = {
		"Content-Type": "text/csv",
		Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
	}

	console.log("headers", headers)

	// Get the presigned URL
	const response = await axios({
		method: "GET",
		url,
		headers,
		params: {
			name: encodeURIComponent(file.name),
		},
	})
	console.log(response)
	console.log("File to upload: ", file.name)
	console.log("Uploading to: ", response.data)
	const result = await fetch(response.data, {
		method: "PUT",
		body: file,
	})

	if (!result.ok) {
		throw new Error(`Error: ${result.status}`)
	}

	console.log("Result: ", result)
	return result
}

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
	const [file, setFile] = React.useState<File>()
	const { handleError, handleSuccess } = useError()

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			const file = files[0]
			setFile(file)
		}
	}

	const removeFile = () => {
		setFile(undefined)
	}

	const mutation = useMutation<Response, Error, File>((file) => uploadFile(file, url), {
		onError: handleError,
		onSuccess: () => {
			handleSuccess()
			setFile(undefined)
		},
	})

	const handleUpload = () => {
		if (file) {
			mutation.mutate(file)
		}
	}

	return (
		<Box>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			{!file ? (
				<input type="file" onChange={onFileChange} />
			) : (
				<div>
					<button onClick={removeFile}>Remove file</button>
					<button onClick={handleUpload}>Upload file</button>
				</div>
			)}
		</Box>
	)
}
