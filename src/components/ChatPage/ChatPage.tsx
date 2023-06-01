import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { ChatMessageInput } from '../ChatMessageInput/ChatMessageInput';
import { Chat } from '../Chat/Chat';
import { checkNumberIsCorrect, receiveNotification, setSettings, deleteNotification} from '../../helpers/APIinteraction';
import { IDefaultState } from '../../redux/reduxStore';
import styles from './styles.module.scss';

export const ChatPage = () => {

    const dispatch = useDispatch()
    const [newNumber, setNewNumber] = useState('')

    const {currInstance: instance, currToken: token, currChat, chats} = useSelector((state: IDefaultState) => state)

    const chechNotification = async () => {
        const {receiptId, body} = await receiveNotification(instance, token)

        if (receiptId) {
            if (body.typeWebhook !== 'incomingMessageReceived'){
                deleteNotification(instance, token, receiptId)
            } else {
                if (body.messageData) {
                        dispatch({type: "RECEIVE_MESSAGE", payload: body.messageData?.textMessageData?.textMessage, key: body.senderData?.chatId?.split('@')[0]})
                        deleteNotification(instance, token, receiptId)
                    } else {
                        deleteNotification(instance, token, receiptId)
                    }
            }
        }
    }

    useEffect(()=>{
        setSettings(instance, token)
        setInterval(chechNotification, 5000)
    },[])

    return (
        <div className={styles.ChatPage}>
            <aside className={styles.chatList}>
                <header className={styles.chatListHeader}>
                    <h2 className={styles.profileId}>id: {instance}</h2>
                    <button className={styles.logOutBtn}>LogOut</button>
                </header>

                <div className={styles.chatListBox}>
                    <div className={styles.newChatBox}>
                        <input className={styles.numberInput} 
                                type="text" 
                                placeholder='Enter phone number' 
                                value={newNumber} 
                                onChange={(e) => 
                                    setNewNumber(e.currentTarget.value)
                                } 
                                pattern='(\+\d+)|\d+'
                        />
                        <button className={styles.addNewChatBtn} 
                                onClick={async ()=> {
                                        if (await checkNumberIsCorrect(instance, token, newNumber)) {
                                            dispatch({type: "SET_CURRENT_CHAT", payload: newNumber}) 
                                            dispatch({type: "ADD_NEW_CHAT", payload: newNumber})
                                        }
                                        setNewNumber('');
                                    }
                                }>
                                    New Chat +</button>
                    </div>

                    { Object.keys(chats).map((chat, index) => <Chat key={index} number={chat}/> )}
                </div>
            </aside>
            <div className={styles.chatSceleton}>
                {currChat && <main className={styles.chatSection}>
                    <header className={styles.chatHeader}>
                        <h2>{currChat}</h2>
                    </header>
                    <div className={styles.chatView}>
                        <div className={styles.chatViewMask}></div>
                        <div className={styles.box}>
                        {chats[currChat].map(({textMessage, owner}, index) => <ChatMessage key={index} textMessage={textMessage} messageOwner={owner}/> )}
                        
                        </div>

                        
                    </div>
                    <ChatMessageInput />
                </main>}
            </div>
            

        </div>
    )
}