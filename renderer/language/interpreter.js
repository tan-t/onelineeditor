OneLineEditor.Interpreter = function(command){
  this.command_ = command;
  this.commands_ = this.findVerb_(this.splitPipeLine_());
//   console.log(this);
};

OneLineEditor.Interpreter.prototype.output = function () {
  var chainable = new OneLineEditor.ChainableFunction();
  this.commands_.forEach(f=>{
    chainable.then(f);
  });
  return chainable;
};

OneLineEditor.Interpreter.prototype.splitPipeLine_ = function () {
  var pipeLines = this.command_.split(' | ');
//   console.log(pipeLines);
  return pipeLines;
};

OneLineEditor.Interpreter.prototype.findVerb_ = function (pipeLines) {
  return pipeLines.map((pipeLine,i)=>{
    var inputs = pipeLine.split(/\s/);
//     console.log({inputs});
//     console.log(Object.keys(OneLineEditor.Interpreter.Verbs));
    var verbName = Object.keys(OneLineEditor.Interpreter.Verbs).find(key=>{
      return inputs[0] == key;
    });
    if(!verbName){
      console.error('error!');
      return {'error':`no verb in pipeLine No.${i}`};
    }
    var verb = OneLineEditor.Interpreter.Verbs[verbName];
    var defaultArgName = verb.DefaultArgName;

    var args = {};
    var errorFlg = false;

    var currentSwitch;
    inputs.splice(1).forEach((input,argInx)=>{
      if(errorFlg){
        return;
      }
//       console.log({currentSwitch});
      if(!currentSwitch){
        var swArg = input.match(/--((\w|-)+)/);
//         console.log({swArg});
        if(swArg){
          currentSwitch = swArg[1].replace(/-./g,function(s){return s.charAt(1).toUpperCase();});
          return;
        }

        // 最初の引数だけデフォルト想定をかます。
        if(argInx == 0){
          currentSwitch = defaultArgName;
        } else {
          errorFlg = true;
          return;
        }

      }
//       console.log({currentSwitch});
      var arg = input;
      args[currentSwitch] = arg;
      currentSwitch = null;
    });
//     console.log(args);
    return verb(args);
  });
};


OneLineEditor.Interpreter.Verbs = {};

OneLineEditor.Interpreter.register = function(verb,f){
  OneLineEditor.Interpreter.Verbs[verb] = f;
};
