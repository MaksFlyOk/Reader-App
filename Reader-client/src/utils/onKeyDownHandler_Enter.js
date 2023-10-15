/**
 * This function is needed to throw it in the onKeyDown event and handle the link transition for elements other than <button/>, <a/>, etc.
 * @param {event} event - This is the event received when listening to onKeyDown.
 * @param {string} link - This is the string/link to which the jump will be made.
 * @param {function} navigate - This is the useNavigate function.
 */
export const onKeyDownHandler_Enter = (event, link, navigate) => {
	if (event.key === 'Enter') {
		event.preventDefault()

		navigate(link)
	}
}
