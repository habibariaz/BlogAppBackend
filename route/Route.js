import express from 'express'

import { signup, loginUser } from '../controller/User_controller.js';
import { uploadImage, getImage } from '../controller/Image_controller.js';
import { authenticateToken } from '../controller/JWT_controller.js'
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/Post_controller.js';
import upload from '../Utils/Upload.js';
import { newComment } from '../controller/Comment_controller.js';
import { getComments, deleteComment } from '../controller/Comment_controller.js';


const router = express.Router();


//SignUp API Route
router.post("/signup", signup);

//Login API route
router.post("/login", loginUser);

//Blog Image/File Upload API Route
router.post('/file/upload', upload.single('file'), uploadImage);

//Blog Image/File GET API routerz
router.get('/file/:filename', getImage);

//creating post of blog using middleware(autheticateToken)
router.post('/create', authenticateToken, createPost);

//fetch all the blogs stored in DB
router.get('/posts', authenticateToken, getAllPosts);

//fetch all the blogs based on Id stored in DB that is uploaded by a specific person 
router.get('/post/:id', authenticateToken, getPost);

router.put('/Update/:id', authenticateToken, updatePost);

router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/comment/new', authenticateToken, newComment);

router.get('/comments/:id', authenticateToken, getComments)

router.delete('/comment/delete/:id', authenticateToken, deleteComment);

router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ msg: 'Access to protected route granted!', user: req.user });
});

export default router;
