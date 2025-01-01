import React, { FC } from "react";
import classes from './../Messages.module.scss';

type PropsType = {
    message: string
    img: string
}

const Message: FC<PropsType> = (props) => {
    return (
        <div className={classes.message}>
            <img src={props.img}/>
            {props.message}
        </div>
    )
}

export default Message;