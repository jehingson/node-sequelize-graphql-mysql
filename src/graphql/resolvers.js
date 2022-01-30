
import { User } from '../models/index'
import { UserInputError } from 'apollo-server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { JWT_SECRET } from '../config/.env.json'

module.exports = {
    Query: {
        getUsers: async (_,__,context) => {
            let errors = {}
            try {
                let user
                if(!context.req || !context.req.headers.authorization){
                    errors.err = 'El usuario no está autenticado'
                    throw new errors
                }
                const token = context.req.headers.authorization.split('Bearer ')[1]
                jwt.verify(token, JWT_SECRET , (error, decodedToken) => {
                        if(error){
                            errors.err = 'El usuario no está autenticado '
                            throw new errors
                        }
                        user = decodedToken
                })
                console.log('user', user)

                const users = await User.findAll({email: {[Op.ne]: user.email}});
                return users;
               
            } catch (err) {
                throw new UserInputError('Bad all user', {error: errors.err})
            }
        },
        login: async (_, args) => {
            const { email, password } = args
            let errors = {}
            try {
                if(!email || !password) errors.err = 'Revisa la informacion, faltaron datos'
                if(Object.keys(errors).length > 0){
                    throw new errors
                }
                const user = await User.findOne({where: {email}})
                if(!user){
                    errors.err = 'Verifique la información, email o contraseña incorrecta.'
                    throw new errors
                 }
                 const validationPassword = await bcrypt.compare(password, user.password)
                 if(!validationPassword){
                    errors.err = 'Verifique la información, email o contraseña incorrecta.'
                    throw new errors
                 }

                 const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1y'})
                 user.token = token 


                 return {
                     ...user.toJSON(),
                     createdAt: user.dataValues.createdAt.toISOString(),
                     token
                 }

            }catch (err){
                throw new UserInputError('Bad Login', {error: errors.err})
            }
        },
        getPosts: async (_, args) => {},
        onePost: async (_, args) => {}
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password } = args
            let errors = {}
            try {
                if (
                    !username ||
                    !email ||
                    !password 
                ) errors.err = 'Verifique la informacion, faltan datos.'

                const userByEmail = await User.findOne({ where: { email } })
                if (userByEmail) errors.err = 'El correo ya se encuentra registrado.'
                if (Object.keys(errors).length>0) {
                    throw new errors
                }
                password = await bcrypt.hash(password, 6)
                const user = await User.create({ username, email, password })
                return user

            } catch (err) {
                console.log('err >>>>>>>', err)
                throw new UserInputError('Bad input', {error: errors.err})
            }
        },
        createPost: async (_,args) =>{
            let { userId, title, description, image } = args
   
        }
    }
}

