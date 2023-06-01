import { useState } from 'react'
import { checkProfileIsAuthorize } from '../../helpers/APIinteraction'
import { useDispatch} from 'react-redux/es/exports'

import styles from './styles.module.scss'

export const AuthorizationForm = () => {
    const [instance, setInstance] = useState(localStorage.getItem('instance') || '')
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const dispatch = useDispatch()

    return (
        <div className={styles.AuthorizationForm}>
            <div className={styles.inputBox}>
                <label className={styles.label} htmlFor="instance-input">
                    Enter token
                </label>
                <input
                    className={styles.input}
                    type="text"
                    name="instance"
                    id="instance-input"
                    pattern="\w+"
                    onChange={(e) => setInstance(e.currentTarget.value)}
                    value={instance}
                />
            </div>

            <div className={styles.inputBox}>
                <label className={styles.label} htmlFor="token-input">
                    Enter instance
                </label>
                <input
                    className={styles.input}
                    type="text"
                    name="token"
                    id="token-input"
                    pattern="\w+"
                    onChange={(e) => setToken(e.currentTarget.value)}
                    value={token}
                />
            </div>
            <button
                className={styles.btn}
                type="button"
                onClick={async (e) => {
                    e.preventDefault()
                    const authorizationResult = await checkProfileIsAuthorize(instance, token)
                    if (authorizationResult === 'authorized') {
                        dispatch({type: "CHANGE_AOUTHORIZATION", payload: authorizationResult})
                        dispatch({type: "SET_INSTANCE", payload: instance});
                        dispatch({type: "SET_TOKEN", payload: token});

                        localStorage.setItem('instance', instance)
                        localStorage.setItem('token', token)
                    }
                }}
            >
                LogIn
            </button>
        </div>
    )
}
