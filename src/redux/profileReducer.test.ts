import profileReducer, { actions, InitialStateType } from './profileReducer';

describe('profileReducer tests', () => {
  let initialState: InitialStateType;

  beforeEach(() => {
    initialState = {
      postData: [
        { id: 1, message: 'Hi, how are u?', likesCount: 11 },
        { id: 2, message: "It's my first post", likesCount: 14 },
        { id: 3, message: 'Lorem ipsum', likesCount: 88 },
      ],
      profile: null,
      status: '',
    };
  });

  test('add post', () => {
    const action = actions.addPostActionCreator('Test post');
    const newState = profileReducer(initialState, action);

    expect(newState.postData.length).toBe(4);
    expect(newState.postData[3].message).toBe('Test post');
    expect(newState.postData[3].likesCount).toBe(0);
  });

  test('delete post', () => {
    const action = actions.deletePost(1);
    const newState = profileReducer(initialState, action);

    expect(newState.postData.length).toBe(2);
    expect(newState.postData.find(p => p.id === 1)).toBeUndefined();
  });

  test('set user profile', () => {
    const profile = { userId: 1, fullName: 'Test User' } as any; 
    const action = actions.setUserProfile(profile);
    const newState = profileReducer(initialState, action);

    expect(newState.profile).toEqual(profile);
  });

  test('set status', () => {
    const action = actions.setStatus('Test Status');
    const newState = profileReducer(initialState, action);

    expect(newState.status).toBe('Test Status');
  });

  test('save photo success', () => {
    const photos = { small: 'small.jpg', large: 'large.jpg' };
    const action = actions.savePhotoSuccess(photos);
    const newState = profileReducer(initialState, action);

    expect(newState.profile?.photos).toEqual(photos);
  });
});