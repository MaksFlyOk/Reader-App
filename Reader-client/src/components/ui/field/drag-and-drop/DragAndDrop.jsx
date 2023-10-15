import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { fileFieldValidation } from '../../../../utils/file/fileFieldValidation.util'

import styles from './DragAndDrop.module.scss'

import { COLORS } from '../../../../app.constants'

/**
 * Drag&Drop component. These are "file" type fields, with Drag&Drop functionality.
 * @component
 * @typedef PropType
 * @property {function} register - This is a field registration function, it is swiped from react-hook-from.
 * @property {string} name - This is the name of the field.
 * @property {string} error - This is a validation error, thrown from react-hook-form.
 * @property {object} options - These are validation and option settings, swiped according to the react-hook-form documentation.
 * @property {function} setValue - This is a feature pulled from react-hook-form. It sets a specific field value.
 * @property {function} setError - This is a feature pulled from react-hook-form. It sets a specific field error.
 * @property {object} fieldState - This is an object swiped from react-hook-form. It stores field state data.
 * @property {boolean} loading - Disables input if the parent component is loading data.
 * @property {any} rest - This is all other required data for which no variables have been set.
 *
 * @param {PropType} props
 * @returns JSX component Drag&Drop.
 */
const DragAndDrop = ({
	register,
	name,
	error,
	options,
	setValue,
	setError,
	fieldState,
	loading,
	...rest
}) => {
	const [drag, setDrag] = useState(false)
	const [fileName, setFileName] = useState('Select a file or drag and drop')

	const dragHandler = (event, boolean) => {
		event.preventDefault()
		setDrag(boolean)
	}

	useEffect(() => {
		if (!fieldState?.invalid) {
			setFileName('')
			setValue(null)
		}
	}, [fieldState])

	const onDropHandler = event => {
		event.preventDefault()
		setDrag(false)

		const file = fileFieldValidation('drop', name, event, setFileName, setError)

		setValue(name, file)
	}

	const onChangeFileField = event => {
		fileFieldValidation('input', name, event, setFileName, setError)
	}

	return (
		<>
			{drag ? (
				<div
					className={styles.dropZoneActive}
					onDragStart={event => dragHandler(event, true)}
					onDragLeave={event => dragHandler(event, false)}
					onDragOver={event => dragHandler(event, true)}
					onDrop={event => onDropHandler(event)}
				>
					Release to load
				</div>
			) : (
				<div
					className={styles.dropZonePassive}
					onDragStart={event => dragHandler(event, true)}
					onDragLeave={event => dragHandler(event, false)}
					onDragOver={event => dragHandler(event, true)}
				></div>
			)}
			<div className={styles.inputWrapper}>
				<div className={loading ? styles.fileFieldLoader : styles.fileField}>
					<input
						disabled={loading}
						id='file'
						{...register(name, options)}
						{...rest}
						type='file'
						onChange={event => onChangeFileField(event)}
					/>
					<label
						htmlFor='file'
						style={{
							color: loading
								? 'transparent'
								: fileName === 'Select a file or drag and drop' ||
									fileName === ''
								? COLORS.darkIcons
								: COLORS.black,
							border: error ? `2px solid ${COLORS.danger}` : 0
						}}
					>
						{fileName === 'Select a file or drag and drop' || fileName === ''
							? 'Select a file or drag and drop'
							: fileName}
					</label>
					{error && <div className={styles.error}>{error}</div>}
				</div>
			</div>
		</>
	)
}

DragAndDrop.propTypes = {
	register: PropTypes.func,
	name: PropTypes.string,
	error: PropTypes.string,
	options: PropTypes.object,
	setValue: PropTypes.func,
	setError: PropTypes.func,
	fieldState: PropTypes.object,
	loading: PropTypes.bool,
	rest: PropTypes.any
}

export default DragAndDrop
