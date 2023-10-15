import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useContextStates } from '../../../hooks/useContextStates'

import Layout from '../../layout/layout'

const AdminPanel = () => {
	const { isAdmin } = useContextStates()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAdmin) {
			navigate('/profile')
		}
	})

	return (
		<Layout>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<h1 style={{ color: 'black' }}>Admin panel - Coming soon</h1>
			</div>
		</Layout>
	)
}

export default AdminPanel
