// Main
var ls = localStorage,
  dom = {},
  intervals = {},
  chapters = {},
  script = [],
  isLocked = false,
  bgPosition = 0;

function nextStep(x){
  if(script.length && !isLocked) script.shift()(x);
}

function setScript(key){
  script = script.concat(chapters[key]);
  nextStep();
}

// tokenLogin();
