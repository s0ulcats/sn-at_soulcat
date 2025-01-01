import React, { FC } from "react";
import { PostType } from "../../../types/types.ts";
import AddNewPostForm, { AddNewPostFormValuesType } from "./AddNewPostForm/AddNewPostForm.tsx";
import classes from './MyPosts.module.scss';
import Post from './Post/Post.tsx';

export type MapPropsType = {
    postData: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: FC<MapPropsType & DispatchPropsType> = props => {

    let messageElements = 
    [...props.postData]
    .reverse()
    .map(post => <Post message={post.message} key={post.id} likes={post.likesCount} />);

    let onAddPost = (values: AddNewPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost} />
            <div className={classes.posts}>
                {messageElements}
            </div>
        </div>
    );
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;
