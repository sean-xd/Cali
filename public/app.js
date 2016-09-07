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

// Utility
function el(name, parent){
  parent = parent || document;
  return parent.getElementsByClassName(name)[0];
}

function clt(e, name){
  if(Array.isArray(name)) return name.forEach(n => clt(e, n));
  e.classList.toggle(name);
}

function cla(e, name, unique){
  if(Array.isArray(name)) return name.forEach(n => cla(e, n));
  if(unique && el(name)) clr(el(name), name);
  e.classList.add(name);
}

function clr(e, name){
  if(Array.isArray(name)) return name.forEach(n => clr(e, n));
  e.classList.remove(name);
}

function t(tag, config){
  config = config || {};
  var parent = tag ? document.createElement(tag) : document.createDocumentFragment();
  if(config) Object.keys(config).forEach(key => parent[key] = config[key]);
  return (ch, force) => {
    if(force){parent.innerHTML = ch; return parent;}
    if(!ch && ch !== 0) return parent;
    var type = Object.prototype.toString.call(ch).slice(8,-1);
    if(type === "String" || type === "Number") parent.textContent = ch;
    if(type.substr(0,4) === "HTML" || type.substr(0, 4) === "Docu") parent.appendChild(ch);
    if(type === "Array") ch.forEach(e => parent.appendChild(e));
    return parent;
  };
}

function http(verb, route, cb, data){
  var req = new XMLHttpRequest();
  req.onload = function(){cb(JSON.parse(this.responseText));};
  req.open(verb, route);
  if(verb === "post") req.setRequestHeader("Content-Type", "application/json");
  req.send(data ? JSON.stringify(data) : null);
}

function blur(element, ten){
  return () => {
    if(element === "bg") element = dom.bgs[bgPosition];
    cla(element, ten === 10 ? "blur" : "blur1px");
    nextStep();
  }
}

function unblur(element, ten){
  return () => {
    if(element === "bg") element = dom.bgs[bgPosition];
    else element = dom.characters[element];
    clr(element, ten === 10 ? "blur" : "blur1px");
    nextStep();
  }
}

function flip(name){
  return () => {
    clt(el("cimg", dom.characters[name]), "flip");
    nextStep();
  };
}

function shake(name){
  return () => {
    cla(dom.characters[name], "shake");
    setTimeout(() => {
      clr(dom.characters[name], "shake");
      nextStep();
    }, 500);
  }
}

function cond(check, success, fail, waitFor){
  return () => {
    if(waitFor && !check()) script.unshift(cond(check, success, fail, waitFor));
    script = check() ? (success || []).concat(script) : (fail || []).concat(script);
    nextStep();
  };
}


// dom.p1i.addEventListener("mousemove", e => {
//   var x = Math.floor(e.pageX * -1 / 6),
//     y = Math.floor(e.pageY * -1 / 6);
//   dom.p1i.setAttribute("style", `margin: ${y}px 0px 0px ${x}px;`);
// });

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


// Characters
dom.characters = {
  root: el("characters")
};
dom.characters.root.addEventListener("click", nextStep);

