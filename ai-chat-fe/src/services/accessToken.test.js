import { getAccessToken, getUser } from './accessToken';

describe('getAccessToken', () => {
    afterEach(() => {
        document.cookie = '';
    });

    it('should return null when no access token is present', () => {
        expect(getAccessToken()).toBeNull();
    });

    it('should return the access token when present', () => {
        document.cookie = 'accessToken=myAccessToken';
        expect(getAccessToken()).toBe('myAccessToken');
    });
});

describe('getUser', () => {
    it('should return null when no access token is present', () => {
        expect(getUser()).toBeNull();
    });

    it('should return user info when access token is present', () => {
        // Mocking window.atob
        global.window.atob = jest.fn(() => '{"UserInfo": "myUserInfo"}');

        // Mocking getAccessToken
        document.cookie = 'accessToken=myAccessToken.token';

        expect(getUser()).toBe('myUserInfo');
    });
});
