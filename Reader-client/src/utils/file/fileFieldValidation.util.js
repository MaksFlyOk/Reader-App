/**
 * This function checks the validity of the data we take from the input[type="file"] field. The file must be a single file, not more than 5mb in size and in JPG format.
 * @param {string} type - This is the type of data to be checked for Drag&Drop, takes the values: drop - to check onDrop, input - to check classic input.
 * @param {string} inputName - This is the name of the field.
 * @param {event} e - Event from which we take data.
 * @param {function} setFileName - This is the function that sets the name in the input field, it's a function from React UseState.
 * @param {function} setError - This is the function that sets the error in the input field, it is a function from react-hook-form.
 * @returns {FileList} Returns the file.
 */
export const fileFieldValidation = (
	type,
	inputName,
	e,
	setFileName,
	setError
) => {
	let file

	if (type === 'drop') {
		file = e.dataTransfer.files
	} else {
		file = e.target.files
	}

	if (file.length === 0) {
		setFileName('')
		setError(inputName, {
			type: 'custom',
			message: 'You canceled the picture upload'
		})
		return
	}
	if (file.length > 1) {
		setFileName('')
		setError(inputName, {
			type: 'custom',
			message: 'Only one file can be uploaded'
		})
		return
	}
	if (file[0].size > 5_000_000) {
		setFileName('')
		setError(inputName, {
			type: 'custom',
			message: 'Maximum allowable file size is 5MB'
		})
		return
	}
	if (file[0].name.split('.')[1] !== 'jpg') {
		setFileName('')
		setError(inputName, {
			type: 'custom',
			message: 'Only files with JPG resolution are available'
		})
		return
	}

	setError(inputName, {
		type: 'custom',
		message: ''
	})

	setFileName(
		`${file[0].name} ${
			file[0].size > 1000000
				? (file[0].size / 1000 / 1000).toFixed(2) + 'MB'
				: (file[0].size / 1000).toFixed(2) + 'KB'
		}`
	)

	return file
}
