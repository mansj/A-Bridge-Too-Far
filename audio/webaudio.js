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
      '/audio/floater_loop.mp3',
      '/audio/floater_1.mp3',
      '/audio/floater_2.mp3',
      '/audio/floater_3.mp3'
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  var source3 = context.createBufferSource();
  var source4 = context.createBufferSource();
  
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];
  source3.buffer = bufferList[2];
  source4.buffer = bufferList[3];
  
  bufferList1 = bufferList;

  source1.connect(context.destination);
  source2.connect(context.destination);
  source3.connect(context.destination);
  source4.connect(context.destination);
}

function playSound(sound, rate) {
  var source1 = context.createBufferSource();
  source1.buffer = bufferList1[sound];
  source1.connect(context.destination);
  source1.playbackRate.value = rate/120;


	source1.start(0);
}
