OneLineEditor.Sort = function(option){
  option = option || {};
  var splitter = OneLineEditor.Sort.getArg(option,'splittingBy') || OneLineEditor.Sort.DefaultOption.splittingBy;
  var desc = OneLineEditor.Sort.getArg(option,'desc') || OneLineEditor.Sort.DefaultOption.desc;
  return function(arg){
    return desc ? arg.split(splitter).sort().reverse().join(splitter) : arg.split(splitter).sort().join(splitter);
  };
};

OneLineEditor.Sort.DefaultOption = {
  splittingBy:'\n',
  desc:false
}

OneLineEditor.Sort.Shorthand = {
  'splittingBy':'s',
  'desc':'d'
};

OneLineEditor.Sort.getArg = function(option,name) {
  return option[name] || option[OneLineEditor.Sort.Shorthand[name]];
}

OneLineEditor.Interpreter.register('sort',OneLineEditor.Sort);

OneLineEditor.Help.register('sort',{
  'commandHelp' : '指定した文字列で分割したのち要素をソートし、再度結合した値を返します。',
  'argHelps':[
    {arg:'splitting-by',required:false,help:'分割する文字列を指定してください。デフォルトは改行記号です。',shorthand:'s'},
    {arg:'desc',required:false,help:'降順の場合指定してください。デフォルトは昇順です。',shorthand:'d'},
  ]
})