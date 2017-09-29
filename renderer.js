$('#todo').highlightWithinTextarea({
    highlight: /\d/gi
});

require('./renderer/short-cut-key/index.js');

var mainHandler = new ShortCutKeyHandler();
mainHandler.enterDocument($('#todo'));

mainHandler.add(`${ShortCutKeyHandler.Keys.CTRL} + F`,function(){
  console.log('ctrl+F');
});
