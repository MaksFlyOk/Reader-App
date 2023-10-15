import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useGetBookLogById } from '../../../../hooks/book-log/useGetBookLogById'

import { onKeyDownHandler_Enter } from '../../../../utils/onKeyDownHandler_Enter'

import styles from './ChaptersOrText.module.scss'

import { $axios } from '../../../../api'
import { COLORS } from '../../../../app.constants'

/**
 * Chapters or text component. This component determines the number of chapters in the book and wraps the chapters or text of the book.
 * @component
 * @typedef PropType
 * @property {array<{id: number, name: string}>} chapters - This is the object in which all the chapters of the book are stored.
 * @property {number} bookLogId - This is the id of the specific user log and book.
 * @property {boolean} loading - This boolean value is responsible for displaying the component.
 *
 * @param {PropType} props
 * @returns JSX component ChaptersOrText.
 */
const ChaptersOrText = ({ chapters, bookLogId, loading }) => {
	const navigate = useNavigate()

	const queryClient = useQueryClient()

	const { data, isLoading } = useGetBookLogById(bookLogId)

	const {
		mutateAsync,
		isLoading: isLoadingMutate,
		error
	} = useMutation(
		['complete chapter'],
		/**
		 * This asynchronous mutation sends a request to the server using axios. This request completed the chapter, if the chapter is already completed, not completed.
		 * @param {number} chapterId
		 */
		async chapterId => {
			if (chapterId) {
				await $axios.patch(`/chapter/log/complete/${chapterId}`)
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['get book log by id', bookLogId])
			}
		}
	)

	return loading ? (
		<div className={styles.chaptersLoader}>
			<h1>Loader...</h1>
			<h2>Loader...</h2>
		</div>
	) : chapters?.length === 0 || error ? (
		<div className={styles.empty}>
			<h2>{`Looks like there's nothing here yet.`}</h2>
		</div>
	) : (
		<div className={styles.chaptersContainer}>
			<h1>Chapters</h1>
			<div>
				{chapters?.map((chapter, index, chapters) => (
					<div className={styles.chapter} key={chapter.id}>
						{isLoading || isLoadingMutate ? (
							<div className={styles.chapterLoader}>
								<h2>Loader...</h2>
							</div>
						) : (
							<>
								<h2
									onClick={() => navigate(`chapter/${chapter.id}`)}
									onKeyDown={event =>
										onKeyDownHandler_Enter(
											event,
											`chapter/${chapter.id}`,
											navigate
										)
									}
									tabIndex={0}
								>
									{chapters.length === 1 ? `Let's Read it.` : chapter?.name}
									<img
										src='/public/chapter-button/Chapter-arrow-dark.svg'
										alt='arrow'
									/>
								</h2>
								<button
									className={
										data?.chaptersLogs[index]?.isCompleted
											? styles.buttonComplete
											: styles.buttonNotComplete
									}
									onClick={() => {
										mutateAsync(data?.chaptersLogs[index]?.id)
									}}
								>
									{data?.chaptersLogs[index]?.isCompleted
										? 'not Completed'
										: 'Completed'}
									<svg
										style={
											data?.chaptersLogs[index]?.isCompleted
												? { transform: 'rotate(-90deg)' }
												: { transform: 'rotate(0deg)' }
										}
										xmlns='http://www.w3.org/2000/svg'
										width='21'
										height='21'
										viewBox='0 0 21 21'
										fill='none'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M0.27958 0.27958C0.652353 -0.0931933 1.25674 -0.0931933 1.62951 0.27958L19.0909 17.741V5.72727C19.0909 5.20009 19.5183 4.77273 20.0455 4.77273C20.5726 4.77273 21 5.20009 21 5.72727V20.0455C21 20.5726 20.5726 21 20.0455 21H5.72727C5.20009 21 4.77273 20.5726 4.77273 20.0455C4.77273 19.5183 5.20009 19.0909 5.72727 19.0909H17.741L0.27958 1.62951C-0.0931933 1.25674 -0.0931933 0.652353 0.27958 0.27958Z'
											fill={
												data?.chaptersLogs[index]?.isCompleted
													? COLORS.accent
													: COLORS.darkAccent
											}
										/>
									</svg>
								</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

ChaptersOrText.propTypes = {
	chapters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	),
	bookLogId: PropTypes.number,
	loading: PropTypes.bool
}

export default ChaptersOrText
