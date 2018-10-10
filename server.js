const { GraphQLServer } = require('graphql-yoga')
const { ServiceBroker } = require('moleculer')

const broker = new ServiceBroker ({
    transporter: {
        type: 'NATS',
        options: {
            url: 'nats://localhost:4222'
        }
    }
})

const resolvers = {
    Query: {
        user: async () => {
            const result = await broker.call('user.getUser')
            .catch((err) => {
                console.log(err)
            })
            return result
        },
        post: async () =>  {
            const result = await broker.call('user.getPost')
            .catch((err) => {
                console.log(err)
            })
            return result
        }
    },
        Users: {
        name: (root) => root.name,
        lastname: (root) => root.lastname,
        age: (root) => root.age,
    },
    Posts: {
        title: (root) => root.title,
        contain: (root) => root.contain
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

const startBroker = async () => {
    await broker.start()
}
startBroker()


server.start(() => {
    console.log('Server is running on http://localhost:4000')
})