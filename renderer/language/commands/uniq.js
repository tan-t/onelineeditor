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

OneLineEditor.Help.register('uniq',{
  'commandHelp' : '指定した文字列で分割したのち重複する要素を除去し、再度結合した値を返します。',
  'argHelps':[
    {arg:'splitting-by',required:false,help:'分割する文字列を指定してください。デフォルトは改行記号です。',shorthand:'s'},
  ]
})