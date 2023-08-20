import AboutUs from '../components/screens/about-us/AboutUs'
import AdminPanel from '../components/screens/admin-panel/AdminPanel'
import Auth from '../components/screens/auth/Auth'
import Authors from '../components/screens/authors/Authors'
import Books from '../components/screens/books/Books'
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
