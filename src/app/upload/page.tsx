"use client";

import upload from "@/firebase/uploadFile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Upload() {
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState("");
	const [totalTime, setTotalTime] = useState("");
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		setTotalTime("");

		// console.log(file);

		if (!file) {
			toast.error("Please select a file to upload.");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("file", file);

		const loading = toast.loading("Uploading...");
		try {
			let time = new Date().getTime();

			// firebase upload function call
			const response = await upload(
				file,
				title
				// + Math.floor(Math.random() * 100)
			);
			formData.set("file", "");

			// console.log(response?.metadata);
			setTitle("");
			setUploading(false);
			time = new Date().getTime() - time;
			const finaltime = `${(Number(time) / 60000).toFixed(0)} minutes
				 ${((Number(time) / 1000) % 60).toFixed(0)} seconds 
				 `;
			console.log(finaltime);
			setTotalTime(finaltime);
			toast.dismiss(loading);
			toast.success("File uploaded successfully.");
			setFile(null);
		} catch (error) {
			setUploading(false);
			setTotalTime("");
			console.error("Error uploading file:", error);
			toast.dismiss(loading);
			toast.error("Error uploading file.");
		}
	};

	//16 MB - 37 secs / 2 mins 30 secs

	return (
		<section className="bg-white h-screen p-6 rounded-lg shadow mb-8 text-black">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Upload a File To Transfer
			</h2>
			<form
				onSubmit={handleSubmit}
				className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto"
			>
				<div className="mb-4 text-xl">
					Title : -
					<input
						type="text"
						placeholder="Enter title"
						value={title}
						className="border-2 w-full p-1 mb-2"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<br />
					<label
						htmlFor="file"
						className="block text-gray-700 font-medium mb-2"
					>
						Select a file:
					</label>
					<input
						type="file"
						id="file"
						name="file"
						onChange={(e) => {
							if (e.target.files && e.target?.files?.length > 0) {
								setFile(e.target?.files?.[0]);
							}
						}}
						accept=".pdf,.jpg,.jpeg,.png,.mp3,.mp4"
						className="block w-full text-gray-700 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				{!uploading ? (
					totalTime ? (
						<div className="text-center text-xl my-4">
							{" "}
							Uploading Time : {totalTime}
						</div>
					) : (
						<div></div>
					)
				) : (
					<div className="text-center text-xl my-4 baka">Uploading...</div>
				)}
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
				>
					Upload
				</button>
			</form>
		</section>
	);
}
