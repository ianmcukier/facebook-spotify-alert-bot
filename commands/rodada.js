const _RODADA = {
    getCurrentPayer: function (api,id,order,currentIndex){
        const sendMsg = order[currentIndex] + " é o(a) responsável pelo pagamento este mês";
        api.sendMessage(sendMsg, id);
    }
}

module.exports = _RODADA;