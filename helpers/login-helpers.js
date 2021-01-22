
const model = require('../database/user-model')
const bcrypt = require('bcrypt')
module.exports = {
    doSignup: (userData) => {
        // console.log(userData)
        
        return new Promise(async (resolve, reject) => {
            let user = await model.findOne({ email: userData.email })
            if (user) {
                console.log("Signup Failed")
                resolve({ status: false })
            } else {
                userData.password = await bcrypt.hash(userData.password, 10)
                await model.create({ email: userData.email, password: userData.password, name: userData.name, role: userData.role, phone:userData.phone, address:userData.address }).then((data) => {
                    resolve({ status: true ,data})
                })
            }
            
        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let response = {}
            let user = await model.findOne({ email: userData.email })
            console.log(user)
            if (user) {
                await bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("Success")
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                    else {
                        console.log("Login Failed")
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("Login Failed")
                resolve({ status: false })
            }
        })

    }

}
