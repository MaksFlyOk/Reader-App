import AboutUs from '../components/screens/about-us/AboutUs'
import AdminPanel from '../components/screens/admin-panel/AdminPanel'
import Auth from '../components/screens/auth/Auth'
import Author from '../components/screens/author/Author'
import Authors from '../components/screens/authors/Authors'
import Book from '../components/screens/book/Book'
import Books from '../components/screens/books/Books'
import Chapter from '../components/screens/chapter/Chapter'
import Home from '../components/screens/home/Home'
import ProfileEdit from '../components/screens/profile-edit/ProfileEdit'
import Profile from '../components/screens/profile/Profile'
import ReadLater from '../components/screens/read-later/ReadLater'
import Search from '../components/screens/search/Search'

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/authors',
		component: Authors,
		isAuth: false
	},
	{
		path: '/author/:id',
		component: Author,
		isAuth: false
	},
	{
		path: '/about-us',
		component: AboutUs,
		isAuth: false
	},
	{
		path: '/books',
		component: Books,
		isAuth: false
	},
	{
		path: '/book/:id',
		component: Book,
		isAuth: false
	},
	{
		path: 'book/:id/chapter/:id',
		component: Chapter,
		isAuth: false
	},
	{
		path: '/profile/read-later',
		component: ReadLater,
		isAuth: true
	},
	{
		path: '/search',
		component: Search,
		isAuth: false
	},
	{
		path: '/profile',
		component: Profile,
		isAuth: true
	},
	{
		path: '/profile/edit',
		component: ProfileEdit,
		isAuth: true
	},
	{
		path: '/admin-panel',
		component: AdminPanel,
		isAuth: true
	}
]
