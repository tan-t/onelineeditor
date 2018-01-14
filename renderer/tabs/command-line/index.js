require('./favorites');
const favoriteDao = require('../../dao-factory').getFavoriteDao();
const uuidv1 = require('uuid/v1');

Vue.component('command-line',{
  template:`
<div class="modal" id="command-line" role="dialog" aria-hidden="true" data-show="true"> 
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
          <button type="button" class="btn btn-default" @click="onClickFavoriteBtn">★</button>
        </div>
    <div class="panel-group">
    <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
    <h4 class="panel-title">
      <a role="button" data-toggle="collapse" data-parent="#accordion" href="#favorite" aria-expanded="true" aria-controls="favorite">
        favorites
      </a>
    </h4>
    </div>
    <div class="collapse in" id="favorite">
     
      <div class="well">
        <favorite :favorites="favorites" @clickFavorite="onSelectFavorite" @deleteFavorite="onDeleteFavorite"></favorite>
      </div>
    </div>
    </div>
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
      onClickFavoriteBtn(){
        var item = {command:$('#command').val(),id:uuidv1()};
        favoriteDao.insert(item);
        favoriteDao.commit();
        this.favorites.push(item);
      },
      onDeleteFavorite(e) {
        favoriteDao.delete(e);
        favoriteDao.commit();
        this.favorites.splice(this.favorites.findIndex(f=>f.id == e),1);
      },
      onSelectFavorite(e) {
        $('#command').val(e);
      }
  },
  data() {
    return {
      favorites:favoriteDao.selectAll()
    }
  }
});

OneLineEditor.CommandLine = {};

OneLineEditor.CommandLine.EventType = {
  ENTER:'enter',
  CLOSE:'close',
  FAVORITE:'favorite'
}
