import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import { AppStateType } from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
    
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType) {
    const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
            let {isAuth, ...restProps} = props
            if (!isAuth) return <Navigate to={'/login'} />;
            

            return <WrappedComponent {...restProps} />;

    }

    let connectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return connectedAuthRedirectComponent;
}

export default withAuthRedirect;
