import yup from 'yup';

const diet = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    calories: yup.number().required()
})

export {
    diet
}