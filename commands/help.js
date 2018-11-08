const _HELP = {
     getHelp: function (api,id){
        const sendMsg = 
        "Comandos:\n"+
        "\n\n"+
        "!conta: Retorna os dados bancários do Ian\n\n"+
        "!ordem: Retorna a ordem de pagamento\n\n"+
        "!rodada: Retorna o pagador da rodada\n\n"+
        "\n\n"+
        "Todo dia primeiro as 16horas o sistema irá atualizar a ordem de pagamento e enviar uma mensagem sobre o resposável do mês."
    
        api.sendMessage(sendMsg, id);
    }
}

module.exports = _HELP;