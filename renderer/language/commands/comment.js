OneLineEditor.Comment = function(option){
    return function(arg){
      return arg;
    };
  };
  
  OneLineEditor.Interpreter.register('#',OneLineEditor.Comment);
  