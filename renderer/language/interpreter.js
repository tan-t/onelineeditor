OneLineEditor.Interpreter = function(command){
  this.command_ = command;
  // this.commands_ = this.findVerb_(this.splitPipeLine_());
  this.commands_ = this.createCommands_();
//   console.log(this);
};

OneLineEditor.Interpreter.prototype.output = function () {
  var chainable = new OneLineEditor.ChainableFunction();
  this.commands_.forEach(f=>{
    chainable.then(f);
  });
  return chainable;
};

OneLineEditor.Interpreter.prototype.createCommands_ = function() {
  var commands = [];
  while(this.command_.length > 0) {
    var result = this.findVerbFromIndex_();
    commands.push(result);
    if(result.error) {
      return commands;
    }
  }
  return commands;
};

OneLineEditor.Interpreter.prototype.findVerbFromIndex_ = function() {
  var command = this.command_.trim();
  var i = 0;
  for(i;i<command.length;i++) {
    if(command[i] == ' ' || command[i] == '|'){
      break;
    }
  }
  var verbName = command.slice(0,i+1).trim();
  
  if(!Object.keys(OneLineEditor.Interpreter.Verbs).some(key=>{return verbName == key;})){
    console.error('error!');
    return {'error':`${verbName} is not available.`};
  }

  console.log({verbName});
  
  var verb = OneLineEditor.Interpreter.Verbs[verbName];
  var args = {};

  var input = command.slice(i+1).trim();
  var argIndex = 0;
  console.log({input});
  for(argIndex;argIndex < input.length; argIndex++) {
    if(input[argIndex] === '|') {
      this.command_ = input.slice(argIndex + 1,input.length);
      console.log({args});
      return verb(args);
    }
    if(input[argIndex] === '-') {
      try{
      var arg = this.getArg_(input.slice(argIndex,input.length));
      } catch(error) {
        return error;
      }
      argIndex += arg.index;
      args[arg.key] = arg.value || true;
      continue;
    }
  }
  // line end
  this.command_ = '';
  console.log({args});
  return verb(args);
};

OneLineEditor.Interpreter.prototype.getArg_ = function(input) {
  var argKeyMatch = input.match(/-[-]*((\w|-)+)/);
  if(!argKeyMatch) {
    throw {error:'arg is illegal.'};
  }

  var argKey = argKeyMatch[1].replace(/-./g,function(s){return s.charAt(1).toUpperCase();});

  var index = 0;
  var argBody = '';
  var argBodyMode = false;
  var openQuote = false;
  var bodyFrom = 0;
  for(index;index < input.length; index++){
    if(!argBodyMode){
      if(input[index] == '=') {
        argBodyMode = true;
      }
      continue;
    }
     if(!openQuote){
        if (input[index] == '"') {
          openQuote = true;
          bodyFrom = index + 1;
        }
        continue;
     }
     
     if(input[index] == '"'){
       if(input[index - 1] != '\\'){
         var arg = {key:argKey,value:input.slice(bodyFrom,index),index};
         console.log(arg);
         return arg;
       }
     }
    
  }
  return {key:argKey,index};
}



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


