OneLineEditor.Match = function(option){
  var pattern = option.pattern;
  if(!pattern){
    return {'error':'match command should have pattern argument.'};
  }

  var joiner = option.joiningBy || OneLineEditor.Match.DefaultOption.joiningBy;

  return function(arg){
    return arg.match(new RegExp(pattern,'g')).join(joiner);
  };
};

OneLineEditor.Match.DefaultOption = {
  joiningBy:'\n'
}

OneLineEditor.Match.DefaultArgName = 'pattern';

OneLineEditor.Interpreter.register('match',OneLineEditor.Match);
