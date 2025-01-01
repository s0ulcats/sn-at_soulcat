import { Button } from "antd";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/unknownUser.png';
import { UsersType } from "../../types/types";
import styles from './Users.module.scss';

type PropsType = {
    user: UsersType, 
    followingInProgress: Array<number>
    unfollow: (userId: number) => void 
    follow: (userId: number) => void 
}

let User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={styles.userPhoto}
                            alt="" />
                    </NavLink>
                </div>
            <span>
                <span>
                    <div className={styles.name}>{user.name}</div><div>{user.status}</div>
                </span>
            </span>
                <div>
                    {user.followed
                        ? <Button
                        type="primary"
                        disabled={followingInProgress && followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id);
                            }}
                        >
                            Unfollow
                        </Button>


                        : <Button
                        type="primary"
                            disabled={followingInProgress && followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id);
                            }}
                        >
                            Follow
                        </Button>
                    }
                </div>
            </span>
        </div>
    )
}

export default User