// Main
var ls = localStorage,
  dom = {},
  intervals = {},
  chapters = {},
  assets = {},
  script = [],
  isLocked = false,
  bgPosition = 0,
  user;

function nextStep(x){
  if(script.length && !isLocked) script.shift()(x);
}

function forceStep(x){
  isLocked = false;
  nextStep(x);
}

function setChapter(key){
  return () => {
    user.persona.chapter = key;
    nextStep();
  }
}

function setScript(key){
  while(dom.bgs.length > 1) dom.background.removeChild(dom.bgs.shift());
  dom.bgs[0].className = "bg0 bg center";
  bgPosition = 0;
  if(assets[key]){
    assets[key]();
    setTimeout(() => {
      script = script.concat(chapters[key]);
      nextStep();
    }, 0);
  }
  else {
    script = script.concat(chapters[key]);
    nextStep();
  }
}

tokenLogin();
