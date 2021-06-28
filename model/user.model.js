const fs = require('fs');
const Utils = require('../lib/Utils');

class UserModel{
    static async getAllUsers(){
        try {
            const userArrayRaw = fs.readFileSync('database/users.json');
            const userArray = JSON.parse(userArrayRaw);
            console.log(userArray);
            return userArray;

        } catch (error) {
            console.error('Error in model get all users', error);
        }
    }

    static async updateUser(id, newData){
        try {
            const userArrayRaw = fs.readFileSync('database/users.json');
            let userArray = JSON.parse(userArrayRaw);
            let updatedUserArray = [];
            userArray.forEach(user => {
                if(user.id === id){
                    if(newData.email){
                        user.email = newData.email;
                    }
                    if(newData.firstName){
                        user.firstName = newData.firstName;
                    }
                }
                updatedUserArray.push(user);
            });
            updatedUserArray = JSON.stringify(updatedUserArray);
            fs.writeFileSync('database/users.json', updatedUserArray);
            return;
        } catch (error) {
            console.error('Error in model update users', error);
        }
    }

    static async getUserById(id){
        try {
            const userArrayRaw = fs.readFileSync('database/users.json');
            const userArray = JSON.parse(userArrayRaw);
            let result = {userExist: false};
            userArray.forEach(user => {
                if(user.id === id){
                    result = {userExist: true, user};
                }
            });
            return result;
        } catch (error) {
            console.error('Error in model get user', error);
        }
    }

    static async addUser(userDetails){
        try {
            const userArrayRaw = fs.readFileSync('database/users.json');
            let userArray = JSON.parse(userArrayRaw);

            const id = await Utils.generateId(10);
            userDetails.id = id;
            userArray.push(userDetails);

            const updatedUserArray = JSON.stringify(userArray);
            fs.writeFileSync('database/users.json', updatedUserArray);
            return;

        } catch (error) {
            console.error('Error in model add user', error);
        }
    }
}
module.exports = UserModel;