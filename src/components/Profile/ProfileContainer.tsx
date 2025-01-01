import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { compose } from "redux";
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from "../../redux/profileReducer.ts";
import { AppStateType } from "../../redux/reduxStore.ts";
import { ProfileType } from "../../types/types.ts";
import Profile from "./Profile.tsx";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (text: string) => void
    savePhoto: (file: File) => void 
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileContainer: FC<MapPropsType & DispatchPropsType> = (props) => {
    const { userId: paramUserId } = useParams();
    const navigate = useNavigate();

    const refreshProfile = () => {
        let userId: string | undefined = paramUserId;
        if (!userId) {
            userId = props.authorizedUserId ? String(props.authorizedUserId) : undefined;
            if (!userId) {
                navigate('/login');
                return;
            }
        }
        props.getUserProfile(Number(userId));
        props.getStatus(Number(userId));
    };

    useEffect(() => {
        refreshProfile();
    }, [paramUserId, props.authorizedUserId]);

    return (
        <div>
            <Profile {...props} 
            isOwner={!paramUserId}
            profile={props.profile} 
            status={props.status} 
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto} />
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId, // Убедитесь, что authorizedUserId правильно передается
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);
