Vue.component('command-line',{
  template:`<div class="modal" id="command-line" role="dialog" aria-hidden="true" data-show="true"> 
  <div class="modal-dialog"> 
    <div class="modal-content"> 
      <div class="modal-body"> 
        <form class="form"> 
          <div class="form-group" :class="{'has-error':haserror}"> 
          <input type="text" class="form-control" id="command" name="command" :value="command" @keydown.enter="onEnter" @keydown.ctrl.80="onCtrlP"> 
            <span class="help-block">{{error}}</span> 
          </div> 
        </form>
        <div class="btn-group">
          <button type="button" class="btn btn-default" @click="onClickFavorite">add to favorite</button>
        </div>
      </div> 
    </div> <!-- /.modal-content --> 
  </div> <!-- /.modal-dialog --> 
</div> <!-- /.modal -->
`
,
    props:['haserror','error','command'],
    methods:{
      onEnter:function(e){
        this.$emit(OneLineEditor.CommandLine.EventType.ENTER,$(e.target).val());
        e.stopPropagation();
        e.preventDefault();
      },
      onCtrlP:function(e){
        this.$emit(OneLineEditor.CommandLine.EventType.CLOSE);
      },
      onClickFavorite(){
        this.$emit(OneLineEditor.CommandLine.EventType.FAVORITE,$('#command').val()); 
      }
  }
});

OneLineEditor.CommandLine = {};

OneLineEditor.CommandLine.EventType = {
  ENTER:'enter',
  CLOSE:'close',
  FAVORITE:'favorite'
}
