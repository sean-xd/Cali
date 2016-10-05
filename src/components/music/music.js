// Music
dom.music = el("music");
dom.volume = el("volume");
dom.music.volume = .5;

dom.volume.addEventListener("click", () => {
  var muting = dom.volume.textContent === "volume_up";
  dom.volume.textContent = muting ? "volume_off" : "volume_up";
  dom.music.volume = muting ? 0 : .5;
  dom.music[muting ? "pause" : "play"]();
});

window.addEventListener("message", e => {
  if(e.data === "stopMusic"){
    dom.music.pause();
    dom.music.currentTime = 0;
  }
  if(e.data === "playMusic") dom.music.play();
}, false);

function music(song){
  return () => {
    var pos = 0, swap = 0;
    if(dom.volume.textContent === "volume_up"){
      var musicInterval = setInterval(() => {
        dom.music.volume = swap ? pos / 10 : (10 - (5 + pos)) / 10;
        if(pos === 5){ // data.volume
          if(!swap){swap = 1; pos = 0; dom.music.src = `music/${song}.mp3`;}
          else clearInterval(musicInterval);
        }
        pos++;
      }, 150);
    }
    else dom.music.src = `music/${song}.mp3`;
    nextStep();
  }
}
