import { InferActionsTypes } from "./reduxStore";

const AVA_IMG = "https://i.pinimg.com/236x/66/09/da/6609da9ce2f30496520a6ad6d4cadba4.jpg"

type MessageType = {
    id: number
    message: string
    img: string
}

type DialogType = {
    id: number
    name: string
    img: string
}

let initialState = {
    messagesData: [
        { id: 1, message: 's0ulcat', img: "https://i.pinimg.com/474x/02/ec/46/02ec46578d999af49f1eb898a078eced.jpg" },
        { id: 2, message: 'Lorem ipsum', img: "https://i.pinimg.com/474x/02/ec/46/02ec46578d999af49f1eb898a078eced.jpg" },
        { id: 3, message: 'asdfasdfgs', img: "https://i.pinimg.com/474x/02/ec/46/02ec46578d999af49f1eb898a078eced.jpg" },
        { id: 4, message: 'etc', img: "https://i.pinimg.com/236x/fe/be/01/febe01fff0175a10c8ada6207afa9554.jpg" },
        { id: 5, message: 'cc', img: "https://i.pinimg.com/236x/0f/3d/12/0f3d123e5066627d4f039e5d113720ba.jpg" },
    ] as Array<MessageType>,
    dialogsData: [
        { id: 1, name: 's0ulcat', img: "https://i.pinimg.com/236x/98/91/4c/98914cfe54f88269ff64e44812836600.jpg" },
        { id: 2, name: 'maga', img: "https://i.pinimg.com/474x/02/ec/46/02ec46578d999af49f1eb898a078eced.jpg" },
        { id: 3, name: 'biden', img: "https://i.pinimg.com/236x/66/09/da/6609da9ce2f30496520a6ad6d4cadba4.jpg" },
        { id: 4, name: 'maslina', img: "https://i.pinimg.com/236x/fe/be/01/febe01fff0175a10c8ada6207afa9554.jpg" },
        { id: 5, name: 'dfdf', img: "https://i.pinimg.com/236x/0f/3d/12/0f3d123e5066627d4f039e5d113720ba.jpg" }
    ] as Array<DialogType>,
    newPostText: ''
}

const messagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            let newMessage = {
                id: state.messagesData.length + 1,
                message: action.newMessageText,
                img: AVA_IMG
            };
            return {
                ...state,
                newPostText: '',
                messagesData: [...state.messagesData, newMessage]
            }
        default:
            return state;
    }
};

export const actions = {
    sendMessage: (newMessageText: string) => ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageText } as const)
}

export default messagesReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>