OneLineEditor.Uniq = function(option){
  var splitter = option.splittingBy || OneLineEditor.Uniq.DefaultOption.splittingBy;
  return function(arg){
    return arg.split(splitter).filter((s,i,a)=>{
      return a.indexOf(s) == i;
    }).join(splitter);
  };
};

OneLineEditor.Uniq.DefaultOption = {
  splittingBy:'\n'
}


OneLineEditor.Interpreter.register('uniq',OneLineEditor.Uniq);
