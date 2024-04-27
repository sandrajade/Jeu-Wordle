const maxAttempts = 6; // Nombre maximum de tentatives

let attempts = Array.from(
  document.querySelectorAll(
    ".groupe0, .groupe1, .groupe2, .groupe3, .groupe4, .groupe5"
  )
).map((group) => Array.from(group.querySelectorAll(".stockLetters"))); // Initialisez les tentatives
let currentAttempt = 0;
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
  "avion",
  "belle",
  "chien",
  "droit",
  "eclat",
  "forme",
  "givre",
  "havre",
  "ideal",
  "jouer",
  "lourd",
  "mains",
  "noyer",
  "ombre",
  "porte",
  "quite",
  "rouge",
  "sable",
  "table",
  "usure",
  "vivre",
  "wagon",
  "zebre",
];

// 1. Initialiser le jeu
let wordToGuess = words[Math.floor(Math.random() * words.length)];
console.log("Mot à deviner :", wordToGuess); // Sélectionnez un mot aléatoire
let selectedLetters = []; // Tableau pour les lettres sélectionnées par le joueur
console.log("Mot à deviner :", wordToGuess);
let isGuessSubmitted = false;
let canCheckLetters = false;
let currentIndex = 0;
let wordGuess = "";
let results = [];

// Réinitialiser et démarrer une nouvelle tentative visuelle
function startNewAttempt() {
  // Réinitialiser visuellement les groupes de lettres pour la nouvelle tentative
  for (let i = 0; i < maxAttempts; i++) {
    const groupe = document.querySelector(`.groupe${i}`);
    if (groupe) {
      groupe.querySelectorAll(".stockLetters").forEach((element) => {
        element.textContent = "_"; // Réinitialiser le contenu des lettres
        element.classList.remove("correct", "misplaced", "incorrect"); // Réinitialiser les styles
      });
    }

    // Incrémenter le compteur de tentatives
    currentAttempt++;
    console.log(`Tentative ${currentAttempt}`);
  }

  function resetGame() {
    // Réinitialiser les variables globales et l'interface utilisateur
    resetAttempts(); // Réinitialiser les tentatives et l'interface
    startGame(); // Démarrer une nouvelle partie
  }
  // Fonction pour démarrer le jeu
  function resetAttempts() {
    // Réinitialiser les variables de jeu
    attempts = [];
    currentAttempt = 1;
    let incorrectLettersPerAttempt = [];

    // Réinitialiser l'affichage des lettres dans l'interface
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

  function startGame() {
    // Réinitialiser et démarrer une nouvelle partie
    resetAttempts();

    // Sélectionnez un nouveau mot à deviner
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    console.log("Mot à deviner :", wordToGuess);

    // Réinitialiser le numéro de tentative
    currentAttempt = 1;
  }
  // Fonction pour sélectionner un mot et l'afficher sur l'interface
  function selectWord(word, attemptIndex) {
    let letters = word.split(""); // Divisez le mot en lettres
    console.log(letters);

    // Sélectionnez chaque lettre dans le groupe de tentative spécifié
    for (let i = 0; i < letters.length; i++) {
      let caseElement = attempts[attemptIndex][i];
      if (caseElement) {
        caseElement.textContent = letters[i];
        caseElement.classList.remove("correct", "misplaced", "incorrect");
      }
    }
  }

  // Fonction appelée lorsqu'une lettre est sélectionnée
  function selectLetter(letter) {
    if (currentIndex < wordToGuess.length && !isGuessSubmitted) {
      let currentStockLetter = attempts[currentAttempt - 1][currentIndex];
      if (currentStockLetter) {
        currentStockLetter.textContent = letter;
        currentIndex++;

        // Activer le bouton de vérification lorsque toutes les lettres sont sélectionnées
        if (currentIndex === wordToGuess.length) {
          canCheckLetters = true;
        }
      }
    } else if (wordToGuess.includes(letter)) {
      // Utilisez la variable 'letter'
      // ... votre code ici ...
    } else {
      console.error(
        "Toutes les lettres sont déjà sélectionnées ou une tentative a été soumise."
      );
    }
  }
  let targetLetters = wordToGuess.split("");
  // Fonction pour vérifier les lettres sélectionnées par le joueur

  // Fonction pour comparer les mots saisi et à deviner
  function compareWords(selectedWord, targetWord) {
    let correctLetters = [];
    let misplacedLetters = [];
    let incorrectLetters = [];

    // Assurez-vous que les mots ont la même longueur
    if (selectedWord.length !== targetWord.length) {
      console.error("Les mots doivent avoir la même longueur.");
      return {
        correctLetters: [],
        misplacedLetters: [],
        incorrectLetters: [],
      };
    }

    // Parcourir chaque lettre des mots
    for (let i = 0; i < targetWord.length; i++) {
      let selectedLetter = selectedWord[i];
      let targetLetter = targetWord[i];

      if (selectedLetter === targetLetter) {
        correctLetters.push(selectedLetter); // Lettre correctement placée
      } else if (targetWord.includes(selectedLetter)) {
        misplacedLetters.push(selectedLetter); // Lettre présente mais mal placée
      } else {
        incorrectLetters.push(selectedLetter); // Lettre incorrecte
      }
    }

    // Retourner les résultats avec les lettres correctement placées, mal placées et incorrectes
    return {
      correctLetters,
      misplacedLetters,
      incorrectLetters,
    };
  }

  function deleteLetter() {
    if (!isGuessSubmitted) {
      // Trouvez l'élément correspondant à la dernière lettre saisie
      let lastIndex = currentIndex - 1;
      if (lastIndex >= 0) {
        let currentStockLetter = attempts[currentAttempt - 1][lastIndex];
        if (currentStockLetter) {
          currentStockLetter.textContent = "_";
          currentStockLetter.classList.remove(
            "correct",
            "misplaced",
            "incorrect"
          );
          currentIndex--; // Décrémentez l'index pour la lettre précédente
          canCheckLetters = false; // Désactivez la vérification des lettres
        }
      }
    }
    if (wordGuess.toUpperCase() === wordToGuess.toUpperCase()) {
      function createConfetti() {
        // Déclencher l'animation de confettis
        // Autres actions à effectuer lorsque le mot est deviné correctement
        console.log("Confetti created!");
      }
    }
    confettiContainer.appendChild(confetti);
  }
}

function deleteLetter() {
  if (!isGuessSubmitted) {
    // Trouvez l'élément correspondant à la dernière lettre saisie
    let lastIndex = currentIndex - 1;
    if (lastIndex >= 0) {
      let currentStockLetter = attempts[currentAttempt - 1][lastIndex];
      if (currentStockLetter) {
        currentStockLetter.textContent = "_";
        currentStockLetter.classList.remove(
          "correct",
          "misplaced",
          "incorrect"
        );
        currentIndex--; // Décrémentez l'index pour la lettre précédente
        canCheckLetters = false; // Désactivez la vérification des lettres
      }
    }
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
