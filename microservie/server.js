const { ServiceBroker } = require("moleculer");
const ApiServer = require('moleculer-web')

const broker = new ServiceBroker();

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

broker.createService(ApiService)

broker.createService({
    name: "user",
    actions: {
        async getName(ctx) {
            let result = []
            users.forEach((element) => {
                result.push(element.name)
            })
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

broker.start()