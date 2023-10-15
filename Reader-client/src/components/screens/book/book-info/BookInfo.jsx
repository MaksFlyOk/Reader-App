import PropTypes from 'prop-types'

import { setReadTime } from '../../../../utils/setReadTime.util'

import styles from './BookInfo.module.scss'

/**
 * It is a component with a table of categories, genre, date, number of pages and estimated time of reading.
 * @component
 * @typedef PropType
 * @property {array<{id: number, category: string}>} category - This is an array of categories for the book retrieved from the database.
 * @property {{id: number, genre: genre}} genre - This is the genre of the book obtained from the database.
 * @property {number} publishDate - This is the publication date of the book obtained from the database.
 * @property {number} pages - This is the number of pages in the book retrieved from the database.
 * @property {boolean} loading - This boolean value corresponds to the display of the component loader.
 *
 * @param {PropType} props
 * @returns JSX component BookInfo.
 */
const BookInfo = ({ category, genre, publishDate, pages, loading = false }) => {
	return (
		<table className={loading ? styles.info_loader : styles.info}>
			<thead>
				<tr>
					<td>Category</td>
					{loading ? null : (
						<td>
							{category?.map((category, index, categories) =>
								index < categories.length - 1
									? `${category?.category}, `
									: category?.category
							)}
						</td>
					)}
				</tr>
			</thead>
			<thead>
				<tr>
					<td>Genre</td>
					{loading ? null : <td>{genre?.genre}</td>}
				</tr>
			</thead>
			<thead>
				<tr>
					<td>Publish date</td>
					{loading ? null : <td>{publishDate}</td>}
				</tr>
			</thead>
			<thead>
				<tr>
					<td>Pages</td>
					{loading ? null : <td>{pages}</td>}
				</tr>
			</thead>
			<thead>
				<tr>
					<td>Read time</td>
					{loading ? null : <td>{setReadTime(pages)}</td>}
				</tr>
			</thead>
		</table>
	)
}

BookInfo.propTypes = {
	category: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			category: PropTypes.string
		})
	),
	genre: PropTypes.shape({
		id: PropTypes.number,
		genre: PropTypes.string
	}),
	publishDate: PropTypes.number,
	pages: PropTypes.number,
	loading: PropTypes.bool
}

export default BookInfo
