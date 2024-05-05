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
const wordsEasy = [
  "table",
  "livre",
  "pomme",
  "chien",
  "route",
  "plume",
  "faute",
  "image",
  "joie",
  "peine",
  "cadre",
  "maire",
  "cause",
  "pluie",
  "croix",
  "fonds",
  "temps",
  "carte",
  "espace",
  "coude",
  "frais",
  "gants",
  "terre",
  "bureau",
  "ailes",
  "clefs",
  "clair",
  "amour",
  "force",
  "blanc",
  "rouge",
  "cléon",
  "laine",
  "voile",
  "monde",
  "mille",
  "plier",
  "tapis",
  "chaus",
  "chien",
  "ombre",
  "fente",
  "poire",
  "amie",
  "bancs",
  "corde",
  "sable",
  "floue",
  "voile",
  "bours",
];
const wordsMedium = [
  "rapide",
  "aigle",
  "tendre",
  "tueur",
  "frapper",
  "gagner",
  "fenêtre",
  "limone",
  "alcool",
  "ambre",
  "abord",
  "jardin",
  "blouse",
  "village",
  "lumière",
  "mémoire",
  "tomate",
  "orange",
  "banane",
  "fermé",
  "couru",
  "fraise",
  "offrir",
  "joueur",
  "musée",
  "frites",
  "basket",
  "risque",
  "crisé",
  "juvén",
  "billet",
  "cadeau",
  "valeur",
  "motif",
  "moral",
  "lapin",
  "avoir",
  "crise",
  "vache",
  "temps",
  "humid",
  "brume",
  "flair",
  "piano",
  "chine",
  "image",
  "jouer",
  "chaton",
  "avant",
  "route",
];
const wordsHard = [
  "fiasco",
  "aiglon",
  "fondre",
  "jungle",
  "empire",
  "palais",
  "témoin",
  "manoir",
  "carref",
  "blonde",
  "tirage",
  "camion",
  "triple",
  "aviron",
  "hippop",
  "bousin",
  "sombre",
  "anvils",
  "coffre",
  "miroir",
  "gourde",
  "ventre",
  "radis",
  "pilote",
  "vortex",
  "requin",
  "noyau",
  "dragon",
  "flaque",
  "mystère",
  "revue",
  "craque",
  "topaze",
  "charme",
  "fourmi",
  "lauréat",
  "douane",
  "renard",
  "cyclon",
  "gazon",
  "cheval",
  "lionce",
  "jockey",
  "cactus",
  "région",
  "diable",
  "épine",
  "pirate",
  "denté",
  "souffle",
];
// Définition des niveaux de difficulté
const NIVEAU_FACILE = "facile";
const NIVEAU_INTERMEDIAIRE = "intermédiaire";
const NIVEAU_DIFFICILE = "difficile";

const lightColors = ["#FFFFFF", "#F5F5DC", "#FFC0CB", "#FFFFE0", "#ADD8E6"];
const darkColors = ["#000000", "#808080", "#000080", "#8B0000", "#006400"];

let attempts = [
  document.querySelectorAll(".groupe0 .stockLetters"),
  document.querySelectorAll(".groupe1 .stockLetters"),
  document.querySelectorAll(".groupe2 .stockLetters"),
  document.querySelectorAll(".groupe3 .stockLetters"),
  document.querySelectorAll(".groupe4 .stockLetters"),
  document.querySelectorAll(".groupe5 .stockLetters"),
  // Ajoutez d'autres sélections pour les groupes suivants (groupe2, groupe3, etc.)
];

// 1. Initialiser le jeu
const groupClasses = [
  ".groupe0",
  ".groupe1",
  ".groupe2",
  ".groupe3",
  ".groupe4",
  ".groupe5",
];

let selectedLetters = []; // Tableau pour les lettres sélectionnées par le joueur
let isGuessSubmitted = false;
let canCheckLetters = false;
let currentIndex = 0;
let wordGuess = "";
let currentWordIndex; // Indice du mot actuellement sélectionné
let wordToGuess; // Mot à deviner
let lettersToGuess = []; // Tableau pour stocker les lettres du mot à deviner
const maxAttempts = 6; // Nombre maximum de tentatives
let currentAttempt = 0; // Compteur de tentatives
let results = []; // Tableau pour stocker les résultats de chaque tentative
let isDeleteEnabled = true;
let counter = 0; // Initialisation du compteur à zéro

