"use client";

import download from "@/firebase/downloadFile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Download() {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	let url2 = "";

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		if (!title) {
			toast.error("Please enter a title.");
			return;
		}

		const loading = toast.loading("Fetching...");

		try {
			// firebase URL
			// const response  = await axios.post("/api/no-cors-request", { title });
			const response = await download(title);
			setUrl(response);
			console.log(url)
			console.log(response, typeof response);
			url2 = response;

			// setUrl(response);

			console.log(url);
			console.log(url2)

			toast.dismiss(loading);
			toast.success("File fetched successfully.");
		} catch (error) {
			console.error("Error fetching file:", error);
			toast.dismiss(loading);
			toast.error("Error fetching file.");
		}
	};

	return (
		<section className="bg-white h-screen p-6 rounded-lg shadow mb-8 text-black">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Download a File to Transfer
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
						className="border-2 w-full p-1 m-2"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				{!url ? (
					<div className="flex items-center justify-center">
						<button
							type={!url ? "submit" : "button"}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
						>
							Fetch
						</button>
					</div>
				) : (
					<div className="flex items-center justify-center">
						{/* <a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
							download="baka"
						> */}
							{/* Get File */}
						{/* </a> */}
						{/* <button type="button" onClick={handleDownload}>
							Get File
						</button> */}
						<img src={url2} alt="baka" />
					</div>
				)}
			</form>	
			{/* {Array.isArray(files) && files?.length > 0 && (
				<div className="flex items-center justify-center">Baka...</div>
			)} */}
			<div className="flex items-center justify-center">
				{/* <a
					href="https://www.shutterstock.com/shutterstock/photos/1344894344/display_1500/stock-vector-north-arrow-simple-logo-1344894344.jpg"
					target="_blank"
					// rel="noopener noreferrer"
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
					download="baka"
				> */}
					{/* <img
						src="https://www.shutterstock.com/shutterstock/photos/1344894344/display_1500/stock-vector-north-arrow-simple-logo-1344894344.jpg"
						// height={"100px"}
						width={"400px"}
						alt="baka"
					/> */}
				{/* </a> */}
				{/* <button type="button" onClick={handleDownload}>
							Get File
						</button> */}
			</div>
		</section>
	);
}
