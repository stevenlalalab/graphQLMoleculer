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
            async getName(ctx) {
                let result = []
                users.forEach((element) => {
                    const obj = {
                        name: element.name
                    }
                    result.push(obj)
                })
                console.log(result)
                return result
            },
            async getLastname(ctx) {
                let result = []
                users.forEach((element) => {
                    result.push(element.lastname)
                })
                return result
            },
            async getAge(ctx) {
                let result = []
                users.forEach((element) => {
                    result.push(element.age)
                })
                return result
            }
        }
    })
    await broker.start()
}

start()