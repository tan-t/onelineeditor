var ipc = require('electron').ipcRenderer;

OneLineEditor.Favorite = function(option){
    return function(arg){
    ipc.send('asynchronous-message',{type:'favorite',favorite:option.fav});
      return arg;
    };
  };
  
  OneLineEditor.Favorite.DefaultOption = {
    joiningBy:'\n'
  }
  
  OneLineEditor.Favorite.DefaultArgName = 'fav';
  
  OneLineEditor.Interpreter.register('favorite',OneLineEditor.Favorite);
  