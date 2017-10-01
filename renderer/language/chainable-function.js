OneLineEditor.ChainableFunction = function(){
  this.chain_ = [];
};

OneLineEditor.ChainableFunction.prototype.then = function (f) {
  this.chain_.push(f);
  return this;
};

OneLineEditor.ChainableFunction.prototype.validate = function(){
  var errors = this.chain_.filter(f=>{
    return !$.isFunction(f);
  });
  if(errors.length>0){
    return errors;
  }
  return false;
};

OneLineEditor.ChainableFunction.prototype.exec = function(arg){
  var newArg = arg;
  for(var f of this.chain_){
    var newArg = f(newArg);
  }
  return newArg;
};
