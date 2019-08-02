const { GraphQLServer } = require('graphql-yoga')

let users = [
    {
        id: 1,
        name: "Anderson Dutra",
        email: "anderson.dutra@gmail.com",
        password: "dutra"
    },
    {
        id: 2,
        name: "Anderson Martins",
        email: "anderson.martin@gmail.com",
        password: "martins"
    },
    {
        id: 3,
        name: "John Dee",
        email: "john.dee@gmail.com",
        password: "dee"
    },
]

let usersCount = users.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a OKR system, made by ADAR`,
        users: () => users,
        user: (parent, args) => users.find(element => element.id == args.id)
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = {
                id: usersCount++,
                name: args.name,
                email: args.email,
                password: args.password
            }
            users.push(user)
            return user
        },
        updateUser: (parent, args) => {
            const user = users.find(element => element.id == args.id)
            user.name = args.name,
            user.email = args.email,
            user.password = args.password
            return user
        },
        deleteUser: (parent, args) => {
            const user = users.find(element => element.id == args.id)
            users.pop(user)
        }
    },
    User: {
        id: (parent) => parent.id,
        name: (parent) => parent.name,
        email: (parent) => parent.email,
        password: (parent) => parent.password
    } 
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))