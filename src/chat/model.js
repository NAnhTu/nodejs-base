const {user, chat_room, chat_participant} = require('../../models/index')
let model = {
    getListChat: () => {
        return chat_room.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: chat_participant,
                    attributes: [],
                    include: [
                         {
                            model: user,
                            attributes: [],
                            required: true
                        },
                    ],
                }
            ],
            raw: true,
        })
    }
}

module.exports = model
