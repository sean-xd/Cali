// Backgrounds
dom.background = el("backgrounds");
dom.bgs = [el("bg0")];

function addBackground(src, startDir){
  var bg = t("img", {src, className: `bg${dom.bgs.length} bg ${startDir || ""}`})();
  dom.bgs.push(bg);
  dom.background.appendChild(bg);
}

function background(dir, next){
  return () => {
    if(dom.bgs[bgPosition]) cla(dom.bgs[bgPosition], dir);
    bgPosition++;
    if(dom.bgs[bgPosition]){
      clr(dom.bgs[bgPosition], ["left", "right", "up", "down", "hide"]);
      cla(dom.bgs[bgPosition], "center", 1);
    }
    if(next) nextStep();
  }
}

function hideBackground(){
  cla(dom.bgs[bgPosition], "hide");
  nextStep();
}
