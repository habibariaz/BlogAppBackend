import Post from '../modal/Post.js'

export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        return response.status(200).json("Post Published Successfully...!!!")

    } catch (error) {
        return response.status(500).json("Error while published...!!!")
    }
}

export const getAllPosts = async (request, response) => {
    let category = request.query.category;
    let posts;
    try {
        if (category) {
            posts = await Post.find({ categories: category })
        } else {
            posts = await Post.find({});

        }
        return response.status(200).json(posts)

    } catch (error) {
        return response.status(500).json({ msg: error.message })

    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post)

    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: "Post Not Found...!!!" })
        }

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body }) //$set => array me agr ksi set ko replace krna ha,,,, $addToset => agr array me ksi set ko append krna ha
        return response.status(200).json({ msg: "Post Updated...!!!" })


    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: "Post Not Found...!!!" });
        }
        return response.status(200).json({ msg: "Post Deleted Successfully...!!!" });

    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}