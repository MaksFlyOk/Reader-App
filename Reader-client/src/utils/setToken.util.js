import Cookies from 'js-cookie'
import { TOKEN } from '../app.constants'

/**
 * This function checks for the presence of the token in the data that came from the backend during registration or authorization. If they are present, it sets the token in Cookies.
 * @param {object} data - Data from the backend during registration or authorization.
 */
export const setToken = data => {
	if (data.token) Cookies.set(TOKEN, data.token)
}
