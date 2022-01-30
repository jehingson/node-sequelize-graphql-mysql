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
            return await DB.User.findAll({});
        },
        async fetchUser(_, { id }, { authUser }) {
            return await DB.User.findById(id);
        },
    },
    Mutation: {
        async signIn(_, { email, password }) {
            const user = await DB.User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Usuario o contraseña incorrect')
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Usuario o contraseña incorrect')
            }
            return jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '24h' })
        },
        register: async (_, args) => {
            let { username, email, password } = args
            console.log('args', args)
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

        async updateUser(_, { id, firstName, lastName }, { authUser }) {
            if (!authUser) {
                throw new Error('You Must Login First')
            }
            try {
                const user = await DB.User.findById(id);
                if (!user) {
                    throw new Error('No User foudn for update, please check userid')
                }
                await user.update({
                    firstName,
                    lastName
                });
                return user;
            } catch (err) {
                throw new ApolloError('custm message')
            }
        }
    }
}