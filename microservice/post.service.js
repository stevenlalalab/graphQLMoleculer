const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
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

    
const start = async function () {
    await broker.createService({
        name: "user",
        actions: {
            async getPost(ctx) {
                return posts
            },
        }
    })
    await broker.start()
}

start()