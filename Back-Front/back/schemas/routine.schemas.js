import yup from 'yup';

const routineScheme = yup.object({
    description: yup.string().required,
    routine: yup.array().of(
        yup.object().shape({
            days: yup.array().of(yup.string()).required(),
            exercises: yup.array().of(
                yup.object().shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                    description: yup.string().required()
                })
            )
        })
    )
})

export {
    routineScheme
}