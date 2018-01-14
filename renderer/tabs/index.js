require('./search-area/index.js');
require('./command-line/index.js');
OneLineEditor.Tabs= new Vue({
  el:'#tab',
  data:{tabs:[{name:'untitled',main:'',isActive:true,id:1}],query:'',command:'',commandHasError:false,commandErrors:''},
  methods:{
    onClick:function(e){
      OneLineEditor.Tabs.activateClicked(this.tabs,$(e.target).data('id'));
    },
    onCtrlF:function(e){
      var selection = OneLineEditor.Tabs.getSelection(e);
      this.query=selection;
      $(this.$el).find('textarea').highlightWithinTextarea({
        highlight: this.query
      });
      $('.search-area').find('#query').focus();
    },
    onSearch:function(e){
      this.query = e;
      var highlight = this.query;
      if(this.query && this.query.length > 0){
        highlight = new RegExp(this.query);
      }
      $(this.$el).find('textarea').highlightWithinTextarea({
        highlight
      });
    },
    onReplaceAll:function(e){
      let activeTab = OneLineEditor.Tabs.findActive(this.tabs);
      activeTab.main = activeTab.main.replace(new RegExp(e.query,'g'),e.replacement);
      $(this.$el).find('textarea').highlightWithinTextarea({
        highlight: this.query
      });
    },
    onEnterCommand:function(e){
      this.command = e;
      this.commandHasError = false;
      this.commandErrors = '';
      var c = new OneLineEditor.Interpreter(this.command).output();
      var errors = c.validate();
      if(errors){
        this.commandHasError = true;
        this.commandErrors = errors.map(error=>error.error).join(';');
        return;
      }
      var output = c.exec(OneLineEditor.Tabs.findActive(this.tabs).main);
      var newTab = {name:'untitled',main:output,id:String(Date.now())};
      this.tabs.push(newTab);
      OneLineEditor.Tabs.activateClicked(this.tabs,newTab.id);

      setTimeout(()=>{
        OneLineEditor.Tabs.focusActive($(this.$el),this.tabs);
      },10);
    },
    onCtrlP:function(e){
      var $modal = $(this.$el).find('#command-line');
      if($modal.hasClass('in')){
        $modal.modal('hide');
        OneLineEditor.Tabs.focusActive($(this.$el),this.tabs);
      } else {
        $modal.one('shown.bs.modal',function(e){
          $modal.find('input').focus();
        });
        $modal.modal();
      }
    },
    onCtrlTab:function(e){
      var backward = e.shiftKey;
      var activeTabIndex = this.tabs.findIndex(tab=>tab.isActive);
      var nextActiveTabIndex = backward ? activeTabIndex - 1 : activeTabIndex + 1;

      if(this.tabs.length<=nextActiveTabIndex){
        nextActiveTabIndex = 0;
      } else if (nextActiveTabIndex < 0){
        nextActiveTabIndex = this.tabs.length -1;
      }

      OneLineEditor.Tabs.activateClicked(this.tabs,this.tabs[nextActiveTabIndex].id);
      setTimeout(()=>{
      OneLineEditor.Tabs.focusActive($(this.$el),this.tabs);
    },10);
  },
  onCtrlT:function(e){
    var newTab = {name:'untitled',main:'',id:String(Date.now())};
    this.tabs.push(newTab);
    OneLineEditor.Tabs.activateClicked(this.tabs,newTab.id);
    setTimeout(()=>{
      OneLineEditor.Tabs.focusActive($(this.$el),this.tabs);
    },10);
},
  }
});

OneLineEditor.Tabs.focusActive = function($el,tabs){
  $el.find(`textarea[data-id="${OneLineEditor.Tabs.findActive(tabs).id}"]`).focus();
}

OneLineEditor.Tabs.findActive = function(tabs){
  return tabs.find(tab=>tab.isActive);
}


OneLineEditor.Tabs.findTarget = function(tabs,e){
  let id = $(e.target).data('id');
  return tabs.find(tab=>tab.id == id);
}

OneLineEditor.Tabs.activateClicked = function(tabs,id){
  for(tab of tabs){
    if(tab.id == id){
      tab.isActive = true;
      continue;
    }
    tab.isActive = false;
  }
}

OneLineEditor.Tabs.getSelection = function(e){
  var range = {start:e.target.selectionStart,end:e.target.selectionEnd};
  var text = $(e.target).val();
  var selection = text.slice(range.start,range.end);
  return selection;
}