function resetAttempts() {
  // Réinitialiser les variables de jeu
  attempts = [];
  currentAttempt = 0;

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
document.addEventListener("DOMContentLoaded", () => {
  // Écouter l'événement "keydown" sur le document
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Appeler la fonction pour démarrer le jeu lors de l'appui sur la touche "Enter"
      startNewGame();
    }
  });
});

// Définition de la fonction startNewGame avec gestion du niveau de difficulté
function startNewGame(difficulty) {
  let selectedWord;

  // Sélectionner un mot aléatoire en fonction du niveau de difficulté
  switch (difficulty) {
    case "easy":
      selectedWord = selectRandomWord(wordsEasy);
      break;
    case "medium":
      selectedWord = selectRandomWord(wordsMedium);
      break;
    case "hard":
      selectedWord = selectRandomWord(wordsHard);
      break;
    default:
      console.error("Niveau de difficulté non reconnu :", difficulty);
      return; // Arrêter l'exécution si le niveau de difficulté n'est pas valide
  }
  // Fonction pour démarrer le jeufunction startGame() {
  // Réinitialiser et démarrer une nouvelle partie
  resetAttempts();

  // Sélectionnez un nouveau mot à deviner
  const wordToGuess = selectRandomWord(); // Appeler la fonction avec les parenthèses pour obtenir le mot sélectionné
  createAttempts();

  // Réinitialiser le numéro de tentative
  currentAttempt = 0; // Remettre le compteur de tentative à zéro au début du jeu

  // Appeler la fonction pour démarrer une nouvelle tentative
  playNewAttempt();
  // Afficher le mot sélectionné dans l'interface
  displayNewWord(selectedWord);

  // Démarrer une nouvelle partie avec le mot sélectionné
  console.log(`Nouvelle partie démarrée avec le mot : ${selectedWord}`);
  // Ici, vous pouvez appeler d'autres fonctions ou démarrer d'autres actions de jeu
}
// Fonction pour réinitialiser l'état du jeu avec le nouveau mot à deviner
function resetGame(selectedWord) {
  // Ici, vous pouvez réinitialiser tous les états du jeu
  console.log("Réinitialisation du jeu...");

  // Exemple : Mettre à jour l'interface avec le nouveau mot à deviner
  displayNewWord(selectedWord);

  // Autres actions de réinitialisation ou de démarrage de la partie
}

// Fonction pour afficher le mot à deviner dans l'interface
function displayNewWord(word) {
  const wordDisplayElement = document.getElementById("wordToGuess");
  if (wordDisplayElement) {
    wordDisplayElement.textContent = word; // Mettre à jour l'élément HTML avec le nouveau mot
  }
}

// Fonction pour sélectionner un mot aléatoire parmi une liste prédéfinie
function selectRandomWord(wordsArray) {
  // Vérifier si wordsArray est défini et est un tableau
  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    console.error("Le tableau de mots est invalide ou vide");
    return null; // ou une autre valeur de retour appropriée
  }

  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  return wordsArray[randomIndex];
}

// Appeler la fonction pour sélectionner un mot aléatoire et le définir comme wordToGuess
wordToGuess = selectRandomWord();
const letterOccurrences = countLetterOccurrences(wordToGuess);

// Vérifier si 'wordToGuess' est défini et est de type 'string'
if (typeof wordToGuess === "string") {
  // Séparer les lettres du mot à deviner en un tableau de lettres
  const targetLetters = wordToGuess.split("");
  console.log("Lettres cibles :", targetLetters);
} else {
  console.error("Mot à deviner non défini ou de type incorrect.");
}
function countLetterOccurrences(word) {
  const letterCount = {};
  for (let letter of word) {
    if (letterCount[letter]) {
      letterCount[letter]++;
    } else {
      letterCount[letter] = 1;
    }
  }
  return letterCount;
}

