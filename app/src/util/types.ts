export interface ILoginState {
    formAction: 'login' | 'register',
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}