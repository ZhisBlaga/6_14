const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss=0;
let firstHitTime = 0;

function round() {
  let miss  = document.getElementsByClassName("miss");
  $(miss).removeClass("miss");
  let oldTarget = document.getElementsByClassName("target");
  $(oldTarget).text("");
  $(oldTarget).removeClass("target");
 
  let divSelector = randomDivId();
  
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  

  if (hits==0){
    firstHitTime = getTimestamp();
  }



  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("div.game_row").remove();
  console.log(firstHitTime);
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score").text(hits-miss);
  $("#miss").text(miss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits++;
    round();
  }
  else{
    $(event.target).addClass("miss");
    miss++;
  }
  
}

function init() {
  $("#button-start").click(function() {
    $("div.game_row").css({'display':'flex'});
    $("#button-start").css({'display':'none'});
    $("#button-reload").css({'display':'flex'});

    round();
  });

  

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();

  });
}

$(document).ready(init);
