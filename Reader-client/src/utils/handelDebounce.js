/**
 * It's a debounce function.
 * @param {ref.current} ref - This is a Ref reference to the element.
 * @param {function} func - This is the function on which we hinge debounce.
 */
export const handelDebounce = (ref, func) => {
	if (ref) {
		clearTimeout(ref)
	}

	ref = setTimeout(func, 500)
}
