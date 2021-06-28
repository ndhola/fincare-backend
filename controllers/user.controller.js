const Exception = require('../lib/exceptions');
const UserModel = require('../model/user.model');

class Users {
    static async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            return res.sendResponse({
                success: true,
                message: 'Users retrieved',
                users
            });

        } catch (error) {
            console.error('Error in getAll users', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async updateUser(req, res) {
        try {
            const {id} = req.params;
            const {firstName, email} = req.body;

            if(!id){
                return res.sendError(new Exception('MissingParameter', 'id Parameter is missing.'));
            }
            if(!firstName && !email){
                return res.sendError(new Exception('MissingParameter', 'email/firstName is missing.'));
            }

            await UserModel.updateUser(id, {firstName, email});
            return res.sendResponse({
                success: true,
                message: 'User updated'
            });

        } catch (error) {
            console.error('Error in updating user', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async addUser(req, res) {
        try {
            const {firstName, email} = req.body;

            if(!firstName){
                return res.sendError(new Exception('MissingParameter', 'firstName Parameter is missing.'));
            }
            if(!email){
                return res.sendError(new Exception('MissingParameter', 'email Parameter is missing.'));
            }

            await UserModel.addUser({firstName, email});

            return res.sendResponse({
                success: true,
                message: 'User added'
            });

        } catch (error) {
            console.error('Error in adding user', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getUser(req, res) {
        try {
            const {id} = req.params;

            if(!id){
                return res.sendError(new Exception('MissingParameter', 'id Parameter is missing.'));
            }

            const {userExist, user} = await UserModel.getUserById(id);
            if(userExist){
                return res.sendResponse({
                    success: true,
                    user
                });
            } else {
                return res.sendError(new Exception('NotFound', 'User not found with given id'));
            }

        } catch (error) {
            console.error('Error in getting user', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = Users;