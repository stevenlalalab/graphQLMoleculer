const { ServiceBroker } = require('moleculer')


const broker = new ServiceBroker({
    transporter: {
        type: 'NATS',
        options: {
            url: 'nats://localhost:4222'
        }    
    }
})

testService = async () => {
    await broker.start()
    const bidon = await broker.call("user.getName")
    .catch((err) => {
        console.log(err)
    })
    console.log(bidon)
}

testService()