function createAttempts() {
  const attempts = [];

  for (let i = 0; i < 6; i++) {
    const selector = `.groupe${i} .stockLetters`;
    const elements = document.querySelectorAll(selector);
    attempts.push(elements);
  }

  return attempts;
}

function compareWords(selectedWord, targetWord) {
  let correctLetters = [];
  let misplacedLetters = [];
  let incorrectLetters = [];

  // Vérifier si les mots sont définis et ont la même longueur attendue
  if (
    !selectedWord ||
    !targetWord ||
    selectedWord.length !== 5 ||
    targetWord.length !== 5
  ) {
    console.error(
      "Les mots doivent être définis et avoir exactement 5 lettres."
    );
    return {
      correctLetters: [],
      misplacedLetters: [],
      incorrectLetters: [],
    };
  }

  // Parcourir chaque lettre des mots
  for (let i = 0; i < 5; i++) {
    let selectedLetter = selectedWord[i];
    let targetLetter = targetWord[i];

    // Comparer les lettres à la même position
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
function playNewAttempt() {
  if (currentAttempt < maxAttempts) {
    // Démarrer une nouvelle tentative visuelle

    compareWords(); // Créer les groupes de lettres pour chaque tentative
    createAttempts();

    selectWord(wordToGuess, currentAttempt); // Afficher le mot à deviner pour la tentative actuelle

    // Attendre que toutes les lettres soient sélectionnées avant de vérifier
    // Sélectionner une lettre (à implémenter en fonction du comportement souhaité)
    // deleteLetter();
    checkLetters();
    handleEnterKeyPress();

    // Activer la vérification des lettres une fois que toutes les lettres sont sélectionnées
    canCheckLetters = false;

    console.log("Sélectionnez toutes les lettres avant de vérifier.");

    // Ne vérifiez les lettres que si elles peuvent être vérifiées
    if (canCheckLetters) {
      // Récupérer le mot sélectionné pour la tentative actuelle
      let stockLettersElements = document.querySelectorAll(
        `.groupe${currentAttempt} .stockLetters`
      );
      let selectedWord = Array.from(stockLettersElements)
        .map((element) => element.textContent?.toUpperCase() || "")
        .join("");

      // Comparer les mots pour la tentative actuelle
      const comparisonResult = compareWords(selectedWord, wordToGuess);
      console.log("Résultat de la comparaison :", comparisonResult);

      // Vérifier les lettres pour la tentative actuelle
      checkLetters();
    } else {
      console.log(
        "Vous devez sélectionner toutes les lettres avant de vérifier."
      );
    }
  } else {
    console.log("Fin du jeu. Toutes les tentatives sont épuisées.");
    // Affichez un message ou effectuez d'autres actions lorsque les tentatives sont épuisées
  }
}

// Fonction appelée lorsqu'une lettre est sélectionnée
function selectLetter(letter) {
  if (currentIndex < wordToGuess.length && !isGuessSubmitted) {
    let currentLetterElement = attempts[currentAttempt][currentIndex];
    if (currentLetterElement) {
      currentLetterElement.textContent = letter;
      currentIndex++;

      if (currentIndex === wordToGuess.length) {
        canCheckLetters = true;
      }
    }
  }
}

function deleteLetter() {
  if (!isGuessSubmitted) {
    // Ajouter un écouteur d'événements pour détecter la touche "Backspace"
    document.addEventListener("keydown", handleDeleteKeyPress);
  }
}

function handleDeleteKeyPress(event) {
  if (event.key === "Backspace") {
    event.preventDefault(); // Empêche le comportement par défaut de la touche (comme le retour en arrière dans le navigateur)

    // Trouver l'élément correspondant à la dernière lettre saisie
    let lastIndex = currentIndex - 1;
    if (lastIndex >= 0) {
      let currentStockLetter = attempts[currentAttempt - 1][lastIndex];
      if (currentStockLetter) {
        currentStockLetter.textContent = "_";
        currentIndex--; // Décrémenter l'index pour la lettre précédente
      }
    }
  }

  // Supprimer l'écouteur d'événements après avoir traité la touche "Backspace"
  document.removeEventListener("keydown", handleDeleteKeyPress);
}

// Exemple d'utilisation de l'événement "Enter" sur le clavier virtuel
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Appeler la fonction pour gérer l'appui sur la touche "Enter"
    handleEnterKeyPress();
  }
});

