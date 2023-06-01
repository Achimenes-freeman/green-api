import { useDispatch } from 'react-redux';
import styles from './styles.module.scss'

interface IChatProps {
    number: string;
}

export const Chat = ({number}: IChatProps) => {

    const dispatch = useDispatch()

    return (
        <div className={styles.Chat} onClick={()=> dispatch({type: "SET_CURRENT_CHAT", payload: number})}>
            <h3 className={styles.chatName}>{number}</h3>
        </div>
    )
}