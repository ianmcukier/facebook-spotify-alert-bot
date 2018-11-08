const _ORDEM = {
    getOrder:function (api,id,order,currentIndex){
        let sendMsg = "Ordem de pagamento a partir deste mês:\n\n";
        let index = currentIndex;;
        for(let i = 0; i<order.length;i++){
            sendMsg = sendMsg+(i+1)+": "+order[index]+"\n";
            index++
            if(index>order.length-1)
                index = 0;
        }
        api.sendMessage(sendMsg, id);
    }
}

module.exports = _ORDEM;