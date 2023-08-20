/**
 * This is a function that allows you to get the full path to a file received in the backend.
 * @param {String} imagePath - This is the path stored in the database.
 * @returns {String} Returns the full path to retrieve the file from the backend.
 */
export const getImage = imagePath => import.meta.env.VITE_SERVER_URL + imagePath
