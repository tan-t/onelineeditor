OneLineEditor.Replace = function(option){
  var pattern = OneLineEditor.Replace.getArg(option,'pattern');
  if(!pattern){
    return {'error':'replace command should have pattern argument.'};
  }

  var replacement = OneLineEditor.Replace.getArg(option,'with');
  if(!replacement){
    return {'error':'replace command should have with argument.'};
  }

  return function(arg){
    return arg.replace(new RegExp(pattern,'g'),replacement);
  };
};

// OneLineEditor.Replace.DefaultArgName = 'pattern';

OneLineEditor.Replace.Shorthand = {
  'with':'w',
  'pattern':'p'
};

OneLineEditor.Replace.getArg = function(option,name) {
  return option[name] || option[OneLineEditor.Replace.Shorthand[name]];
}

OneLineEditor.Interpreter.register('replace',OneLineEditor.Replace);

OneLineEditor.Help.register('replace',{
  'commandHelp' : '正規表現にマッチした文字列を置換します。javascriptのString::replaceを参照のこと。',
  'argHelps':[
    {arg:'pattern',required:true,help:'マッチさせる正規表現を指定してください。',shorthand:'p'},
    {arg:'with',required:true,help:'置換先を指定してください。$nが使用できます。',shorthand:'w'},
  ]
})