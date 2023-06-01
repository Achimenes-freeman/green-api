import { AuthorizationForm } from './components/AuthorizationForm/AuthorizationForm'
import { ChatPage } from './components/ChatPage/ChatPage'
import { useSelector } from 'react-redux';
import { IDefaultState } from './redux/reduxStore';

import styles from "./app.module.scss"

function App() {

    const authorized = useSelector((state: IDefaultState) => state.authorized)

    return (
        <div className={styles.wrapper}>
            {!authorized && <AuthorizationForm />}
            {authorized && <ChatPage />}
        </div>
    )
    
    
    
}

export default App
