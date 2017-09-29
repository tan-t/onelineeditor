ShortCutKeyHandler = function(){
  this.keyMap_ = {};
  this.$element_;
}

ShortCutKeyHandler.prototype.add = function(pattern,f){
  pattern = pattern.toUpperCase().replace(/\s/g,'');

  var handlers = this.keyMap_[pattern];
  if(!handlers){
      handlers = [];
      this.keyMap_[pattern] = handlers;
  }
  handlers.push(f);
};

ShortCutKeyHandler.prototype.onKeyDown_ = function(e){
  var key = this.toKeyString_(e);
  var handlers = this.keyMap_[key];
  if(handlers){
    handlers.forEach(f=>{
      f(e);
    });
  }
};

ShortCutKeyHandler.prototype.toKeyString_ = function(e){
  var key = '';
  if(e.ctrlKey){
    key += this.getPlus_(key);
    key += ShortCutKeyHandler.Keys.CTRL;
  }

  if(e.altKey){
    key += this.getPlus_(key);
    key += ShortCutKeyHandler.Keys.ALT;
  }

  if(e.shiftKey){
    key += this.getPlus_(key);
    key += ShortCutKeyHandler.Keys.SHIFT;
  }
  var alphabetKey = ShortCutKeyHandler.Keys[e.keyCode];
  if(alphabetKey){
    key += this.getPlus_(key);
    key += alphabetKey;
  }
  return key;
};

ShortCutKeyHandler.Keys = {
  CTRL : 'ctrl',
  ALT:'alt',
  SHIFT:'shift',
  49:"1",
50:"2",
51:"3",
52:"4",
53:"5",
54:"6",
55:"7",
56:"8",
57:"9",
48:"0",
65:"A",
66:"B",
67:"C",
68:"D",
69:"E",
70:"F",
71:"G",
72:"H",
73:"I",
74:"J",
75:"K",
76:"L",
77:"M",
78:"N",
79:"O",
80:"P",
81:"Q",
82:"R",
83:"S",
84:"T",
85:"U",
86:"V",
87:"W",
88:"X",
89:"Y",
90:"Z"
}

ShortCutKeyHandler.prototype.getPlus_ = function(key){
  return key.length > 0 ? '+' : '';
};

ShortCutKeyHandler.prototype.enterDocument = function($el){
  this.$element_ = $el;
  this.$element_.on('keydown',this.onKeyDown_.bind(this));
};
