const status = require("http-status");
const chatModel = require("./model");
let controller = {
    getListChat: async (req, res) => {
        try {
            const listChat = await chatModel.getListChat()
            return res.json(listChat)
        } catch (e) {
            console.log(e);
            return res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    }
}

module.exports = controller
