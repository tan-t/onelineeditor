OneLineEditor.Comment = function(option){
    return function(arg){
      return arg;
    };
  };
  
  OneLineEditor.Interpreter.register('#',OneLineEditor.Comment);
  
  OneLineEditor.Help.register('#',{
    'commandHelp' : 'コメントをパイプラインに記入します。内部的には、入力をそのまま出力にパイプします。\n主に、お気に入り内を管理するためにタグ的に入れる用法を想定しています。',
    'argHelps':[
    ]
  })