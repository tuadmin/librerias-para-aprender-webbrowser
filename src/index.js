const recordStart = document.getElementById('record-start');
const recordStop = document.getElementById('record-stop');
const previewRecord= document.getElementById('preview-record');
const reconocido = document.getElementById('reconocido');
const record = new webkitSpeechRecognition();

const optIntermResult = document.getElementById('opt-interimResults');
const optContinuos = document.getElementById('opt-continuos');
record.interimResults = optIntermResult.checked;
record.continuos = optContinuos.checked;
record.lang = 'es-ES';
record.onresult = (e) => {
    const results = e.results;
    console.log(e.results);
    const frase = results[results.length-1][0].transcript;
    previewRecord.append(document.createTextNode(" "));
    previewRecord.append(document.createTextNode(frase));
    reconocido.value +=frase;
};
record.onend= () => {
  reconocido.value +="\n";

  console.log("el microfono deja de escuchar");     
  if(recordStart.disabled){
    console.log("iniciamos nuevamente");
      record.start();
    }
    
};
record.onerror = (e) => {
    console.log(e.error);
    document.getElementById('error').innerHTML = e.error;
}
/*
record.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    console.log(e);
    previewRecord.innerText = transcript;
    reconocido.textContent =reconocido.textContent + transcript;
    if (e.results[0].isFinal) {
        record.stop();
        record.start();
    }
});/**/
recordStart.addEventListener('click', () => {
  recordStart.disabled=true;
  record.start();
});
recordStop.addEventListener('click', () => {
  recordStart.disabled=false;
  record.stop();
});

optIntermResult.addEventListener('change', () => {
  record.interimResults = optIntermResult.checked;
});

optContinuos.addEventListener('change', () => {
  record.continuos = optContinuos.checked;
}); 