function addCharacter(name, src, dir){
  if(!dom.characters[name]){
    dom.characters[name] = t("div", {className: `character char-${dir} hide ${dir[0] != 'c' ? dir : ''}`})([
      t("img", {src, className: "cimg"})()
    ]);
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

dom.email = el("email");
dom.password = el("password");
dom.login = el("login");
// dom.loginTitle = el("login-title");
var loginRoute = "/signup";
dom.newAccount = el("new-account");
dom.existingAccount = el("existing-account");
dom.activeLogin = el("active-login");

dom.newAccount.addEventListener("click", activateSignup);
dom.existingAccount.addEventListener("click", activateLogin);

function activateSignup(){
  cla(dom.activeLogin, "new");
  loginRoute = "/signup";
}

function activateLogin(){
  clr(dom.activeLogin, "new");
  loginRoute = "/login";
}

function openLogin(){
  if(user) return toggleSaveMenu();
  clr(dom.login, "hide");
  isLocked = true;
}

function closeLogin(){
  cla(dom.login, "hide");
  isLocked = false;
}

function tokenLogin(){
  if(!ls.token) return;
  http("post", "/login", body => {
    console.log(body);
    ls.token = body.user.token;
    user = body.user;
    loadSlots();
  }, {email: ls.email, token: ls.token});
}

function login(){
  var email = dom.email.value,
    password = dom.password.value;
  cla(dom.login, "hide");
  dom.email.value = "";
  dom.password.value = "";
  http("post", loginRoute, body => {
    console.log(body);
    if(!body || !body.success){
      openLogin();
      return console.log("Authentication Unsuccessful. Please try again.");
    }
    user = body.user;
    ls.token = body.user.token;
    ls.email = body.user.email;
    setTimeout(() => {
      cla(dom.login, "hide");
      isLocked = false;
      nextStep();
    }, 500);
  }, {email, password});
}

function update(){ // email token slot identity

}

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

// Quotes
dom.quote = el("quote");
dom.quote.addEventListener("click", nextStep);
function quote(author, lines){
  return () => {
    script.unshift(() => {
      cla(dom.quote, "hide");
      nextStep();
    });
    script.unshift(() => {
      if(!intervals.quote) return nextStep();
      clearInterval(intervals.quote);
      quickQuote(author, lines);
    });
    var lineNum = 0;
    while(dom.quote.firstChild) dom.quote.removeChild(dom.quote.firstChild);
    clr(dom.quote, "hide");
    intervals.quote = setInterval(() => {
      if(lineNum < lines.length) return addQuoteLine(lines[lineNum++]);
      addQuoteLine(author, 1);
      clearInterval(intervals.quote);
      intervals.quote = null;
    }, 1500);
  };
}

function addQuoteLine(text, isAuthor){
  var line = t("div", {className: `line ${isAuthor ? "author" : ""} hide`})(text);
  dom.quote.appendChild(line);
  setTimeout(() => clr(line, "hide"), 500);
}

function quickQuote(author, lines){
  while(dom.quote.firstChild) dom.quote.removeChild(dom.quote.firstChild);
  lines.forEach(str => dom.quote.appendChild(t("div", {className: "line"})(str)));
  dom.quote.appendChild(t("div", {className: "line author"})(author));
}

// It was of a strange order, that the doom
// Of these two creatures should be thus traced out
// Almost like a reality—the one
// To end in madness—both in misery.
// - George Byron, The Dream, IX

// He allowed himself to be swayed by his conviction
// that human beings are not born once and for all
// on the day their mothers give birth to them
// but that life obliges them over and over again
// to give birth to themselves.
// - Gabriel Garcí­a Márquez, Love in the Time of Cholera

// “Compassion hurts.
// When you feel connected to everything, you also feel responsible for everything.
// And you cannot turn away.
// Your destiny is bound with the destinies of others.
// You must either learn to carry the Universe or be crushed by it.
// You must grow strong enough to love the world,
// yet empty enough to sit down at the same table with its worst horrors.”
// ― Andrew Boyd, Daily Afflictions: The Agony of Being Connected to Everything in the Universe

// Look at the sky.
// We are not alone.
// The whole universe is friendly to us and conspires only to give the best to those who dream and work.
// - A. P. J. Abdul Kalam

// Look out into the universe and contemplate the glory of God.
// Observe the stars, millions of them, twinkling in the night sky,
// all with a message of unity, part of the very nature of God.
// - Sai Baba


var baseStats = {
  Myth: {},
  Okari: {},
  Vincent: {}
};

// Chapter 0
assets[0] = () => {
  addBackground("backgrounds/scene1.jpg", "down");
  addBackground("backgrounds/scene2.jpg");
  addBackground("backgrounds/dark-texture.jpg");
  addCharacter("God", "characters/Kaia/Royals/God/f208.png", "center");
};

function saveExists(){return !!user.slots[0];}
function userExists(){return !!user;}
function personaExists(){return !!user.persona;}

chapters[0] = [
  closeMainMenu,
  background("up", 1),
  blur("bg", 10),
  quote("- Stephen Crane, War Is Kind and Other Poems", [
    'A man said to the universe:',
    '"Sir, I exist!"',
    '"However" replied the universe,',
    '"The fact has not created in me',
    'A sense of obligation."'
  ]),
  hideBackground,
  background("center", 1),
  music("chillax"),
  openDialogue(500),
  line("You wake up in a white room."),
  line("Well, maybe you're not awake."),
  line("You don't feel anything, and while you notice a light there's nothing in vision to focus on."),
  line("Suddenly a person appears. It feels as though they've been there the whole time."),
  blur("bg", 10),
  characterChange("God", "center"),
  line("Congratulations. You've made it to the End of the World.", "Solemn Woman"),
  line("We're transferring you to the new universe we've created.", "Solemn Woman"),
  cond(userExists, [], [
    line("You'll need an identity to continue.", "Solemn Woman"),
    characterChange("God", "right"),
    blur("God"),
    closeDialogue(1),
    openLogin
  ], 1),
  openDialogue(1000),
  unblur("God"),
  characterChange("God", "center"),
  line("Choose your persona for this experience.", "Solemn Woman"),
  cond(personaExists, [], [
    hideCharacter("God"),
    closeDialogue(1),
    openCharacterSelect
  ], 1),
  closeCharacterSelect,
  openDialogue(1000),
  characterChange("God", "center"),
  line("Notice!", "Solemn Woman"),
  line("As armageddon has approached unexpectedly there may be a few hiccups in the universe that we can't immediately resolve.", "Solemn Woman"),
  line("Please bear with us and report any bugs to the Global Infrastructure Team.", "Solemn Woman"),
  line("Welcome to Kaia, and enjoy the rest of eternity.", "Solemn Woman"),
  hideCharacter("God"),
  closeDialogue(),
  background("center", 1),
  openMainMenu("Save")
];

// Chapter 1 Scene 1
assets["1M"] = () => {
  console.log("ok");
  addBackground("backgrounds/woods-sky.jpg", "up");
  addBackground("backgrounds/woods-tent.jpg", "down");
  addBackground("backgrounds/dark-texture.jpg");
  addCharacter("Myth", "characters/Venture/Postal/Myth/f348.png", "left");
  addCharacter("Jessica", "characters/Venture/Postal/Jessica/f352.png", "right");
  addCharacter("Eliza", "characters/Venture/Advance/Eliza/f338.png", "right");
  addCharacter("Art", "characters/Venture/Postal/Art/f342.png", "right");
  addCharacter("Zelda", "characters/Venture/Advance/Zelda/f091.png", "left");
  addCharacter("Leffen", "characters/Venture/Advance/Leffen/f069.png", "left");
  addCharacter("Hitomi", "characters/Venture/Advance/Hitomi/f071.png", "left");
  addCharacter("Vector", "characters/Venture/Advance/Vector/f336.png", "left");
};

chapters["1M"] = [
  closeMainMenu,
  music("banana"),
  background("down", 1),
  openDialogue(500),
  line("You open your eyes for what feels like the first time."),
  line("The first thing you see is the night sky."),
  line("Home is out there somewhere.", "Myth"),
  line("You realize you have no idea where you are, and get up to look around."),
  background("up", 1),
  line("You immediately notice a group of people at a campsite nearby, and get closer to listen to them."),
  characterChange("Myth", "left"),
  () => {
    setTimeout(() => cla(dom.characters.Myth, "halfhide"), 0);
    nextStep();
  },
  characterChange("Jessica", "right"),
  line("I'm starving.. When are they coming back with dinner?", "Blonde Girl"),
  characterChange("Jessica", "center"),
  characterChange("Eliza", "right"),
  line("How is Jessica still hungry? All she does is lay around stuffing her face..", "Serious Looking Girl"),
  flip("Jessica"),
  line("Wh-what?! I went on plenty of patrols this week, it's not my fault there's nothing happening here.", "Jessica"),
  line("Didn't Art raid a bandit campsite yesterday? Oh, you sleep through all of your shifts so you wouldn't know..", "Serious Looking Girl"),
  hideCharacter("Eliza", "right"),
  flip("Art"),
  characterChange("Art", "right"),
  line("Come on Eliza it's not her fault. It's my mistake for not waking her up.", "Art"),
  hideCharacter("Art", "right"),
  line("Aaah~ What did I do to deserve getting stuck in this world, with this nerd, and no food...", "Jessica"),
  characterChange("Jessica", "right"),
  line("You were too focused on their conversation that you didn't notice people approaching behind you."),
  characterChange("Myth", "center"),
  characterChange("Zelda", "left"),
  () => {
    clr(dom.characters.Myth, "halfhide");
    nextStep();
  },
  line("Watcha doin?", "Eccentric Girl"),
  shake("Myth"),
  line("Ah!", "Myth"),
  flip("Jessica"),
  shake("Jessica"),
  line("Eeeek!!!", "Jessica"),
  line("You idiot! Don't sneak up on me like that!", "Jessica"),
  hideCharacter("Jessica", "right"),
  line("Are you ok?", "Eccentric Girl"),
  choice({text: "Yeah, totally.", script: [
    characterChange("Art", "right"),
    line("Hey, you guys are back. What were you able to pick up?")
  ]}, {text: "Who are you people?", script: [

  ]}),
  hideCharacter("Zelda", "left"),
  flip("Leffen"),
  characterChange("Leffen", "left"),
  line("Sorry, not much. We're going to have to do some more hunting in the morning.", "Responsible Boy"),
  hideCharacter("Art", "right"),
  characterChange("Myth", "right"),
  characterChange("Leffen", "center"),
  flip("Hitomi"),
  characterChange("Hitomi", "left"),
  line("It's ok. We don't have to eat anyway.", "Stoic Girl"),
  hideCharacter("Hitomi", "left"),
  characterChange("Leffen", "left"),
  characterChange("Myth", "center"),
  characterChange("Jessica", "right"),
  line("Speak for yourself! Where's the food?!", "Jessica"),
  hideCharacter("Jessica", "right"),
  characterChange("Myth", "right"),
  characterChange("Leffen", "center"),
  characterChange("Vector", "left"),
  line("Help! Bandits incoming!", "Frightened Boy"),

  // line("Myth, let's go!", "Responsible Boy"),
  // flip("Leffen"),
  // choice({text: "Right behind you!", script: [
  //
  // ]}, {text: "*run away*", script: [
  //
  // ]}),
  () => {}, //buffer

  // battle

  () => {}, // buffer
  // End of chapter
  closeDialogue(1),
  background("center", 1),
  setChapter("2M"),
  openMainMenu("Save")
];



// assets["2M"] = () => {
//   addBackground("backgrounds/woods-sky.jpg", "up");
//   addBackground("backgrounds/woods-tent.jpg", "down");
//   addBackground("backgrounds/dark-texture.jpg");
//   addCharacter("Myth", "characters/Venture/Postal/Myth/f348.png", "center");
// };
//
// chapters["2M"] = [
//   closeMainMenu,
//   music("atwu"),
//   background("up", 1),
//   openDialogue(500),
//   line("Oh shit")
// ];


