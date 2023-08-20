import cn from 'clsx'
import styles from './Alert.module.scss'

const Alert = ({ children, type }) => {
	return <div className={cn(styles.alert, styles[type])}>{children}</div>
}

export default Alert
