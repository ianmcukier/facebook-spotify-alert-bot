const CONFIG = require("../bin/config.json")
const _CONTA = {
    getData: function (api,id){
        const sendMsg = CONFIG.info +"\n\nBanco do Brasil\n"+CONFIG.data+"\n\nValor: "+CONFIG.preco;
        api.sendMessage(sendMsg, id);
    }
}

module.exports = _CONTA;