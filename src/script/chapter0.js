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
  openMainMenu("End Sequence 0", "Save")
];
