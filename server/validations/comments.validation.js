import joi from 'joi'

export const validComment = (body) => {
    const commentSchema = joi.object({
        comment: joi.string().required(),
    })
    return commentSchema.validate(body)
}
