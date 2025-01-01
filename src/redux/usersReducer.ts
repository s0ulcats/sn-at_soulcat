import { Dispatch } from "redux";
import { usersAPI } from "../api/usersApi.ts";
import { UsersType } from "../types/types";
import { updateObjectInArrary } from "../utils/oobjectsHelpers.ts";
import { ResType } from './../api/api';
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 25,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    followingInProgress: [] as Array<number>, //Arr of users id
}

const usersReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArrary(state.users, action.userId, "id", { followed: true })
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArrary(state.users, action.userId, "id", { followed: false })
            }
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalItemsCount: action.count
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/SET_FILTER':
                return {
                    ...state,
                    filter: action.payload
                }
        case 'SN/USERS/TOGGLE_IS_FOLLOWIONG_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
    setTotalUsersCount: (count: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWIONG_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (currentPage: number,
    pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

const _followUnFollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<ResType>,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    try {
        let response = await apiMethod(userId);

        if (response && response.data && response.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            console.error(`Action failed with status: ${response.status}, message: ${response?.messages || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error in followUnFollowFlow:", error);
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    };
}

export default usersReducer;

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>