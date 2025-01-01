import React, { FC } from "react";
import { Navigate } from 'react-router-dom';
import { InitialStateType } from "../../redux/messagesReducer.ts";
import AddMessageForm from "./AddMessageForm.tsx";
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import classes from './Messages.module.scss';

type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
    isAuth: boolean
}

const Messages: FC<PropsType> = (props) => {
    if (!props.messagesPage || !props.messagesPage.dialogsData) {
        console.log("messagesPage", props.messagesPage);
        return <div>Loading...</div>;
    }
    

    let dialogsElements = props.messagesPage.dialogsData.map(dialog =>
        <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} img={dialog.img} />
    );
    let messagesElements = props.messagesPage.messagesData.map(message =>
        <Message message={message.message} key={message.id} img={message.img} />
    );

    let addNewMessage = (values: {newMessageText: string}) => {
        props.sendMessage(values.newMessageText);
    };

    if (!props.isAuth) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

export default Messages;
