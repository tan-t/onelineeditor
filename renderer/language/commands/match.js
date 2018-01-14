OneLineEditor.Match = function(option){
  var withArg = OneLineEditor.Match.getArg(option,'with');
  if(!withArg){
    return {'error':'match command should have with argument.'};
  }

  var joiner =  OneLineEditor.Match.getArg(option,'joiningBy') || OneLineEditor.Match.DefaultOption.joiningBy;

  return function(arg){
    return arg.match(new RegExp(withArg,'g')).join(joiner);
  };
};

OneLineEditor.Match.DefaultOption = {
  joiningBy:'\n'
}

OneLineEditor.Match.Shorthand = {
  'with':'w',
  'joiningBy':'j'
};

OneLineEditor.Match.getArg = function(option,name) {
  return option[name] || option[OneLineEditor.Match.Shorthand[name]];
}

OneLineEditor.Interpreter.register('match',OneLineEditor.Match);

OneLineEditor.Help.register('match',{
  'commandHelp' : '正規表現にマッチした文字列だけを抽出します。javascriptのString::matchを参照のこと。',
  'argHelps':[
    {arg:'with',required:true,help:'マッチさせる正規表現を指定してください。',shorthand:'w'},
    {arg:'joining-by',required:false,help:'抽出した文字列を結合する文字列を指定してください。デフォルトは改行記号です。',shorthand:'j'}
  ]
})