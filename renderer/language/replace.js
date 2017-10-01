OneLineEditor.Replace = function(option){
  var pattern = option.pattern;
  if(!pattern){
    return {'error':'replace command should have pattern argument.'};
  }

  var replacement = option.replacement;
  if(!replacement){
    return {'error':'replace command should have replacement argument.'};
  }


  var joiner = option.joiningBy || OneLineEditor.Match.DefaultOption.joiningBy;

  return function(arg){
    return arg.replace(new RegExp(pattern,'g'),replacement);
  };
};

OneLineEditor.Replace.DefaultArgName = 'pattern';

OneLineEditor.Interpreter.register('replace',OneLineEditor.Replace);
