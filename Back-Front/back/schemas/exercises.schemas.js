import yup from 'yup';

const exercises = yup.object({
    name: yup.string().required(),
    description: yup.string().required()
})

export {
    exercises
}