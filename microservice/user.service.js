const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    transporter: {
        type: 'NATS',
        options: {
            url: 'nats://localhost:4222'
        }    
    }
})

const users = [{
    name: 'Steven',
    lastname: 'Loo Fat',
    age: 22
},{
    name: 'Hugo',
    lastname: 'Meron',
    age: 22
},{
    name: 'Celine',
    lastname: 'Chen',
    age: 35
}]
    
const start = async function () {
    await broker.createService({
        name: "user",
        actions: {
            async getUser(ctx) {
                return users
            }
        }
    })
    await broker.start()
}

start()