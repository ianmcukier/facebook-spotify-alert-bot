const _DEFAULT = {
    wrongFunctionCall: function(api,id){
        const sendMsg = "Comando inválido.\nDigite !help para ver os comandos."
        api.sendMessage(sendMsg, id);
    }
}

module.exports = _DEFAULT;