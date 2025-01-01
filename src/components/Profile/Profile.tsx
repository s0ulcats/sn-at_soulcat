import React, { FC } from "react";
import { ProfileType } from "../../types/types.ts";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo 
            savePhoto={props.savePhoto}
            isOwner={props.isOwner}
            profile={props.profile} 
            saveProfile={props.saveProfile}
            status={props.status} 
            updateStatus={props.updateStatus} />
            {/* <MyPostsContainer /> */}
        </div>
    );
};

export default Profile;