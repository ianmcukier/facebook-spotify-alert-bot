const COMMANDS = require('./bin/commands');
const CONFIG = require('./bin/config.json');
const schedule = require('node-schedule');
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
        if(err){
            console.log(err);  
        }else{
            if(message.threadID == ID)
                getFunctionCall(message.body,api)
        }
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
            COMMANDS.FUNCTIONS.HELP.getHelp(api,ID);
            break;
        case COMMANDS.BANKACCOUT:
            COMMANDS.FUNCTIONS.CONTA.getData(api,ID);
            break;
        case COMMANDS.ORDER:
            COMMANDS.FUNCTIONS.ORDER.getOrder(api,ID,order,currentIndex);
            break;
        case COMMANDS.PAYER:
            COMMANDS.FUNCTIONS.RODADA.getCurrentPayer(api,ID,order,currentIndex)
            break;
        default:
            COMMANDS.FUNCTIONS.DEFAULT.wrongFunctionCall(api,ID)
            break;
    }

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


function setScheduler(api,id){
    var rule = new schedule.RecurrenceRule();
    rule.date = 14;
    rule.hour = 12;
    rule.minute = 0;
     
    var j = schedule.scheduleJob(rule, function(){
        currentIndex = currentIndex+1;
        if(currentIndex>order.length-1){
            currentIndex = 0;
        }
        const sendMsg  = "Chegou o aquele dia do mês. O responsável pelo pagamento agora é "+order[currentIndex].toUpperCase()+". Não esqueça de realizar o pagamento";
        api.sendMessage(sendMsg, id);
    });
}