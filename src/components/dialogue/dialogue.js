// Dialogue
dom.dialogue = el("dialogue");
dom.dialogueText = el("dialogue-text");
dom.dialogueLine = el("dialogue-line");
dom.dialogue.addEventListener("click", nextStep);

dom.characterName = el("character-name");
dom.cnameContainer = el("cname-container");

function openDialogue(wait){
  return () => {
    clr(dom.dialogue, "down");
    setTimeout(nextStep, wait);
  }
}

function closeDialogue(wait){
  return () => {
    cla(dom.dialogue, "down");
    cla(dom.cnameContainer, "hide");
    setTimeout(() => {
      dom.dialogueLine.textContent = "";
      nextStep();
    }, wait);
  }
}

function line(str, name){
  return () => {
    if(!name){
      cla(dom.cnameContainer, "hide");
      dom.characterName.textContent = "";
    }
    else {
      clr(dom.cnameContainer, "hide");
      dom.characterName.textContent = name;
      str = `"${str}"`;
    }
    script.unshift(() => {
      if(!intervals.dialogue) return nextStep();
      clearInterval(intervals.dialogue);
      dom.dialogueLine.textContent = str;
    });
    var linePos = 0;
    dom.dialogueLine.textContent = "";
    clearInterval(intervals.dialogue);
    intervals.dialogue = setInterval(() => {
      dom.dialogueLine.textContent += str[linePos++];
      if(linePos === str.length){
        clearInterval(intervals.dialogue);
        intervals.dialogue = null;
      }
    }, 35); // data.typeSpeed
  };
}
