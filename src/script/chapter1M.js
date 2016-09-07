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
  line("Wh-what?! I went on plenty of patrols this week, it's not my fault there's nothing happening here.", "Jessica"),
  line("Didn't Art raid a bandit campsite yesterday? Oh, you sleep through all of your shifts so you wouldn't know..", "Serious Looking Girl"),
  hideCharacter("Eliza", "right"),
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
  line("Ah!", "Myth"),
  line("Eeeek!!!", "Jessica"),
  () => {},

  // battle


  // buffer
  () => {},
  // End of chapter
  closeDialogue(1),
  background("center", 1),
  setChapter("2M"),
  openMainMenu("Save")
];
