import axios from "axios";
import download from "@/firebase/downloadFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
	const {title} : {title : string} = await req.json();
	try {
		// const response = await axios.get(url, { responseType: "stream" }); // Fetch the file as a stream

        // const newHeaders = new Headers(req.headers);
		// 		// Add a new header
		// newHeaders.set("Content-Type", "application/octet-stream");

		// newHeaders.set("Content-Disposition", 'attachment; filename="baka"'); // Set the file name
		
		// response.data.pipe(res); // Pipe the file stream to the response

        const url = await download(title);
        // res.json({ url });
        console.log("from api",url);

        const blob = new Blob([url], { type: "application/octet-stream" });
        const blobUrl = URL.createObjectURL(blob);

        return NextResponse.json({ url : blobUrl });

	} catch (error) {
		console.error("Error downloading file:", error);
		// res.json({});
        return NextResponse.json({
            error: "Error downloading file",
        });
	}
}
