import queryString from 'query-string';
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks.ts";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalItemsCount,
    getUsers,
    getUsersFilter,
} from "../../redux/users-selectors.ts";
import { FilterType, follow as followThunk, requestUsers, unfollow as unfollowThunk } from "../../redux/usersReducer.ts";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";

type QueryParamsType = {term?: string; page?: string; friend?: string}

export const Users: FC = () => {
    const totalItemsCount = useSelector(getTotalItemsCount);
    const users = useSelector(getUsers);
    const currentPage = useSelector(getCurrentPage);
    const followingInProgress = useSelector(getFollowingInProgress);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const navigate = useNavigate();


    useEffect(() => {
        const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType 

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +parsed.page

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}



        dispatch(requestUsers(currentPage, pageSize, filter));
    }, [currentPage, pageSize, filter, dispatch]);
    
    useEffect(() => {
        const query: QueryParamsType = {};
        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);
    
        const search = queryString.stringify(query);
    
        navigate({
            pathname: '/users',
            search: `?${search}`
        });
    }, [filter, currentPage, navigate]);
    

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const follow = (userId: number) => {
        dispatch(followThunk(userId));
    };

    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId));
    };

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalItemsCount}
                pageSize={pageSize}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        key={u.id}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unfollow={unfollow}
                    />
                ))}
            </div>
        </div>
    );
};
