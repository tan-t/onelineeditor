Vue.component('favorite',{
    template:`
<ul class="list-group">
  <li class="list-group-item" v-for="favorite of favorites">
    <div class="favorite-list-item">
      <a href="#" @click="onClick" :data-command="favorite.command" class="list-group-item">{{favorite.command}}</a>
      <button class="btn btn-danger" @click="onDelete" :data-id="favorite.id">delete</button>
    </div>
  </li>
</ul>
`
  ,
      props:['favorites'],
      methods:{
        onClick(e){
          this.$emit(OneLineEditor.Favorites.EventType.CLICK,$(e.currentTarget).data('command'));
        },
        onDelete(e){
          this.$emit(OneLineEditor.Favorites.EventType.DELETE,$(e.currentTarget).data('id'));
        }
      }

  });
  
  OneLineEditor.Favorites = {};
  
  OneLineEditor.Favorites.EventType = {
    CLICK:'clickFavorite',
    DELETE:'deleteFavorite'
  }
  