import axios from "axios";
import download from "@/firebase/downloadFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
	const {yourArray} = await req.json();
	try {

		// const link = document.createElement("a");
		// link.style.display = "none";
		// document.body.appendChild(link);

		const blob = new Blob([yourArray], { type: "text/plain" });
		const objectURL = URL.createObjectURL(blob);

		// link.href = objectURL;
		// link.href = URL.createObjectURL(blob);
		// link.download = "data";
		// link.click();

		return NextResponse.json({
			objectURL,
		});

	} catch (error) {
		console.error("Error downloading file:", error);
		// res.json({});
        return NextResponse.json({
            error: "Error downloading file",
        });
	}
}
