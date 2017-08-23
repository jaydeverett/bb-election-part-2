document.addEventListener("DOMContentLoaded", function() {

  var candidates = document.getElementById('candidates');

  $.ajax( {
  url: 'https://bb-election-api.herokuapp.com/',
  method: 'GET',
  dataType: 'json'

  } ).done( function( data ) {
      console.log("request succeeded");
      console.log(data);

      for (var i = 0; i < data.candidates.length; i++) {

      var name = data.candidates[i].name
      var votes = data.candidates[i].votes

      var myElement = document.createElement( 'div');
      myElement.innerHTML = name + ': ' + votes;
      candidates.append( myElement );

      var form = document.createElement('form');
      myElement.append( form );

      var hidden = document.createElement('input')
      hidden.type = 'hidden';
      hidden.value = name;
      form.appendChild(hidden);


      var button = document.createElement('input');
      button.type = 'submit';
      button.value = 'vote';
      form.append( button )

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        $.ajax( {
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          dataType: 'json',
          data: { name: this.childNodes[0].value }
        }).done( function (data) {
          console.log('request succeeded');
          // 
          // var voteExtra = this.childNodes.votes + 1;
          // var newVote = document.querySelector(voteExtra);
        })

      })



      }
    })

  })
  // Imagination!
