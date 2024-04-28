const keyboard = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Q",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

// Liste de mots à deviner
const words = [
  "arbre",
  "blanc",
  "chaud",
  "cirer",
  "fibre",
  "aorte",
  "bague",
  "bleue",
  "cause",
  "danse",
  "table",
  "hache",
  "genie",
  "fouet",
  "humus",
  "eloge",
  "euler",
  "exact",
  "image",
  "glace",
  "aider",
  "brume",
  "coton",
  "chose",
  "foule",
  "pouce",
  "jouer",
  "givre",
  "bouse",
  "favor",
  "beret",
  "faste",
  "cirer",
  "hache",
  "index",
  "honte",
  "mange",
  "laper",
  "genie",
  "jouer",
  "limee",
  "homme",
  "fasti",
  "filon",
  "donne",
  "kilos",
  "pieds",
  "reine",
  "naose",
  "oieva",
  "arbre",
  "fibre",
  "table",
  "lente",
  "manga",
  "mange",
  "nabot",
  "raser",
  "emote",
  "sentez",
  "benis",
  "lisas",
  "eurent",
  "hontes",
  "lasse",
  "auras",
  "yours",
  "sentez",
  "icien",
  "hampe",
];
let attempts = Array.from(
  document.querySelectorAll(
    ".groupe0, .groupe1, .groupe2, .groupe3, .groupe4, .groupe5"
  )
).map((group) => Array.from(group.querySelectorAll(".stockLetters"))); // Initialisez les tentatives

// Sélectionnez un mot aléatoire à deviner
let wordToGuess = words[Math.floor(Math.random() * words.length)]; // Sélectionnez un mot aléatoire
let selectedLetters = []; // Tableau pour les lettres sélectionnées par le joueur
console.log("Mot à deviner :", wordToGuess);
// Variables globales
let currentIndex = 0;
let isGuessSubmitted = false;
let canCheckLetters = false;
let wordGuess = "";
const maxAttempts = 6;
let currentAttempt = 1;
// Or any initial value you want
console.log("Valeur de currentAttempt :", currentAttempt);

// Mise en place de l'interface utilisateur
resetUI();

// Fonction pour réinitialiser l'interface utilisateur
function resetUI() {
  currentIndex = 0;
  isGuessSubmitted = false;
  canCheckLetters = false;

  let stockLettersElements = document.querySelectorAll(".stockLetters");
  stockLettersElements.forEach((element) => {
    element.textContent = "_";
    element.classList.remove("correct", "misplaced", "incorrect");
  });

  // Réinitialiser le clavier virtuel
  let keyboardButtons = document.querySelectorAll(".keyboard");
  keyboardButtons.forEach((button) => {
    button.classList.remove("keyboard-incorrect");
  });
}

// Fonction pour démarrer une nouvelle partie
function startNewGame() {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  console.log("Nouveau mot à deviner :", wordToGuess);
  resetUI();
}
// Fonction pour réinitialiser les lettres et les styles
function resetLetters() {
  let currentStockLetters = attempts[currentAttempt - 1];
  currentStockLetters.forEach((element) => {
    element.textContent = "_";
    element.classList.remove("correct", "misplaced", "incorrect");
  });
  currentIndex = 0;
  canCheckLetters = false;
  isGuessSubmitted = false;
}

// Fonction p// Fonction pour démarrer un nouvel essai
function startNewAttempt() {
  resetLetters();
  currentIndex = 0;
  isGuessSubmitted = false;
  canCheckLetters = false;
}

// Fonction pour vérifier les lettres sélectionnées

function checkLetters() {
  if (!isGuessSubmitted && canCheckLetters) {
    let stockLettersElements = document.querySelectorAll(".stockLetters");
    let selectedWord = Array.from(stockLettersElements)
      .map((element) =>
        element.textContent ? element.textContent.toUpperCase() : ""
      )
      .join("");

    let targetWord = wordToGuess.toUpperCase();
    let comparisonResult = compareWords(selectedWord, targetWord);

    applyComparisonResult(comparisonResult);

    if (selectedWord === targetWord) {
      console.log("Félicitations ! Vous avez deviné le mot :", wordToGuess);
      // Gérer la fin de la partie ou d'autres actions
    }
  } else {
    console.error(
      "Vous devez sélectionner toutes les lettres avant de vérifier."
    );
  }
}
// Fonction pour désactiver la suppression des lettres après vérification
function disableDeleteLetter() {
  let deleteButton = document.querySelector(".deleteButton");
  if (deleteButton) {
    deleteButton.setAttribute("disabled", "true");
  }
}

// Fonction pour réactiver la suppression des lettres
function enableDeleteLetter() {
  let deleteButton = document.querySelector(".deleteButton");
  if (deleteButton) {
    deleteButton.setAttribute("disabled", "false"); // Réactiver le bouton
  }
}

