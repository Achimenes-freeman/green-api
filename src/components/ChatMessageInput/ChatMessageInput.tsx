import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { sendMessage } from '../../helpers/APIinteraction'
import { IDefaultState } from '../../redux/reduxStore';
import styles from './styles.module.scss'

export const ChatMessageInput = () => {

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const {currChat, currInstance, currToken} = useSelector((state: IDefaultState)=> state)

    return (
        <div className={styles.entryField}>
            <input className={styles.chatTextInput} type="text" onChange={({currentTarget})=>{setMessage(currentTarget.value)}} value={message}/>
            <button className={styles.sendMessageButton} type='button' onClick={async ()=>{
                if (await sendMessage(currInstance, currToken, currChat, message)) {
                    dispatch({type: "ADD_MESSAGE_TO_CHAT", payload: message, key: currChat})
                }
                setMessage('')
            }}>send</button>
        </div>
    )
}