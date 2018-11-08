var COMMANDS = require('./commands');
var CONFIG = require('./config.json');
var schedule = require('node-schedule');

const login = require("facebook-chat-api");
 
var ID;
var identifier;
var order;
var currentIndex;

init();

login({email: CONFIG.email, password: CONFIG.pwd}, (err, api) => {
    if(err) return console.error(err);
    setScheduler(api,ID);
    api.listen((err, message) => {
        if(message.threadID == ID)
            getFunctionCall(message.body,api)
        
    });
});

function init(){
    ID = CONFIG.id;
    identifier = "!";
    order = [CONFIG.users.user1,CONFIG.users.user2,CONFIG.users.user3,CONFIG.users.user4,CONFIG.users.user5];
    currentIndex = 0;

}

function selectFunc(func,call,api){
    switch(func){
        case COMMANDS.HELP:
            help(api,ID);
            break;
        case COMMANDS.BANKACCOUT:
            getData(api,ID);
            break;
        case COMMANDS.ORDER:
            getOrder(api,ID)
            break;
        case COMMANDS.PAYER:
            getCurrentPayer(api,ID);
            break;
        default:
            wrongFunctionCall(api,ID)
            break;
    }

}

function help(api,id){
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

function getFunctionCall(msg,api){
    if(validateMsg(msg)){
        const splitMsg = msg.replace(identifier,"").split(/\s+/); ;
        selectFunc(splitMsg[0].toLowerCase(),splitMsg[1],api)
    }
}

function validateMsg(msg){
    if(msg.charAt(0) == identifier){
        return true
    }
    return false;
}

function getData(api,id){
    const sendMsg = CONFIG.data;
    api.sendMessage(sendMsg, id);
}

function getOrder(api,id){
    let sendMsg = "";
    let index = currentIndex;;
    for(let i = 0; i<order.length;i++){
        sendMsg = sendMsg+(i+1)+": "+order[index]+"\n";
        index++
        if(index>order.length-1)
            index = 0;
    }
    api.sendMessage(sendMsg, id);
}

function getCurrentPayer(api,id){
    const sendMsg = order[currentIndex].toUpperCase() + " é o responsável pelo pagamento este mês";
    api.sendMessage(sendMsg, id);
}

function wrongFunctionCall(api,id){
    const sendMsg = "Comando inválido.\nDigite !help para ver os comandos."
    api.sendMessage(sendMsg, id);
}

function setScheduler(api,id){
    var rule = new schedule.RecurrenceRule();
    rule.date = 1;
    rule.hour = 16;
    
     
    var j = schedule.scheduleJob(rule, function(){
        currentIndex = currentIndex+1;
        if(currentIndex>order.length-1){
            currentIndex = 0;
        }
        const sendMsg  = "Chegou o dia primeiro do mês. O responsável pelo pagamento agora é "+order[currentIndex].toUpperCase();
        api.sendMessage(sendMsg, id);
    });
}