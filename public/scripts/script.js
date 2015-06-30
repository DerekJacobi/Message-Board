$(function() {
    console.log( "ready!" );
    $('button.expand').on('click', function(){
      $(this).parent().toggleClass("open");
    });

    var $vote = $('.votes');

    $('#up-vote').on('click', function(){
      $vote.html((Number($vote.html()) + 1));
    });
    $('#down-vote').on('click', function(){
      $vote.html((Number($vote.html()) - 1));
    });

});
