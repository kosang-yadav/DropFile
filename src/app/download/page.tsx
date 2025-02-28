"use client";

import download from "@/firebase/downloadFile";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Download() {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		if (!title) {
			toast.error("Please enter a title to fetch file.");
			return;
		}

		const loading = toast.loading("Fetching...");
		try {
			const response = await download(title);
			if (!response) {
				toast.dismiss(loading);
				toast.error("File not found...");
				return;
			}
			setUrl(response);
			setTitle("");
			toast.dismiss(loading);
			toast.success("File fetched successfully...");
			return;
		} catch (error) {
			console.error("Error fetching file:", error);
			setTitle("");
			toast.dismiss(loading);
			toast.error("failed to fetch the file...");
		}
	};

	// const handleDownload = async (event: { preventDefault: () => void }) => {
	// 	event.preventDefault();
	// 	const yourArray = await download(title);
	// 	console.log(yourArray);
	// 	const response = await axios.post("/api/no-cors-request",{yourArray});
	// 	console.log(response);
	// 	setUrl(response.data.objectURL);
	// };

	return (
		<section className="bg-white h-screen flex items-center justify-center">
			<div className="p-6 rounded-lg shadow mb-8 text-black">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Download a File to Transfer
				</h2>
				<form
					onSubmit={
						handleSubmit
						// handleDownload
					}
					className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto"
				>
					{!url && (
						<div className="mb-4 text-xl">
							Title : -
							<input
								type="text"
								placeholder="Enter title"
								value={title}
								className="border-2 w-full p-1 m-2"
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</div>
					)}

					{!url ? (
						<div className="flex items-center justify-center">
							<button
								type={!url ? "submit" : "button"}
								className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
							>
								Fetch File
							</button>
						</div>
					) : (
						<div className="flex items-center justify-center">
							<a
								href={url}
								target="_blank"
								// rel="noopener noreferrer"
								className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
								download
							>
								Get File
							</a>
						</div>
					)}
				</form>
			</div>
		</section>
	);
}
