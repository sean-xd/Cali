// Main Menu
var saveMenuOpen = false,
  isContinue = false;
dom.mainmenu = el("main-menu");
dom.start = el("start");
dom.continue = el("continue");

dom.savemenu = el("save-menu");
dom.slot0 = el("slot0");
dom.slot1 = el("slot1");
dom.slot2 = el("slot2");

function loadSlots(){
  if(!user) return;
  user.slots.forEach((persona, i) => {
    if(!persona) return;
    el("slot-name", dom[`slot${i}`]).textContent = persona.name;
    el("slot-chapter", dom[`slot${i}`]).textContent = "Chapter " + persona.chapter;
  });
}

function saveToSlot(slot){
  if(isContinue){
    user.persona = user.slots[slot];
    return setScript(user.persona.chapter);
  }
  user.slots[slot] = user.persona;
  http("post", "/update", body => {
    if(body.success){
      console.log("Update Successful.");
      loadSlots();
    }
  }, {slot, email: user.email, token: user.token, persona: user.persona});
}

dom.start.addEventListener("click", () => {
  if(dom.start.textContent === "Save") return toggleSaveMenu(1);
  setScript("0");
});

function closeMainMenu(){
  cla(dom.mainmenu, ["hide", "up"]);
  nextStep();
}

function openMainMenu(title){
  return () => {
    dom.start.textContent = title;
    closeSaveMenu(1);
    clr(dom.mainmenu, ["hide", "up"]);
  }
}

dom.continue.addEventListener("click", () => {
  if(!user) return openLogin();
  if(dom.start.textContent === "Start"){
    isContinue = !isContinue;
    return toggleSaveMenu(1);
  }
  else setScript(user.persona.chapter);
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
