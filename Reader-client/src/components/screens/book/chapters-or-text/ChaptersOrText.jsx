import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useBookLogById } from '../../../../hooks/book-log/useBookLogById'

import Loader from '../../../ui/loader/Loader'

import styles from './ChaptersOrText.module.scss'

import { $axios } from '../../../../api'

/**
 * Chapters or text component. This component determines the number of chapters in the book and wraps the chapters or text of the book.
 * @component
 * @typedef PropType
 * @property {text} chapters - This is the object in which all the chapters of the book are stored.
 * @property {number} bookLogId - This is the id of the specific user log and book.
 *
 * @param {PropType} props
 * @returns JSX component ChaptersOrText.
 */
const ChaptersOrText = ({ chapters, bookLogId }) => {
	const navigate = useNavigate()

	const queryClient = useQueryClient()

	const { data, isLoading } = useBookLogById(bookLogId)

	const {
		mutateAsync,
		isLoading: isLoadingMutate,
		error
	} = useMutation(
		['complete chapter'],
		async chapterId => {
			if (chapterId) {
				await $axios.patch(`/chapter/log/complete/${chapterId}`)
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['get book log by id', bookLogId])
			},
			onError: () => {
				console.log(error)
			}
		}
	)

	return chapters?.length < 2 ? (
		<div className={styles.text}>
			<div>
				{isLoading || isLoadingMutate ? (
					<Loader height='4vw' />
				) : (
					<>
						<h1 onClick={() => navigate(`chapter/${chapters[0].id}`)}>
							{`Let's Read it.`}
							<img
								src='/public/chapter-button/Chapter-arrow-dark.svg'
								alt='arrow'
							/>
						</h1>
						<span
							onClick={() => {
								mutateAsync(data?.chaptersLogs[0]?.id)
							}}
							className={
								data?.chaptersLogs[0]?.isCompleted
									? styles.buttonComplete
									: styles.buttonNotComplete
							}
						>
							{data?.chaptersLogs[0]?.isCompleted
								? 'Completed'
								: 'not Completed'}
							<svg
								style={
									data?.chaptersLogs[0]?.isCompleted
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
										data?.chaptersLogs[0]?.isCompleted ? '#CDB4DB' : '#2A2C2E'
									}
								/>
							</svg>
						</span>
					</>
				)}
			</div>
		</div>
	) : (
		<div className={styles.chapters}>
			<h1>Chapters</h1>
			<div>
				{chapters?.map((chapter, index) => (
					<div key={chapter.id}>
						{isLoading || isLoadingMutate ? (
							<Loader height='4vw' />
						) : (
							<>
								<h1 onClick={() => navigate(`chapter/${chapter.id}`)}>
									{chapter?.name}
									<img
										src='/public/chapter-button/Chapter-arrow-dark.svg'
										alt='arrow'
									/>
								</h1>
								<span
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
													? '#CDB4DB'
													: '#2A2C2E'
											}
										/>
									</svg>
								</span>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

ChaptersOrText.propTypes = {
	chapters: PropTypes.arrayOf(PropTypes.object),
	bookLogId: PropTypes.number
}

export default ChaptersOrText
