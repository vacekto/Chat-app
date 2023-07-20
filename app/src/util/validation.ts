import { ILoginState } from "./types"

// regex username: length 6 to 20, not starting with "_"" or ".", not containing "." or "_" next to each other,not ending with "_"" or ".", no special chars
// regex password: length 8 to 20, at least one uppercase letter, one lowercase letter and one number
// regex email: RFC 5322 Official Standard

const regex = {
    username: new RegExp("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"),
    password: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$"),
    email: new RegExp("([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|'([]!#-[^-~ \t]|(\\[\t -~]))+')@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])"),
}

type TValidateLoginOrRegister = (
    props: ILoginState
) => [outcome: boolean, errors: Omit<ILoginState, 'formAction'>]

export const validateLoginOrRegister: TValidateLoginOrRegister = (
    { formAction, username, password, repeatPassword, email }
) => {

    let isValid = true
    const errors = {
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    }

    if (!regex.username.test(username)) {
        isValid = false
        errors.username = 'Username invalid'
    }

    if (!regex.password.test(password)) {
        isValid = false
        errors.password = 'Password invalid'
    }

    if (formAction === 'register' && password !== repeatPassword) {
        isValid = false
        errors.repeatPassword = 'Passwords do not match'
    }

    if (formAction === 'register' && !regex.email.test(email)) {
        isValid = false
        errors.email = 'Invalid email'
    }

    return [isValid, errors]
}