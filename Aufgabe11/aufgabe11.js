var context = new AudioContext(),
analyser = context.createAnalyser();

analyser.fftSize = 2048;

navigator.mediaDevices.getUserMedia({ audio: true, video: false})
.then(function(stream) {
    var liveInput = context.createMediaStreamSource(stream);
    liveInput.connect(analyser);
});

var array;
window.setInterval(function() {

    document.getElementById("gain").textContent = getAverageVolume(array);

    //console.log("ich schreibe alle 1000 ms = jede Sekunde yeah!")
}, 100);

setInterval(function(){
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    // jetzt haben wir ein array mit den Frequenzdaten
}, 75);

function getAverageVolume(array) {
    var values = 0;
    
    for (var i = 0; i < array.length; i++)
        values += array[i];
    
    return values / array.length;
}