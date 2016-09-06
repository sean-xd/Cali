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
    cla(dom.bgs[bgPosition++], dir);
    clr(dom.bgs[bgPosition], ["left", "right", "up", "down", "hide"]);
    cla(dom.bgs[bgPosition], "center", 1);
    if(next) nextStep();
  }
}

function hideBackground(){
  return () => {
    cla(dom.bgs[bgPosition], "hide");
    nextStep();
  }
}
