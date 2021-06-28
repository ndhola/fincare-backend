const exceptions = require('../config/exceptions');

class Exceptions {
	constructor(error = 'GeneralError', message) {
		const exception = exceptions['errors'].find(err => err.error === error);
		if(message) {
			exception.message = message;
		}
		return exception;
	}
}
module.exports = Exceptions;
