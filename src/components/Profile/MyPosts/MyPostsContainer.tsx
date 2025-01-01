import { connect } from "react-redux";
import { actions } from '../../../redux/profileReducer.ts';
import { AppStateType } from "../../../redux/reduxStore.ts";
import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts.tsx";

const mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.profilePage.postData,
    }
}

let MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;
