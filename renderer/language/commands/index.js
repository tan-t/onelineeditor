const fs = require('fs');
const path = require('path');
var files = fs.readdirSync(__dirname);

files.filter(file=>file != 'index.js').forEach(file=>{
    require(path.resolve(__dirname,file));
});

OneLineEditor.Help.HelpMessage = '';