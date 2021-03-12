(() => {

})();

function startDictation1() {
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
      console.log(1);
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.start();
      recognition.onresult = function(e) {
          console.log(2);
          document.getElementById('inputTagName').value = e.results[0][0].transcript;
          recognition.stop();
      };
      recognition.onerror = function(e) {
          recognition.stop();
      }
  }
}

function startDictation2() {
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.start();
      recognition.onresult = function(e) {
          document.getElementById('inputTagActived').value = e.results[0][0].transcript;
          recognition.stop();
      };
      recognition.onerror = function(e) {
          recognition.stop();
      }
  }
}