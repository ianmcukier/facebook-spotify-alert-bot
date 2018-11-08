const conta = require("../commands/conta");
const help = require("../commands/help");
const order = require("../commands/ordem");
const rodada = require("../commands/rodada");
const padrao = require("../commands/default");



const _COMMANDS = {
    HELP:"help",
    BANKACCOUT:"conta",
    ORDER:"ordem",
    PAYER:"rodada",
    FUNCTIONS:{
        CONTA:conta,
        HELP:help,
        ORDER:order,
        RODADA:rodada,
        DEFAULT:padrao
    }
}

module.exports = _COMMANDS;