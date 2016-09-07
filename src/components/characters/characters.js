// Characters
dom.characters = {
  root: el("characters")
};
dom.characters.root.addEventListener("click", nextStep);

function addCharacter(name, src, dir){
  if(!dom.characters[name]){
    dom.characters[name] = t("img", {src, className: `character char-${dir} hide ${dir[0] != 'c' ? dir : ''}`})();
    dom.characters.root.appendChild(dom.characters[name]);
  }
  else {
    clr(dom.characters[name], ["char-left", "char-right"]);
    if(dir) cla(dom.characters[name], dir === "center" ? `char-${dir}` : [`char-${dir}`, dir]);
  }
}

function characterChange(name, dir, scale){
  return () => {
    clr(dom.characters[name], ["char-left", "char-right", "char-center", "left", "right", "hide"]);
    cla(dom.characters[name], "char-" + dir);
    nextStep();
  };
}

function hideCharacter(name, dir){
  return () => {
    cla(dom.characters[name], dir ? ["hide", dir] : "hide");
    nextStep();
  };
}
