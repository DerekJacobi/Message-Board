$(function() {
    $('button.expand').on('click', function(){
      $(this).parent().toggleClass("open");
      if ($(this).parent().hasClass("open")){
        $(this).first().html('Collapse')
      } else {
        $(this).first().html('Expand')
      };
    });

    var $vote = $('.votes');

    $('#up-vote').on('click', function(){
      $vote.html((Number($vote.html()) + 1));
    });
    $('#down-vote').on('click', function(){
      $vote.html((Number($vote.html()) - 1));
    });

});
