

export const regex = {
    // regex username: length 6 to 20, not starting with "_"" or ".", not containing "." or "_" next to each other,not ending with "_"" or ".", no special chars
    username: new RegExp("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"),
    // regex password: length 8 to 20, at least one uppercase letter, one lowercase letter and one number
    password: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$"),
    // regex email: RFC 5322 Official Standard
    email: new RegExp("([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|'([]!#-[^-~ \t]|(\\[\t -~]))+')@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])"),
}

export const test = 'testing'