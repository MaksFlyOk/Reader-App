/**
 * This function checks whether an object has at least one property.
 * @param {object} object - Inspected object.
 * @returns {boolean} Returns True if there are no properties in the object, otherwise False.
 */
export const isEmptyObject = object => {
	for (const prop in object) {
		if (Object.hasOwn(object, prop)) {
			return false
		}
	}

	return true
}
