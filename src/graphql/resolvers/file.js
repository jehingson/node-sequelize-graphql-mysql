
import path from 'path'
import fs from 'fs'
require('dotenv').config();

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = {
    Query: {
        hello: () => 'Hello world',
    },
    Mutation: {
        uploadFile: async (parent, { file }) => {
            const { createReadStream, filename } = await file
            const { ext } = path.parse(filename)
            const randomName = makeid(12) + ext
            const result = await cloudinary.v2.uploader.upload(file.path, { folder: 'prueba' })
            removeTmp(file.path)
            res.json({
                public_id: result.public_id,
                url: result.secure_url
            })
            const stream = createReadStream()
            const pathName = path.join(__dirname, `../../../public/images/${randomName}`)
            await stream.pipe(fs.createWriteStream(pathName))
            return {
                url: `http://localhost:5000/graphql/public/images/${randomName}`,
            }
        },
    }
}
