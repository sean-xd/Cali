// Character Select
dom.characterSelect = el("character-select");
dom.characterA = el("character-a");
dom.csInfoA = el("cs-info-a");
dom.characterB = el("character-b");
dom.csInfoB = el("cs-info-b");
dom.characterC = el("character-c");
dom.csInfoC = el("cs-info-c");

function openCharacterSelect(){
  clr(dom.characterSelect, ["hide", "down"]);
  isLocked = true;
}

function characterSelection(letter, name){
  clr(dom[`character${letter}`], "blur1px");
  cla(dom[`character${letter}`], "active-persona", 1);
  ["A", "B", "C"].filter(e => e !== letter)
    .forEach(e => cla(dom[`character${e}`], "blur1px"));
  user.persona = {name, chapter: "1" + name[0]};
}

function closeCharacterSelect(){
  cla(dom.characterSelect, ["hide", "down"]);
  nextStep();
}
