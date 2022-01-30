export default {
    Query: {
        users: async (_, { id }, { datasource }) => { }
    },
    Mutation: {
        login: async (_, args) => {
            const { email, password } = args
            console.log('email end password', email, password)
        },
        signUp: async (_, args) => {
            let { username, email, password } = args
            let errors = {}
            try{
                console.log('user|', username, email, password)
            }catch(err){
                console.log('err', err)
            }
        }
    }
}