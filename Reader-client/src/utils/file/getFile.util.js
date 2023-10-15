/**
 * This is a function that allows you to get the full path to a file received in the backend.
 * @param {string} filePath - This is the path stored in the database.
 * @returns {string} Returns the full path to retrieve the file from the backend.
 */
export const getFilePath = filePath =>
	import.meta.env.VITE_SERVER_URL + filePath
