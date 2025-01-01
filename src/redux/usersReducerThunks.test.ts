import { ResCodesEnum, ResType } from "../api/api";
import { usersAPI } from "../api/usersApi";
import { actions, follow, unfollow } from "./usersReducer";

jest.mock("../api/usersApi", () => ({
    usersAPI: {
        follow: jest.fn(),
        unfollow: jest.fn(),
    },
}));

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
});

const result: ResType = {
    resultCode: ResCodesEnum.Success,
    messages: [],
    data: {},
    status: "",
};

userAPIMock.follow.mockResolvedValue(result);
userAPIMock.unfollow.mockResolvedValue(result);

test("success follow thunk", async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("success unfollow thunk", async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
