// Tabs

$(document).ready(function(){
  
  $('.tabs ul li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.tabs ul li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })

})