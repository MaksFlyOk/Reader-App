import { useContext } from 'react'

import { Context } from '../providers/Provider'

/**
 * This hook allows you to retrieve all global states.
 * @hook
 *
 * @returns {context} All global states.
 */
export const useContextStates = () => useContext(Context)
