// import React from 'react'
// import { GridFsStorage } from 'multer-gridfs-storage'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config();

const username = process.env.DB_Username;
const password = process.env.DB_Password;

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@blogapp.bqsqi.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`,

    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        if (match.indexOf(file.mimeType) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({ storage })
