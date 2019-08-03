const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require ('prisma-binding')

const resolvers = {
    Query: {
        user: (_, args, context, info) => {
            return context.prisma.query.user(
                {
                    where: {
                        id: args.id
                    }
                },
                info
            )
        },
        objective: (_, args, context, info) => {
            return context.prisma.query.objective(
                {
                    where: {
                        id: args.objective_id
                    }
                },
                info
            )
        },
        objectivesByUser: (_, args, context, info) => {

            return context.prisma.query.objectives(
                {
                    where: {
                        status: args.status,
                        author: {
                            id: args.author_id
                        }
                    }
                },
                info
            )
        }
    },
    Mutation: {
        createObjective: (_, args, context, info) => {
            return context.prisma.mutation.createObjective(
                {
                    data: {
                        name: args.name,
                        description: args.description,
                        author: {
                            connect: {
                                id: args.author_id
                            }
                        }
                    }
                },
                info,
            )
        },
        changeObjectiveStatus: (_, args, context, info) => {

            return context.prisma.mutation.updateObjective(
                {
                    where: {
                        id: args.objective_id
                    },
                    data: {
                        status: args.status
                    }
                },
                info
            )
        },
        signup: (_, args, context, info) => {
            return context.prisma.mutation.createUser(
                {
                    data: {
                        name: args.name,
                        email: args.email,
                        password: args.password
                    }
                },
                info
            )
        }
    }
}

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        prisma: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466'
        })
    })
})

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
