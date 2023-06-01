interface IMessageData {
    textMessage: string;
    owner: 'companion' | 'me'
}

type TChatData = Array<IMessageData>

interface IChats {
    [keys: string]: TChatData
}

export interface IDefaultState {
    authorized: boolean;
    chats: IChats
    currInstance: string;
    currToken: string;
    currChat: string;
}

export const defaultState: IDefaultState = {
    authorized: false,
    chats: {},
    currInstance: '',
    currToken: '',
    currChat: ''
}

