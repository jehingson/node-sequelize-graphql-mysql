'use strict';
import {
    ApolloError
} from 'apollo-server-express'
import DB from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

require('dotenv').config();

module.exports = {
    Query: {
        async allUsers() {
            return await DB.User.findAll();
        },
        async fetchUser(_, __, { authUser }) {
            if (!authUser) throw new Error('Error de autenticacion')
            const user = await DB.User.findOne({where: {uid: authUser.uid}});
            return user
        },
    },
    Mutation: {
        async signIn(_, { email, password }) {
            const user = await DB.User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Usuario o contraseña incorrecto')
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Usuario o contraseña incorrecto')
            }
            const token = jwt.sign({
                uid: user.uid,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '24h' })

            const result = user.toJSON()
            result.photo = result.photo ? result.photo : ''
            return {
                ...result,
                token

            }
        },
        register: async (_, args) => {

            let { username, email, password } = args
            if (!username || !email || !password) throw new Error('Revisa la información, faltan datos')

            const userByEmail = await DB.User.findOne({ where: { email } })
            if (userByEmail) throw new Error('El correo ya se encuentra registrado.')

            const user = await DB.User.create({
                username,
                email,
                password: await bcrypt.hash(password, 10)
            })
            return user

        },

        async updateUser(_, args, { authUser }) {
            let { username, photo } = args
            let data = {}
            if (!authUser) {
                throw new Error('¡Debes iniciar sesión para continuar!')
            }
            try {
                const user = await DB.User.findOne({ where: { email: authUser.email } });
                if (!user) {
                    throw new Error('¡Debes iniciar sesión para continuar!')
                }
                if (username) data.username = username
                if (photo) data.photo = photo
                await user.update(data);
                return user;
            } catch (err) {
                throw new ApolloError('¡Debes iniciar sesión para continuar!')
            }
        }
    }
}