function selectLetter(letter) {
  if (currentIndex < wordToGuess.length && !isGuessSubmitted) {
    let currentStockLetters = attempts[currentAttempt - 1];
    let currentStockLetter = currentStockLetters[currentIndex];

    if (currentStockLetter) {
      currentStockLetter.textContent = letter.toUpperCase();
      currentIndex++;

      if (currentIndex === wordToGuess.length) {
        canCheckLetters = true;
      }
    }
  } else {
    console.error(
      "Toutes les lettres sont déjà sélectionnées ou une tentative a été soumise."
    );
  }
}

function deleteLetter() {
  if (!isGuessSubmitted && currentIndex > 0) {
    currentIndex--;
    let currentStockLetters = attempts[currentAttempt - 1];
    let currentStockLetter = currentStockLetters[currentIndex];

    if (currentStockLetter) {
      currentStockLetter.textContent = "_";
      enableDeleteLetter(); // Réactiver la suppression après avoir effacé une lettre
    }
  }
}

// Écouter l'événement de pression sur la touche "Enter"
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (!isGuessSubmitted && canCheckLetters) {
      checkLetters(); // Appeler la fonction de vérification des lettres
      disableDeleteLetter(); // Désactiver la suppression des lettres après vérification
    } else {
      console.error(
        "Vous devez sélectionner toutes les lettres avant de vérifier."
      );
    }
  }
});

// Fonction pour comparer les mots saisis et à deviner
function compareWords(selectedWord, targetWord) {
  let correctLetters = [];
  let misplacedLetters = [];
  let incorrectLetters = [];

  for (let i = 0; i < targetWord.length; i++) {
    let selectedLetter = selectedWord[i];
    let targetLetter = targetWord[i];

    if (selectedLetter === targetLetter) {
      correctLetters.push(selectedLetter);
    } else if (targetWord.includes(selectedLetter)) {
      misplacedLetters.push(selectedLetter);
    } else {
      incorrectLetters.push(selectedLetter);
    }
  }

  return { correctLetters, misplacedLetters, incorrectLetters };
}
// Fonction pour appliquer le résultat de la comparaison aux éléments d'interface utilisateur
function applyComparisonResult(comparisonResult) {
  let stockLettersElements = document.querySelectorAll(".stockLetters");

  stockLettersElements.forEach((element, index) => {
    let letter = element.textContent ? element.textContent.toUpperCase() : "";

    if (comparisonResult.correctLetters.includes(letter)) {
      element.classList.add("correct");
    } else if (comparisonResult.misplacedLetters.includes(letter)) {
      element.classList.add("misplaced");
    } else if (comparisonResult.incorrectLetters.includes(letter)) {
      element.classList.add("incorrect");
    }
  });
}

// Récupération du bouton de vérification
let checkButton = document.querySelector(".checkButton");

// Vérification de l'existence du bouton et ajout de l'écouteur d'événements
if (checkButton) {
  checkButton.addEventListener("click", checkLetters);
}

// Écoutez les événements de démarrage d'une nouvelle partie
let restartButton = document.querySelector(".restartButton");
if (restartButton) {
  restartButton.addEventListener("click", restartGame);
}

if (wordGuess.toUpperCase() === wordToGuess.toUpperCase()) {
  createConfetti(); // Déclencher l'animation de cotillons
  // Autres actions à effectuer lorsque le mot est deviné correctement
}

if (wordGuess === wordToGuess) {
  createConfetti(); // Déclencher l'animation de cotillons
  // Autres actions à effectuer lorsque le mot est deviné correctement
}

function createConfetti() {
  const confettiCount = 50; // Nombre de cotillons à créer

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * window.innerWidth}px`; // Position aléatoire horizontale
    document.body.appendChild(confetti); // Ajouter le cotillon à la page
  }
}

// Fonction appelée pour réinitialiser les lettres saisies et les styles de mise en évidence
function resetLetters() {
  // Réinitialisez toutes les lettres saisies
  for (let i = 0; i < wordToGuess.length; i++) {
    let currentStockLetter = attempts[currentAttempt - 1][i];
    if (currentStockLetter) {
      currentStockLetter.textContent = "_";
      currentStockLetter.classList.remove("correct", "misplaced", "incorrect");
    }
  }

  currentIndex = 0; // Réinitialisez l'index des lettres pour la nouvelle tentative
  canCheckLetters = false; // Désactivez la vérification des lettres pour la nouvelle tentative
  isGuessSubmitted = false; // Réinitialisez l'état de la tentative soumise
}

// Écoutez l'événement de pression sur la touche "Enter" sur le document
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Empêchez le comportement par défaut de la touche "Enter" (soumission de formulaire)
    event.preventDefault();

    // Réinitialisez les lettres si une tentative est soumise mais non validée
    if (isGuessSubmitted && !canCheckLetters) {
      resetLetters();
    }
  }
});

function restartGame() {
  resetUI(); // Réinitialiser l'interface utilisateur
  startNewGame(); // Démarrer une nouvelle partie
}
