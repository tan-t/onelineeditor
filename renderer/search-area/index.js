SearchArea = function(){
  this.$element_;
  this.$input_;
};

SearchArea.prototype.enterDocument = function($elem){
  this.$element_ = $elem;
  this.$input_ = this.$element_.find(SearchArea.Input.QUERY);
  this.bindEvents_();
};

SearchArea.prototype.bindEvents_ = function(){
  this.$element_.on('keydown',this.onKeyDown_.bind(this));
};



SearchArea.Input = {
  QUERY:'.query'
};

SearchArea.EventType = {
  SEARCH:'search'
};
