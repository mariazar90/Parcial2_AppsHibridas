import yup from 'yup';

const account = yup.object({
    userName: yup.string().trim().required().min(3),
    password: yup.string().required().min(3),//.matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    email: yup.string().trim().email(),
})

const profile = yup.object({
    name: yup.string().trim().required().min(3),
    email: yup.string().trim().required().email(),
    avatar: yup.string().trim().required().url(),
    routine: yup.string(),
    diet: yup.string(),
})
const updateProfile = yup.object({
    name: yup.string().trim().min(3),
    email: yup.string().trim().email(),
    avatar: yup.string().trim().url(),
    routine: yup.string(),
    diet: yup.string(),
})
/*
At least one upper case English letter, (?=.*?[A-Z])
At least one lower case English letter, (?=.*?[a-z])
At least one digit, (?=.*?[0-9])
At least one special character, (?=.*?[#?!@$%^&*-])
Minimum eight in length .{8,} (with the anchors)
*/
export {
    account,
    profile,
    updateProfile
}