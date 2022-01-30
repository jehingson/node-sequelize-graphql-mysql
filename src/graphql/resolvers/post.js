import DB from '../../models'
require('dotenv').config();

module.exports = {
    Query: {
        allPost: async (_, __, { authUser }) => {

            console.log('user', authUser)
            if(!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const post = await DB.Post.findAll({
                include: DB.User,
                order: [['id', 'DESC']],
            });
            console.log('eee', post)
            return post
        },
        async fetchPost(_, { id }, { authUser }) {
            return await DB.Post.findById(id);
        },
    },
    Mutation: {
        // Add a new post
        async addPost(_, args, { authUser }) {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const user = await DB.User.findOne({ where: { email: authUser.email } });
            console.log('user', user)
            if(!user){
                throw new Error('¡Debes iniciar sesión para continuar!')
            }
            let { title, description, image } = args
            const post = await DB.Post.create({
                title,
                description,
                image,
                UserUid: user.dataValues.uid,
                status: true
            });
            return post
        },

        // Update a particular post
        async updatePost(_, { id, title, content, status, tags }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')

            // fetch the post by it ID
            const post = await DB.Post.findById(id);

            // Update the post
            await post.update({
                title,
                slug: slugify(title, { lower: true }),
                content,
                status
            });

            // Assign tags to post
            await post.setTags(tags);

            return post;
        },

        // Delete a specified post
        async deletePost(_, { id }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')

            // fetch the post by it ID
            const post = await DB.Post.findById(id);

            return await post.destroy();
        }
    }
}