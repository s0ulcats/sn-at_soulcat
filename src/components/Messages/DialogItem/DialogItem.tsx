import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from './../Messages.module.scss';

type PropsType = {
    id: number
    name: string
    img: string
}

const DialogItem: FC<PropsType> = (props) => {
    let path = '/messages/' + props.id;

    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <img src={props.img} />
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;