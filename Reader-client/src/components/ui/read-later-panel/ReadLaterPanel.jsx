import styles from './ReadLaterPanel.module.scss'

const ReadLaterPanel = ({ data, size = 'normal' }) => {
	return (
		<ul className={styles.wrapper}>
			{data?.map(book => (
				<li key={book?.id}>
					<div>
						<span>{book?.name}</span>
						<span>{book?.author?.name}</span>
					</div>
					<span className={styles.readLaterButton}>
						<img
							src='/public/Header icon/Read later button.svg'
							alt='Read later icon'
						/>
					</span>
				</li>
			))}
		</ul>
	)
}

export default ReadLaterPanel
