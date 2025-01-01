import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from '../../redux/messagesReducer.ts';
import { AppStateType } from "../../redux/reduxStore.ts";
import Messages from './Messages.tsx';

let mapStateToProps = (state: AppStateType) => {
    console.log(state.messagesPage);
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth,
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    // удаляем до фикса withAuthRedirect, так как ща не робит 
)(Messages);
