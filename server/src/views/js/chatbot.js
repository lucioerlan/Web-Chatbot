

function perguntar() {
  const Input = document.getElementById('input');
  const question = Input.value.toString().trim();

  const msg = document.getElementById('msg');

  let msgLines = msg.innerHTML;
  msgLines = msgLines.replace('<a href="#" id="end">', '');

  const http = new XMLHttpRequest();
  http.open('GET', `/get-all-chatbot?input=${question}&activate=1`, true);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      const objJSON = JSON.parse(http.responseText);

      const input = objJSON.message[0].input.toString().trim();
      const output = objJSON.message[0].output.toString().trim();

      const speech = new SpeechSynthesisUtterance(output);

      speech.lang = 'pt-PT';
      window.speechSynthesis.speak(speech);

      msgLines += `
          <div class="talk-bubble tri-right right-top" 
               style="width: 70%; margin-right: 20px; background-color: #108CF3;">
            <div class="talktext">
              <p>${input}</p>
            </div>
          </div>

          
          <div class="talk-bubble tri-right left-top" 
               style="width: 90%; color: #808080; background-color: #eeeeee;">
            <div class="talktext">
              <img src="img/mix-bot.png" alt="" width="42" height="42">
                ${output}
            </div>
          </div>

          <a href="#" id="end">
             `;
      document.getElementById('input').value = '';
      msg.innerHTML = msgLines;
      window.location.href = '#end';
      document.getElementById('input').focus();
    }
  };

  http.send();
}
