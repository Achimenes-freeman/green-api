import cn from 'classnames'
import { IChatMessageProps } from './types'
import styles from './styles.module.scss'

export const ChatMessage = ({textMessage, messageOwner}: IChatMessageProps) => {
    return (
        <div className={cn(styles.messageBox, styles[messageOwner])}>
            <div className={cn(styles.chatMessage, styles[messageOwner])}>
                {textMessage}
            </div>
        </div>
    )
}