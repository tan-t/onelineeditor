OneLineEditor.Sort = function(option){
  option = option || {};
  var splitter = option.splittingBy || OneLineEditor.Sort.DefaultOption.splittingBy;
  var desc = option.desc || OneLineEditor.Sort.DefaultOption.desc;
  return function(arg){
    return desc ? arg.split(splitter).sort().reverse().join(splitter) : arg.split(splitter).sort().join(splitter);
  };
};

OneLineEditor.Sort.DefaultOption = {
  splittingBy:'\n',
  desc:false
}

OneLineEditor.Interpreter.register('sort',OneLineEditor.Sort);
