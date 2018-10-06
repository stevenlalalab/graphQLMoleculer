const { GraphQLServer } = require('graphql-yoga')

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
        user: () => users,
        post: () => posts, // point virgule ?
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

server.start(() => {
    console.log('Server is running on http://localhost:4000')
})