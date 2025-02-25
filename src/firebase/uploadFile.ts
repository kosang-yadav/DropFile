import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./sdk";

const upload = async (file : File) => {
	// console.log(file);
	// console.log(app);
	// console.log("uploading function calls");
	const storage = getStorage(app);
	// console.log( "storage : ",storage);
	const storageRef = ref(storage, "baka");
	// console.log( "storageRef : ",storageRef);

	// 'file' comes from the Blob or File API
	const result = await uploadBytes(storageRef, file).then((snapshot) => {
		console.log("Uploaded a blob or file!");
		// console.log(snapshot);
		return snapshot;
	});

    console.log(result);

    return result;

};
export default upload;
