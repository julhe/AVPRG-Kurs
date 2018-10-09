var context = new AudioContext();
var audio = new Audio("sound.wav");
var audioSource = context.createMediaElementSource(audio);
var delay = context.createDelay(4.0);

// audio -> delay -> pan -> gain -> context
delay.delayTime.value = 2.0;
audioSource.connect(delay);

var panner = context.createStereoPanner();
delay.connect(panner);

var gain = context.createGain();
gain.value = 0.5;

panner.connect(gain);
gain.connect(context.destination);