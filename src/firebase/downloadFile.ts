import { error } from "console";
import app from "./sdk";
import { getStorage, ref, getDownloadURL, getBlob, getBytes } from "firebase/storage";
import axios from "axios";

const download = async (title : string) => {
	// Create a reference to the file we want to download
    // console.log(title);
	const storage = getStorage(app);
	// console.log(storage);
	const starsRef = ref(storage, title);
	// console.log(starsRef);

	// Get the download URL
	return await getDownloadURL(starsRef)
		.then((url) => {
            // console.log(url);  
			// const response = await axios.post("/api/no-cors-request", { url }); 
			return url;
		})
        .catch((error) => {
            console.log(error);
			return "";
        });

	// Get the blob
	// return await getBlob(starsRef).then((blob) => {
	// 	console.log(blob);
	// 	return URL.createObjectURL(blob);
	// })
	// .catch((error) => {
    //         console.log(error);
	// 		return "";
    //     });

	// return  await getBytes(starsRef).then((snapshot) => {
	// 	console.log("from firebase", snapshot);
	// 	return snapshot;	
	// })

	// returning a function that's itself returning a string, try removing top return and see in download/page.tsx
};

export default download;