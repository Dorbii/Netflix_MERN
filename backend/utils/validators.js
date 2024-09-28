export function validateBody(email, password, username, type) {
    switch (type) {
        case 'signup':
            if (!email || !password || !username) {
                return { success: false, message: "Please provide all fields" };
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex for email
            if (!emailRegex.test(email)) {
                return { success: false, message: "Please provide a valid email" };
            }
            if (password.length < 6) {
                return { success: false, message: "Password must be at least 6 characters" };
            }
            break;
        case 'login':
            if (!email || !password) {
                return { success: false, message: "Please provide all fields" };
            }
            break;
        default:
            return null;
            break;
    }
}

export function validateUniqueUser(existingUserByEmail, existingUserByUsername) {
    if (existingUserByEmail) {
        return { success: false, message: "An account with this email already exists" };
    }
    if (existingUserByUsername) {
        return { success: false, message: "An account with this username already exists" };
    }
    return null;
}