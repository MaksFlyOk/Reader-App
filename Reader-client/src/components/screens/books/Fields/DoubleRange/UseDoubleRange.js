import { useEffect, useMemo, useRef, useState } from 'react'

export const UseDoubleRange = (min, max, value, onChange, step, reset) => {
	/**
	 * @description This is a reference to the input field (<input type="number"/> of the min date.
	 */
	const inputNumberMin = useRef()
	/**
	 * @description This is a reference to the input field (<input type="number"/> of the max date.
	 */
	const inputNumberMax = useRef()
	/**
	 * @description This ref is for time tracking in the Debounce function.
	 */
	const timerDebounceRef = useRef()

	/**
	 * @description This state determines the value of the input fields for the min date.
	 */
	const [minValue, setMinValue] = useState(
		/** @type {number} */ (value ? value.min : min)
	)
	/**
	 * @description This state determines the value of the input fields for the max date.
	 */
	const [maxValue, setMaxValue] = useState(
		/** @type {number} */ (value ? value.max : max)
	)

	const minPos = ((minValue - min) / (max - min)) * 100
	const maxPos = ((maxValue - min) / (max - min)) * 100

	const handleMinChange = event => {
		event.preventDefault()

		const newMinVal =
			Math.min(+event.target.value, maxValue - step) < min
				? min
				: Math.min(+event.target.value, maxValue - step)

		if (!value) {
			setMinValue(newMinVal)
			inputNumberMin.current.value = newMinVal
		}

		inputNumberMin.current.blur()

		if (event.target !== inputNumberMin.current || event.type === 'blur') {
			inputNumberMin.current.value = newMinVal
			if (timerDebounceRef.current) {
				clearTimeout(timerDebounceRef.current)
			}

			timerDebounceRef.current = setTimeout(
				() => onChange({ min: newMinVal, max: maxValue }),
				500
			)
		}
	}

	const handleMaxChange = event => {
		event.preventDefault()

		const newMaxVal =
			Math.max(+event.target.value, minValue + step) > max
				? max
				: Math.max(+event.target.value, minValue + step)

		if (!value) {
			setMaxValue(newMaxVal)
			inputNumberMax.current.value = newMaxVal
		}

		inputNumberMax.current.blur()

		if (event.target !== inputNumberMax.current || event.type === 'blur') {
			inputNumberMax.current.value = newMaxVal

			if (timerDebounceRef.current) {
				clearTimeout(timerDebounceRef.current)
			}

			timerDebounceRef.current = setTimeout(
				() => onChange({ min: minValue, max: newMaxVal }),
				500
			)
		}
	}

	useEffect(() => {
		if (value) {
			setMinValue(value.min)
			setMaxValue(value.max)

			if (document.activeElement !== inputNumberMin.current)
				inputNumberMin.current.value = value.min

			if (document.activeElement !== inputNumberMax.current)
				inputNumberMax.current.value = value.max
		}
	}, [value, reset])

	return useMemo(
		() => ({
			inputNumberMin,
			handleMinChange,
			inputNumberMax,
			handleMaxChange,
			minValue,
			maxValue,
			minPos,
			maxPos
		}),
		[value, onChange, reset, minValue, maxValue]
	)
}
