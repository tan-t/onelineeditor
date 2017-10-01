Vue.component('search-area',{
  template:'<div class="search-area">' +
    '<form class="form">' +
    '<div class="form-group">' +
    '    <input type="text" class="form-control" id="query" name="query" :value="query" @input="onInput">' +
    '</div>' +
    '<div class="form-group">' +
    '<div class="input-group">' +
    '    <input type="text" class="form-control" id="replacement" name="replacement">' +
    '<span class="input-group-btn">' +
    '  <button class="btn btn-secondary" type="button" @click="onClickReplaceAll">Replace All</button>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '</form>' +
    '</div>',
    props:['query'],
    methods:{
      onInput:function(e){
      this.$emit(OneLineEditor.SearchArea.EventType.SEARCH,$(e.target).val());
      },
      onClickReplaceAll:function(e){
        this.$emit(OneLineEditor.SearchArea.EventType.REPLACE_ALL,{query:this.query,replacement:$(e.target).parents('.input-group').find('input').val()});
      }
  }
});

OneLineEditor.SearchArea = {};
OneLineEditor.SearchArea.EventType={
  SEARCH : 'search',
  REPLACE_ALL:'replaceall'
}
