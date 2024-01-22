document.addEventListener('DOMContentLoaded', function() {
  var audioButtons = document.querySelectorAll('.audio');
  var currentAudio = null;

  audioButtons.forEach(function(button) {
    var audioElement = new Audio();
    var timeline = button.querySelector('.timeline');

    button.addEventListener('click', function() {
      var audioSrc = button.getAttribute('data-src');

      if (currentAudio && currentAudio.src === audioSrc) {
        if (currentAudio.paused) {
          currentAudio.play();
        } else {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          currentAudio = null;
        }
      } else {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        setAudioSource(audioSrc);
        togglePlayPause();
        currentAudio = audioElement;
      }
    });

    function setAudioSource(src) {
      audioElement.src = src;
      audioElement.load();

      audioElement.addEventListener('loadedmetadata', function() {
        timeline.max = audioElement.duration;
      });
    }

    function togglePlayPause() {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }

    audioElement.addEventListener('timeupdate', function() {
      timeline.value = audioElement.currentTime;
    });

    timeline.addEventListener('input', function() {
      audioElement.currentTime = timeline.value;
    });
  });
});


// PayPal Checkout

/*
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '15.00'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      // Voeg hier verdere acties toe na een succesvolle betaling
      alert('Betaling succesvol voltooid!');
    });
  }
}).render('#paypal-button-container');
*/