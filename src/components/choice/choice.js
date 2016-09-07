// Choice
var choices = {
  a: {script: [], check: () => true},
  b: {script: [], check: () => true}
};

dom.choices = el("choices");
dom.choiceA = el("choiceA");
dom.choiceB = el("choiceB");

function choice(a, b){
  return () => {
    isLocked = true;
    dom.choiceA.textContent = a.text;
    choices.a.script = a.script;
    if(a.check) choices.a.check = a.check;
    if(a.check && !a.check()) cla(dom.choiceA, "blur1px");
    dom.choiceB.textContent = b.text;
    choices.b.script = b.script;
    if(b.check) choices.b.check = b.check;
    if(b.check && !b.check()) cla(dom.choiceB, "blur1px");
    clr(dom.choices, ["hide", "up"]);
  };
}

function choose(letter){
  if(!choices[letter].check()) return;
  cla(dom.choices, ["hide", "up"]);
  script = choices[letter].script.concat(script);
  isLocked = false;
  nextStep();
}
