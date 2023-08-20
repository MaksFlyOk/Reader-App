import { useEffect, useState } from 'react'
import { fileFieldValidation } from '../../../../utils/fileFieldValidation.util'
import styles from './DragAndDrop.module.scss'

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

export default DragAndDrop
