import joi from 'joi'

export const user = (body) => {
    const userSchema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
    })
    return userSchema.validate(body)
}
