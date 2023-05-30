import { useState } from 'react'
import { checkProfileIsAuthorize } from '../../helpers/APIinteraction'

import styles from './styles.module.scss'

export const AuthorizationForm = () => {
    const [instance, setInstance] = useState('awd')
    const [token, setToken] = useState('')

    return (
        <>
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
                />
            </div>
            <button
                className={styles.btn}
                type="submit"
                onClick={async (e) => {
                    e.preventDefault()
                    console.log(await checkProfileIsAuthorize(instance, token))
                }}
            >
                LogIn
            </button>
        </>
    )
}
