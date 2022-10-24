const bcrypt = require('bcryptjs');

let password = {
    generate: (password) => {
        return bcrypt.hashSync(
            password,
            11
        );
    },
    compare: (password, encryptedPassword) => {
        return !!bcrypt.compareSync(password, encryptedPassword);
    }
}

module.exports = password
