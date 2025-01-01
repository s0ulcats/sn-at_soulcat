import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getIsFetching } from "../../redux/users-selectors.ts";
import Preloader from "../common/preloader/Preloader.tsx";
import { Users } from "./Users.tsx";

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: FC<UsersPagePropsType> = (props) => {
    
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}