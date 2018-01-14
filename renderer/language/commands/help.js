OneLineEditor.Help.func = function(option){
    return function(arg){
      return OneLineEditor.Help.HelpMessage;
    };
};

  OneLineEditor.Help.DefaultOption = {
    
  }

  OneLineEditor.Interpreter.register('help',OneLineEditor.Help.func);
  