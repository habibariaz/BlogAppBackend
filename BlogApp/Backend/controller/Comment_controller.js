import Comment from '../modal/Comment.js'


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json({ msg: "Comment Saved Successfully...!!!" })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
export const getComments = async (request, response) => {
    try {
        let comments = await Comment.find({ postId: request.params.id });
        response.status(200).json(comments)

    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
// export default newComment;
