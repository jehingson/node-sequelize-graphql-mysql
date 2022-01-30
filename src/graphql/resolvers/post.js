import DB from '../../models'
require('dotenv').config();

module.exports = {
    Query: {
        allPost: async (_, __, { authUser }) => {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const post = await DB.Post.findAll({
                include: DB.User,
                order: [['id', 'DESC']],
            });
            return post
        },
        async fetchPost(_, { id }, { authUser }) {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            return await DB.Post.findOne(id);
        },
    },
    Mutation: {
        async addPost(_, args, { authUser }) {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const user = await DB.User.findOne({ where: { email: authUser.email } });
            console.log('user', user)
            if (!user) {
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
        async updatePost(_, { id, title, description }, { authUser }) {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const post = await DB.Post.findOne({ where: { id: id }, include: DB.User });
            if (!post) throw new Error('¡La publicacion no existe!')
            let { User } = post
            if (User.toJSON().email !== authUser.email) throw new Error('¡Tus credenciales no pertenecen a esta publicacion!')

            let updatePost = {}
            if (title) updatePost.title = title
            if (description) updatePost.description = description

            await post.update(updatePost);

            return post;
        },

        async deletePost(_, { id }, { authUser }) {
            if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!')
            const post = await DB.Post.findOne({ where: { id: id }, include: DB.User });
            if (!post) throw new Error('¡La publicacion no existe!')
            let { User } = post
            if (User.toJSON().email !== authUser.email) throw new Error('¡Tus credenciales no pertenecen a esta publicacion!')
            return await post.destroy();
        }
    },
    Post: {
        user: ({ User }) => {
            let user = User.toJSON()
            user.photo = user.photo ? user.photo : '';
            return user
        }
    }
}