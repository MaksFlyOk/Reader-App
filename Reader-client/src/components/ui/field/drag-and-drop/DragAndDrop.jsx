import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { fileFieldValidation } from '../../../../utils/file/fileFieldValidation.util'

import styles from './DragAndDrop.module.scss'

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
 * @property {string} styleInput - This is the field style, the default is fileField is the standard field, fileFieldSmall is the field with reduced paddings.
 * @property {string} type - This is the type of the input[type='type'] field.
 * @property {object} rest - This is all other required data for which no variables have been set.
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
	styleInput = 'fileFieldSmall',
	...rest
}) => {
	const [drag, setDrag] = useState(false)
	const [fileName, setFileName] = useState('Select a file or drag and drop')

	const dragHandler = (e, boolean) => {
		e.preventDefault()
		setDrag(boolean)
	}

	useEffect(() => {
		if (!fieldState?.invalid) {
			setFileName('')
			setValue(null)
		}
	}, [fieldState])

	const onDropHandler = e => {
		e.preventDefault()
		setDrag(false)

		const file = fileFieldValidation('drop', name, e, setFileName, setError)

		setValue(name, file)
	}

	const onChangeFileField = e => {
		fileFieldValidation('input', name, e, setFileName, setError)
	}

	return (
		<>
			{drag ? (
				<div
					className={styles.dropZoneActive}
					onDragStart={e => dragHandler(e, true)}
					onDragLeave={e => dragHandler(e, false)}
					onDragOver={e => dragHandler(e, true)}
					onDrop={e => onDropHandler(e)}
				>
					Release to load
				</div>
			) : (
				<div
					className={styles.dropZonePassive}
					onDragStart={e => dragHandler(e, true)}
					onDragLeave={e => dragHandler(e, false)}
					onDragOver={e => dragHandler(e, true)}
				></div>
			)}
			<div className={styles.inputWrapper}>
				<div className={styles[styleInput]}>
					<input
						id='file'
						{...register(name, options)}
						{...rest}
						style={error ? { border: '2px solid #ff2e63' } : { border: 0 }}
						type='file'
						onChange={e => onChangeFileField(e)}
					/>
					<label
						htmlFor='file'
						style={
							fileName === 'Select a file or drag and drop' || fileName === ''
								? { color: '#00000033' }
								: { color: '#000000de' }
						}
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
	styleInput: PropTypes.oneOf(['fileField', 'fileFieldSmall'])
}

export default DragAndDrop
