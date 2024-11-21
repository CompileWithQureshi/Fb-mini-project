import { Post } from "../model/post.js";

const CreatePost = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({
      message: "Input field is empty",
    });
  }

  if (req.user.userId !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }
  try {
    const addPost = new Post({
      content,
      userId,
    });

    if (!addPost) {
      res.status(500).json({
        message: "Serve Error",
      });
    }

    const savePost = await addPost.save();
    if (!savePost) {
      res.status(404).json({
        message: "Cannot Add data",
      });
    }
    res.status(200).json({
      message: "Succes",
      data: savePost,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating user: ${error.message}`,
    });
  }
};

const GetAllPost = async (req, res) => {
  const { id } = req.query;

  
  try {
    let query = {};

    if (id) query.userId= id;
    // if (user) query.userId = user;
    console.log(query);
    

    const posts = await Post.find(query).populate('userId', 'userName');

    res.status(200).json({
      message: "Data is Fetched ",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating user: ${error.message}`,
    });
  }
};

const UpdatePost = async (req, res) => {
  const { postId, content ,id} = req.body;
  console.log(id);
  
  if (!postId || !content) {
    return res.status(400).json({
      message: "Input is empty",
    });
  }
  if (req.user.userId !== id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }
  try {
    let posts = await Post.findOne({ _id: postId });
    if (!posts) {
      return res.status(404).json({
        message: "Enter valid Id",
      });
    }

    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );
    if (!updatePost) {
      return res.status(400).json({
        message: "Data not found",
      });
    }
    res.status(200).json({
      message: "Updated Post",
      data: updatePost,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating user: ${error.message}`,
    });
  }
};

const AddLike = async (req, res) => {
  const { postId, userId } = req.body;

  if (req.user.userId !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }

  if (!postId || !userId) {
    return res.status(400).json({
      message: `Input is Empty`,
    });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Ensure likesId is initialized
    post.likesId = post.likesId;

    // Check if user has already liked the post
    if (post.likesId.includes(userId)) {
      post.likesId = post.likesId.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likesId.push(userId);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({
      message: post.likesId.includes(userId)
        ? "Post liked successfully"
        : "Post unliked successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating post: ${error.message}`,
    });
  }
};

const DeletePost = async (req, res) => {
  const { postId ,id} = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  if (req.user.userId !== id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", data: deletedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddComment = async (req, res) => {
  const { postId, userId, comment, commentId } = req.body;

  if (!postId || !userId || !comment) {
    return res
      .status(400)
      .json({ message: "Post ID, User ID, and Comment are required" });
  }

  if (req.user.userId !== id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    // Add a new comment
    post.comments.push({ userId, comment });

    const updatedPost = await post.save();

    res.status(200).json({
      message: commentId
        ? "Comment updated successfully"
        : "Comment added successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { CreatePost, GetAllPost, UpdatePost, AddLike, DeletePost, AddComment };
