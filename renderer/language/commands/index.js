const fs = require('fs');
const path = require('path');
var files = fs.readdirSync(__dirname);

OneLineEditor.Help = {};
OneLineEditor.Help.HelpMessage = '';

OneLineEditor.Help.register = function(command,help) {
OneLineEditor.Help.HelpMessage += `${command} : ${help.commandHelp}
\targuments : [
\t\t${help.argHelps.map(h=>{return h.arg + (h.required ? '[必須]' : '') + (h.shortHand ? '[短縮形]' + h.shortHand : '') +  ' : ' + h.help;}).join('\n\t\t')}
\t]

`;
}

files.filter(file=>file != 'index.js').forEach(file=>{
    require(path.resolve(__dirname,file));
});

