import { defaultState } from "./reduxStore"

export const reducer = (state = defaultState, action: {type: string, payload: string, key?: string}) => {
    switch(action.type) {
        case "CHANGE_AOUTHORIZATION":
            return {...state, authorized: action.payload === 'authorized'}
        case "SET_TOKEN":
            return {...state, currToken: action.payload}
        case "SET_INSTANCE":
            return {...state, currInstance: action.payload}
        case "SET_CURRENT_CHAT":
            return {...state, currChat: String(+action.payload)}
        case "ADD_NEW_CHAT":
            if (typeof action.payload === "string"){
                state.chats = {...state.chats, [String(+action.payload)]:[]}
            }
            return {...state}
        case "ADD_MESSAGE_TO_CHAT":
            if (action.key){
                state.chats[action.key].push({textMessage: action.payload, owner: 'me'})
            }
            return {...state}
        case "RECEIVE_MESSAGE":
            if (action.key && state.chats[action.key]){

                state.chats[action.key].push({textMessage: action.payload, owner: 'companion'})
            }
            return {...state}
        default: 
            return state
    }
}