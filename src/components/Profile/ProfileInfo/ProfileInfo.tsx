import React, { ChangeEvent, FC, useState } from "react";
import employed from '../../../assets/images/employed.jpg';
import lookingAJob from '../../../assets/images/lookingForAjob.jpg';
import loginIMG from '../../../assets/images/unknownUser.png';
import { ProfileType } from "../../../types/types.ts";
import Preloader from "../../common/preloader/Preloader.tsx";
import ProfileDataForm from "./ProfileDataForm.tsx";
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx';

type PropsType = {
    status: string;
    updateStatus: (status: string) => void;
    profile: ProfileType | null;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileHeader}>
                <div className={classes.profileImageWrapper}>
                    <img
                        className={classes.profileImage}
                        alt="Profile"
                        src={profile.photos.large || loginIMG}
                    />
                    {isOwner && (
                        <label className={classes.uploadLabel}>
                            Change Photo
                            <input type="file" className={classes.fileInput} onChange={onMainPhotoSelected} />
                        </label>
                    )}
                </div>
                <div className={classes.profileName}>
                    <h1>{profile.fullName}</h1>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                </div>
            </div>
            {editMode ? (
                <ProfileDataForm
                    profile={profile}
                    handleReset={() => setEditMode(false)}
                    saveProfile={saveProfile}
                    setEditMode={setEditMode}
                />
            ) : (
                <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner} />
            )}
        </div>
    );    
};

type ProfileDataPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div className={classes.profileData}>
            {isOwner && (
                <button className={classes.editButton} onClick={goToEditMode}>
                    Edit Profile
                </button>
            )}
            <div className={classes.jobInfo}>
                <img
                    className={classes.jobImage}
                    src={profile.lookingForAJob ? lookingAJob : employed}
                    alt="Job Status"
                />
                <p><b>My professional skills:</b> {profile.lookingForAJobDescription || "Not specified"}</p>
            </div>
            {profile.aboutMe && <p className={classes.aboutMe}><b>About Me:</b> {profile.aboutMe}</p>}
            <div className={classes.contacts}>
                <b>Contacts:</b>
                <ul>
                    {Object.keys(profile.contacts)
                        .filter((key) => profile.contacts[key]) // Оставляем только непустые контакты
                        .map((key) => (
                            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                        ))}
                </ul>
            </div>
        </div>
    );
};

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <li className={classes.contactItem}>
            <b>{contactTitle}:</b>
            {contactValue ? (
                <a href={contactValue} target="_blank" rel="noopener noreferrer">
                    {contactValue}
                </a>
            ) : (
                "No contact value provided"
            )}
        </li>
    );
};


export default ProfileInfo;