// Fonction pour sélectionner un mot à deviner et l'afficher sur l'interface
function selectWord(word, attemptIndex) {
  let letters = word.split(""); // Divisez le mot en lettres

  // Sélectionnez chaque lettre dans le groupe de tentative spécifié
  for (let i = 0; i < letters.length; i++) {
    let caseElement = attempts[attemptIndex][i]; // Sélectionnez l'élément d'affichage de la lettre
    if (caseElement) {
      // Affichez la lettre de la tentative actuelle sur l'interface
      caseElement.textContent = ""; // Effacez le contenu actuel pour masquer le mot à deviner
      caseElement.classList.remove("correct", "misplaced", "incorrect"); // Réinitialisez les classes CSS

      // Vous pouvez également ajouter une classe pour masquer visuellement la lettre si nécessaire
      // caseElement.classList.add("hidden"); // Ajoutez une classe pour cacher visuellement la lettre
    }
  }
}
let targetLetters = wordToGuess.split("");
// Fonction pour vérifier les lettres sélectionnées par le joueur

function checkLetters() {
  console.log("checkLetters() called");

  if (!isGuessSubmitted && canCheckLetters) {
    console.log("Checking letters...");

    let allLettersCorrect = true; // Déterminera si toutes les lettres sont correctes

    // Retrieve the elements of each letter group
    for (let i = 0; i < maxAttempts; i++) {
      console.log(`Checking attempt ${i}`);

      let stockLettersElements = document.querySelectorAll(
        `.groupe${i} .stockLetters`
      );
      let stockLettersArray = Array.from(stockLettersElements);

      // Verify the letters in this specific group
      let selectedWord = stockLettersArray
        .map((element) => element.textContent?.toUpperCase() || "")
        .join("");
      let targetWord = wordToGuess.toUpperCase();

      console.log(`Selected word for attempt ${i}:`, selectedWord);
      console.log(`Target word for attempt ${i}:`, targetWord);

      let comparisonResult = compareWords(selectedWord, targetWord);

      console.log(`Comparison result for attempt ${i}:`, comparisonResult);

      // Apply styles based on the comparison result
      stockLettersArray.forEach((stockLetterElement, index) => {
        let letter = stockLetterElement.textContent?.toUpperCase();
        console.log(`Index: ${index}, Letter: ${letter}`);

        if (letter) {
          if (comparisonResult.correctLetters.includes(letter)) {
            stockLetterElement.classList.add("correct");
          } else if (comparisonResult.misplacedLetters.includes(letter)) {
            stockLetterElement.classList.add("misplaced");
            allLettersCorrect = false; // Une lettre est mal placée
          } else if (comparisonResult.incorrectLetters.includes(letter)) {
            stockLetterElement.classList.add("incorrect");
            allLettersCorrect = false; // Une lettre est incorrecte
          }

          // Add the flipping class to trigger the flipping animation
          stockLetterElement.classList.add("flipping");
        }
      });

      let keyboardButtons = document.querySelectorAll(".keyboard");
      comparisonResult.incorrectLetters.forEach((letter) => {
        let incorrectButton = Array.from(keyboardButtons).find(
          (button) => button.textContent === letter
        );
        handleEnterKeyPress(); // Appel de cette fonction nécessite d'être défini
        if (incorrectButton) {
          incorrectButton.classList.add("keyboard-incorrect");
        }
      });

      // Exit the loop if a guess has been submitted
      break;
    }

    if (allLettersCorrect) {
      createFireworks(); // Déclencher l'animation de feux d'artifice
      console.log("Toutes les lettres ont été correctement devinées!");
    } else {
      console.log("Au moins une lettre est incorrecte ou mal placée.");
      currentAttempt++;
      playNewAttempt(); // Démarrer une nouvelle tentative
    }
  } else {
    console.error(
      "Vous devez sélectionner toutes les lettres avant de vérifier."
    );
  }
}

// Make sure this function is called within the appropriate condition

