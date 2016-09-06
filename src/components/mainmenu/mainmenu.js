// Main Menu
var saveMenuOpen = false;
dom.mainmenu = el("main-menu");
dom.start = el("start");
dom.continue = el("continue");

dom.savemenu = el("save-menu");
dom.slot1 = el("slot1");
dom.slot2 = el("slot2");
dom.slot3 = el("slot3");

dom.start.addEventListener("click", () => {
  if(dom.start.textContent === "save") return toggleSaveMenu(1);
  cla(dom.mainmenu, ["hide", "up"]);
  setScript("0");
});

dom.continue.addEventListener("click", () => {
  if(dom.start.textContent === "Start") return toggleSaveMenu(1);
  console.log("ok");
});

function toggleSaveMenu(check){
  saveMenuOpen ? closeSaveMenu(check) : openSaveMenu(check);
}

function openSaveMenu(isMainOpen){
  saveMenuOpen = true;
  if(!isMainOpen) clr(dom.mainmenu, "hide");
  else cla(dom.mainmenu, "up");
  clr(dom.savemenu, "hide");
}

function closeSaveMenu(wasMainOpen){
  saveMenuOpen = false;
  if(!wasMainOpen) cla(dom.mainmenu, "hide");
  else clr(dom.mainmenu, "up");
  cla(dom.savemenu, "hide");
}
