import grid from 'gridfs-stream'
import mongoose from 'mongoose'

const url = '';

let gfs, gridfsBucket;

//connecting database
const conn = mongoose.connection;

//check the connection of db (Open) then select the bucket as collection
conn.once('open', () => {
    console.log('Database connected');
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

//uploading image to db
export const uploadImage = (request, response) => {
    //check file available or not
    if (!request.file)
        return response.status(404).json("File not found");

    //set the url or the file
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);
};


// Getting image from db
export const getImage = async (request, response) => {
    try {
        //find the filename from files
        const file = await gfs.files.findOne({ filename: request.params.filename });

        //check is file available or not
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response); //The pipe() method is used to pipe the data from the readStream

    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}
