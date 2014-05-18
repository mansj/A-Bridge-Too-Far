window.onload = init;
var context;
var bufferLoader;
var bufferList1;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '/audio/synthesizer02.wav',
      '/audio/synthesizer23.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];
  
  bufferList1 = bufferList;

  source1.connect(context.destination);
  source2.connect(context.destination);
//  source1.start(0);
//  source2.start(0);
}

function playSound(sound, rate) {
  var source1 = context.createBufferSource();
  source1.buffer = bufferList1[sound];
  source1.connect(context.destination);
  source1.playbackRate.value = rate/100;


	source1.start(0);
}
