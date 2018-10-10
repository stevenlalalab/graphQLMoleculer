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

const posts = [{
    title: 'Chiffrage autoroute connecté',
    contain: 'Cette exercice est complètement pourris'
}, {
    title: 'La Galanterie c\'est du sexisme bienveillant',
    contain: 'Les féministes n\'aimeront pas cet article'
}, {
    title: 'Devinez qui est prêt en cas de désistement de Tom ?',
    contain: 'Dernier article'
}]


const resolvers = {
    Query: {
        user: async () => {
            const result = await broker.call('user.getName')
            .catch((err) => {
                console.log(err)
            })
            return result //work only with object tab
        },
        post: () => posts
    },
    Users: {
        name: (root) => root.name, // root ?
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