// Écouteur d'événement pour la touche "Enter" sur le clavier virtuel
function handleEnterKeyPress() {
  if (isDeleteEnabled) {
    console.log("Touche 'Enter' pressée sur le clavier virtuel.");
    isDeleteEnabled = false; // Désactiver la suppression des lettres

    // Autres actions à effectuer lors de l'appui sur la touche "Enter"
  } else {
    console.log("Suppression des lettres désactivée.");
  }
}
function startNewAttempt() {
  // Vérifiez s'il reste des tentatives disponibles
  if (currentAttempt < maxAttempts) {
    // Déterminez l'indice du groupe pour la tentative actuelle
    const groupIndex = currentAttempt; // Démarre à 0 pour la première tentative

    // Vérifiez si le groupe pour cette tentative existe dans les tentatives
    if (groupIndex >= 0 && groupIndex < attempts.length) {
      const currentAttemptLetters = attempts[groupIndex];
      console.log(
        `Tentative ${currentAttempt} - Lettres :`,
        currentAttemptLetters
      );
      // Incrémentez le compteur de tentative pour la prochaine itération
      currentAttempt++;
      console.log(`Tentative suivante : ${currentAttempt}`);
    } else {
      console.log(`Le groupe ${groupIndex} n'existe pas dans les tentatives.`);
    }
  } else {
    console.log("Toutes les tentatives ont été utilisées.");
  }
  startNewGame();
}

function createFireworks() {
  const fireworksContainer = document.getElementById("fireworksContainer");
  const fireworksCount = 50; // Nombre de feux d'artifice à créer

  if (fireworksContainer) {
    // Créer et ajouter les feux d'artifice au conteneur
    for (let i = 0; i < fireworksCount; i++) {
      const firework = document.createElement("div");
      firework.className = "firework";

      // Position aléatoire des feux d'artifice à l'intérieur du conteneur
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.top = `${Math.random() * 100}%`;

      // Couleur aléatoire pour chaque feu d'artifice
      const randomColor = getRandomColor();
      firework.style.backgroundColor = randomColor;

      // Taille aléatoire pour chaque feu d'artifice
      const randomSize = Math.floor(Math.random() * 5) + 3; // Taille entre 3 et 7 pixels
      firework.style.width = `${randomSize}px`;
      firework.style.height = `${randomSize}px`;

      // Ajouter le feu d'artifice au conteneur
      fireworksContainer.appendChild(firework);

      // Supprimer le feu d'artifice après l'animation
      firework.addEventListener("animationend", () => {
        firework.remove();
      });
    }
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Fonction pour incrémenter le compteur et mettre à jour l'affichage
function incrementCounter() {
  counter++; // Incrémente le compteur à chaque clic
  updateCounterDisplay(); // Met à jour l'affichage du compteur
}

// Fonction pour mettre à jour l'affichage du compteur dans l'élément HTML
function updateCounterDisplay() {
  const counterElement = document.getElementById("counter"); // Sélectionne l'élément du compteur par son ID
  if (counterElement) {
    counterElement.textContent = counter; // Met à jour le contenu de l'élément avec la valeur du compteur
  }
}
// Appeler la fonction createFireworks pour démarrer l'animation de feux d'artifice
createFireworks();

// Exemple d'utilisation de l'événement "Enter" sur le clavier virtuel
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Appeler la fonction pour gérer l'appui sur la touche "Enter"
    handleEnterKeyPress();
  }
});
// Exemple d'utilisation de l'événement "Enter" sur le clavier virtuel
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Appeler la fonction pour gérer l'appui sur la touche "Enter"
    handleDeleteKeyPress();
  }
});

const easyButton = document.getElementById("easyButton"); // Replace 'easyButton' with the actual id of your button

if (easyButton) {
  easyButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(wordsEasy);
    console.log("Mot facile sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("easyButton is null");
}

// Écouteur d'événement pour le bouton "Moyen"
const mediumButton = document.querySelector(".difficulty.medium");

if (mediumButton) {
  mediumButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(wordsMedium);
    console.log("Mot intermédiaire sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("mediumButton is null");
}

// Écouteur d'événement pour le bouton "Difficile"
const hardButton = document.querySelector(".difficulty.hard");
if (hardButton) {
  hardButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(wordsHard);
    console.log("Mot difficile sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("hardButton is null");
}
