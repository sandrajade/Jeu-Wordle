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
const wordseasy = [
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
const wordsmedium = [
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
const wordshard = [
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
let selectedWord; // Mot sélectionné pour la partie en cours

// Définition des boutons de difficulté
const easyButtonElement = document.querySelector(".wordseasy");
const mediumButtonElement = document.querySelector(".wordsmedium");
const hardButtonElement = document.querySelector(".wordshard");

// Utiliser easyButtonElement dans votre code
if (easyButtonElement) {
  easyButtonElement.addEventListener("click", () => {
    // Gestionnaire d'événements onclick pour le bouton easy
    startNewGame(NIVEAU_FACILE);
  });
}

if (mediumButtonElement) {
  mediumButtonElement.addEventListener("click", () => {
    startNewGame(NIVEAU_INTERMEDIAIRE); // Démarrer un nouveau jeu avec la difficulté intermédiaire
  });
}

if (hardButtonElement) {
  hardButtonElement.addEventListener("click", () => {
    startNewGame(NIVEAU_DIFFICILE); // Démarrer un nouveau jeu avec la difficulté difficile
  });
}

// Fonction pour démarrer une nouvelle partie en fonction de la difficulté choisie
function startNewGame(difficulty) {
  let selectedWord;

  // Sélectionner un mot aléatoire en fonction du niveau de difficulté
  switch (difficulty) {
    case NIVEAU_FACILE:
      selectedWord = selectRandomWord(wordseasy);
      console.log("Mot facile sélectionné :", selectedWord);
      break;
    case NIVEAU_INTERMEDIAIRE:
      selectedWord = selectRandomWord(wordsmedium);
      console.log("Mot intermédiaire sélectionné :", selectedWord);
      break;
    case NIVEAU_DIFFICILE:
      selectedWord = selectRandomWord(wordshard);
      console.log("Mot difficile sélectionné :", selectedWord);
      break;
    default:
      console.error("Niveau de difficulté non reconnu :", difficulty);
      return; // Arrêter l'exécution si le niveau de difficulté n'est pas valide
  }

  // Réinitialiser le jeu ou effectuer d'autres actions nécessaires après le choix de la difficulté
  // displayNewWord(selectedWord);
}

startNewGame();
// Fonction pour sélectionner un mot aléatoire dans un tableau de mots
function selectRandomWord(wordsArray) {
  // Vérifier si wordsArray est défini et est un tableau
  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    console.error("Le tableau de mots est invalide ou vide");
    return null; // ou une autre valeur de retour appropriée
  }

  return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}
selectRandomWord();

// Définition des fonctions easy(), medium() et hard() pour les actions spécifiques
displayNewWord();
// Attacher les événements une fois que le DOM est chargé
function resetAttempts() {
  // Réinitialiser les variables de jeu
  attempts = [];
  console.log("Tentatives réinitialisées.");
  currentAttempt = 0;
  console.log("Compteur de tentatives réinitialisé.");

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

// Définition de la fonction selectRandomWord

// Fonction pour afficher le mot à deviner dans l'interface
function displayNewWord(word) {
  const wordDisplayElement = document.getElementById("wordToGuess");
  if (wordDisplayElement) {
    wordDisplayElement.textContent = word; // Mettre à jour l'élément HTML avec le nouveau mot
  }
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
    counterElement.textContent = counter.toString(); // Met à jour le contenu de l'élément avec la valeur du compteur
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
// Écouteur d'événement pour le bouton "Facile"
const easyButton = document.querySelector(".easy");
if (easyButton) {
  easyButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(easy); // Utiliser wordsEasy ici
    console.log("Mot facile sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("easyButton is null");
}

// Écouteur d'événement pour le bouton "Moyen"
const mediumButton = document.querySelector(".medium");
if (mediumButton) {
  mediumButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(medium); // Utiliser wordsMedium ici
    console.log("Mot intermédiaire sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("mediumButton is null");
}

// Écouteur d'événement pour le bouton "Difficile"
const hardButton = document.querySelector(".hard");
if (hardButton) {
  hardButton.addEventListener("click", () => {
    const selectedWord = selectRandomWord(hard); // Utiliser wordsHard ici
    console.log("Mot difficile sélectionné :", selectedWord);
    // Vous pouvez maintenant utiliser le mot sélectionné comme nécessaire
  });
} else {
  console.error("hardButton is null");
}
// Fonction pour afficher le mot à deviner dans l'interface
function displayNewWord(word) {
  const wordDisplayElement = document.getElementById("wordToGuess");
  if (wordDisplayElement) {
    wordDisplayElement.textContent = word; // Mettre à jour l'élément HTML avec le nouveau mot
  }
}
