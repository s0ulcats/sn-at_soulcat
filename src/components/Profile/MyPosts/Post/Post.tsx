import React, { FC } from "react";
import classes from './Post.module.scss';

type PropsType = {
    message: string
    likes: number
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className={classes.post}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6GiWyv4yUzOhaPY4U_qqmI6BfuzrnLtOQMA&s" />
            {props.message}
            <div className={classes.like}>
                <span><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/blue-like-button-icon.png" alt="" />{props.likes}</span>
            </div>
        </div>
    )
}

export default Post;