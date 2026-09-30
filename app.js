/* ============================================================
   ΚΡΕΜΑΛΑ — ΧΩΡΙΑ ΕΠΑΡΧΙΑΣ ΦΑΡΣΑΛΩΝ
   Background-image based hangman
   ============================================================ */

/* ------------------------------------------------------------
   ΣΤΑΘΕΡΕΣ ΚΑΙ ΜΕΤΑΒΛΗΤΕΣ ΠΑΙΧΝΙΔΙΟΥ
   ------------------------------------------------------------ */
const HANGMAN_WIDTH_REF  = 100;
const HANGMAN_HEIGHT_REF = 207;

/* ------------------------------------------------------------
   ΛΕΞΕΙΣ ΜΕ ΕΠΕΞΗΓΗΣΕΙΣ
   ------------------------------------------------------------ */
const wordData = [
    { word: "Άγιος Γεώργιος Φαρσάλων", explanation: "Παλιά ονομασία: Κουτουκλάρ (Kütükler). Σημασία: Σημαίνει «Κούτσουρα» ή «Κορμοί δέντρων» (Kütük = κούτσουρο), πιθανόν λόγω υλοτομίας στην περιοχή." },
    { word: "Άγιος Κωνσταντίνος", explanation: "Παλιά ονομασία: Χατζήμπεη (Hacıbey). Σημασία: «Ο Χατζής Μπέης» (Τίτλος τιμής: Χατζής είναι ο προσκυνητής της Μέκκας και Μπέης ο άρχοντας/αξιωματούχος)." },
    { word: "Αμπελιά", explanation: "Παλιά ονομασία: Δερεκλί (Derekli). Σημασία: «Το χωριό στο ρέμα» ή «Αυτό που έχει ρέματα» (Dere = ρέμα)." },
    { word: "Ανωχώρι", explanation: "Παλιά ονομασία: Άνω Τσιαχμάτι. Σημασία: Άγνωστη ετυμολογία (πιθανόν παραφθορά ονόματος μπέη ή τοπικού ιδιώματος)." },
    { word: "Ασπρόγεια", explanation: "Παλιά ονομασία: Ιρινί ή Τεκές Ιρινί. Σημασία: Αναφέρεται στον Τεκέ (μοναστήρι των Μπεκτασήδων δερβίσηδων) που υπήρχε εκεί. Το «Ιρινί» πιθανόν είναι όνομα ή τοπωνύμιο." },
    { word: "Αχιλλείο", explanation: "Παλιά ονομασία: Δουβλατάν (Douvlatan). Σημασία: Δεν είναι τουρκική λέξη. Πιθανότατα σλαβικής ή βλάχικης προέλευσης, σχετιζόμενη με τη λέξη για την «πολιτεία» ή την «εξουσία»." },
    { word: "Βαμβακού", explanation: "Παλιά ονομασία: Μπαϊρακλί (Bayraklı). Σημασία: «Σημαιοφόρος» ή «Τόπος με σημαία» (Bayrak = σημαία). Συνήθως έδρα φρουράς." },
    { word: "Βασιλικά", explanation: "Παλιά ονομασία: Σακάλαρ (Sakalar). Σημασία: «Οι Νεροκουβαλητές» (Saka = νερουλάς, μεταφορέας νερού στον στρατό)." },
    { word: "Βρυσιά", explanation: "Παλιά ονομασία: Μπαλακλί (Balakli). Σημασία: Είτε «Το χωριό με τα βουβάλια/μοσχάρια» (Balak = μικρό βουβάλι) είτε παραφθορά του Balıklı («Ψαράδικα»)." },
    { word: "Δασόλοφος", explanation: "Παλιά ονομασία: Μπεκήδες (Bekides). Σημασία: «Οι Μπέηδες» (Πληθυντικός του Μπέης = Άρχοντας/Διοικητής)." },
    { word: "Δένδρα", explanation: "Παλιά ονομασία: Σιατερλί. Σημασία: Αβέβαιη (πιθανόν παραφθορά του Seterli = αυτός που έχει κάλυμμα/πέπλο;)." },
    { word: "Δίλοφος", explanation: "Παλιά ονομασία: Χατζηαμάρ. Σημασία: «Ο Χατζής Ομάρ» (Ονομασία ιδιοκτήτη τσιφλικιού)." },
    { word: "Ερέτρια", explanation: "Παλιά ονομασία: Τσαγκλί ή Τζανλί (Çanglı/Canlı). Σημασία: «Ζωντανός/Ψυχωμένος» (Canlı) ή «Αυτό που έχει καμπάνα/κουδούνι» (Çan)." },
    { word: "Ευύδριο (Μεγάλο)", explanation: "Παλιά ονομασία: Γουσγουνάρια (Gusgunari). Σημασία: Προέρχεται από το τουρκικό Kuşkonar που σημαίνει «Εκεί που προσγειώνονται τα πουλιά» ή από τη λέξη Kuşkun που είναι το εξάρτημα της σέλας (υπόρινο) του αλόγου." },
    { word: "Ζωοδόχος Πηγή", explanation: "Παλιά ονομασία: Τατάρ (Tatar). Σημασία: «Τάταρος». Αναφορά στην εθνότητα των Τατάρων (πιθανόν μισθοφόροι ή έποικοι από την Κριμαία/Ανατολή)." },
    { word: "Θετίδιο", explanation: "Παλιά ονομασία: Αλχανί. Σημασία: Πιθανόν «Το Χάνι του Αλή» (Ali Hani) ή «Κόκκινο Χάνι» (Al = κόκκινο + Han)." },
    { word: "Καλλιθέα", explanation: "Παλιά ονομασία: Κουλούρι. Σημασία: Περιγραφικό όνομα λόγω σχήματος λόφου ή τοποθεσίας." },
    { word: "Κάτωχωρι", explanation: "Παλιά ονομασία: Κάτω Τσιαχμάτι. Σημασία: Βλ. Ανωχώρι." },
    { word: "Κρήνη", explanation: "Παλιά ονομασία: Δρίσκολη. Σημασία: Πιθανότατα αρβανίτικης ή σλαβικής ρίζας, δεν έχει προφανή τουρκική ερμηνεία." },
    { word: "Λόφος", explanation: "Παλιά ονομασία: Τζαμαλί (Camali). Σημασία: Προέρχεται από το όνομα «Τζεμάλ» (Cemal = ομορφιά/χάρη) ή σχετίζεται με το «Τζαμί» (Cami)." },
    { word: "Ναρθάκι", explanation: "Παλιά ονομασία: Κιογκιόζ (Göygöz). Σημασία: «Γαλανομάτης» (Gök = ουρανός/μπλε, Göz = μάτι). Επίσης σημαίνει και «ματιασμένος» ή «αλληθωρος» σε διαλέκτους." },
    { word: "Νεράιδα", explanation: "Παλιά ονομασία: Κινηκλί ή Κεσερλί. Σημασία: Το Κεσερλί (Keserli) σημαίνει «Αυτός που κόβει» (από το keser = σκεπάρνι) ή περιοχή με απότομες τομές." },
    { word: "Ξυλάδες", explanation: "Παλιά ονομασία: Γενιτσαροχώρι. Σημασία: «Το χωριό των Γενιτσάρων» (του επίλεκτου σώματος του οθωμανικού στρατού)." },
    { word: "Παλαιόμυλος", explanation: "Παλιά ονομασία: Ινελί (İneli). Σημασία: «Αυτό που έχει σπηλιά» (İn = σπηλιά/φωλιά) ή «Βελονωτό» (İğneli)." },
    { word: "Πολυδάμειο", explanation: "Παλιά ονομασία: Καραμπαϊράμ. Σημασία: «Μαύρο Μπαϊράμι» (Kara = μαύρος, Bayram = γιορτή). Πιθανόν συνδέεται με κάποιο δυσάρεστο γεγονός που συνέβη μέρα γιορτής." },
    { word: "Πολυνέρι", explanation: "Παλιά ονομασία: Σιμικλί (Semikli / Simekli). Σημασία: Ασαφής. Αν προέρχεται από το Semiz σημαίνει «Παχύς/Γεμάτος»." },
    { word: "Ρευματιά", explanation: "Παλιά ονομασία: Σέχι. Σεΐχης (Şeyh): Που σημαίνει πνευματικός ηγέτης ή δάσκαλος (συνήθως στον Σουφισμό) και υποδηλώνει την ύπαρξη ενός σημαντικού θρησκευτικού προσώπου ή τεκέ (μοναστήρι) στην περιοχή." },
    { word: "Ρήγαιο", explanation: "Παλιά ονομασία: Αϊβαλί (Ayvalı). Σημασία: «Κυδωνιές» ή «Τόπος με κυδώνια» (Ayva = κυδώνι)." },
    { word: "Σιτόχωρο", explanation: "Παλιά ονομασία: Λαζαρμπούγα. Σημασία: Σύνθετη λέξη. «Λάζαρος» + «Μπουγάς» (Boğa = Ταύρος). Πιθανόν παρωνύμιο κάποιου ισχυρού ντόπιου." },
    { word: "Σκοπιά", explanation: "Παλιά ονομασία: Ταμπακλί (Tabakli). Σημασία: «Βυρσοδεψεία» ή «Τόπος των βυρσοδεψών» (Tabak = βυρσοδέψης)." },
    { word: "Σκοτούσσα", explanation: "Παλιά ονομασία: Κουλαξίζ (Kulaksız). Σημασία: «Χωρίς αυτιά» (Kulak = αυτί, -sız = χωρίς). Χρησιμοποιούνταν για να περιγράψει κάτι ατελές ή ως παρατσούκλι." },
    { word: "Σταυρός", explanation: "Παλιά ονομασία: Δεμερλί (Demirli). Σημασία: «Σιδερένιος» ή «Αγκυροβολημένος» (Demir = σίδερο). Αναφέρεται συχνά σε τοποθεσίες με σιδηροδρομική γραμμή (σιδηρόδρομος) ή γέφυρα." },
    { word: "Υπέρεια", explanation: "Παλιά ονομασία: Κετσελί ή Κισλάρ. Σημασία: Κετσελί (Keçeli) = «Αυτός που φοράει τσόχα/κετσέ» ή «Αυτός που έχει κατσίκια» (Keçi). Το Κισλάρ (Kışlar) σημαίνει «Χειμαδιά»." },
    { word: "Χαλκιάδες", explanation: "Παλιά ονομασία: Καραδεμερτζή (Karademirci). Σημασία: «Ο Μαύρος Σιδηρουργός» (Kara = μαύρος, Demirci = σιδεράς)." },
    { word: "Φάρσαλα (Πόλη)", explanation: "Παλιά ονομασία: Τσάταλτζα (Çatalca). Σημασία: «Δίχαλο» ή «Διχαλωτή». Οφείλεται στη μορφολογία του εδάφους ή στο ότι η πόλη απλωνόταν ανάμεσα σε δύο υψώματα (Προφήτης Ηλίας και Κάστρο)." }
];

/* Ελληνικό αλφάβητο (χωρίς τόνους) */
const greekAlphabet = 'αβγδεζηθικλμνξοπρστυφχψω';

/* ------------------------------------------------------------
   DOM ELEMENTS
   ------------------------------------------------------------ */
const lettersArea           = document.getElementById('lettersArea');
const alphabetArea          = document.getElementById('alphabetArea');
const scoreArea             = document.getElementById('scoreArea');
const backgroundImage       = document.getElementById('backgroundImage');
const imageContainer        = document.getElementById('imageContainer');
const hangmanWrapper        = document.getElementById('hangmanWrapper');
const lostText              = document.getElementById('lostText');
const winText               = document.getElementById('winText');
const winImage              = document.getElementById('winImage');
const scrollingTextContainer = document.getElementById('scrollingTextContainer');
const scrollingText         = document.getElementById('scrollingText');
const wordDisplay           = document.getElementById('wordDisplay');
const explanationDisplay    = document.getElementById('explanationDisplay');
const message               = document.getElementById('message');
const attempts              = document.getElementById('attempts');
const usedLetters           = document.getElementById('usedLetters');
const keyboard              = document.getElementById('keyboard');
const splashScreen          = document.getElementById('splashScreen');
const wordDisplayContainer  = document.getElementById('wordDisplayContainer');
const keyboardContainer     = document.getElementById('keyboardContainer');
const gameStatus            = document.getElementById('gameStatus');
const gameOverButtons       = document.getElementById('gameOverButtons');
const playAgainBtn          = document.getElementById('playAgainBtn');
const returnBtn             = document.getElementById('returnBtn');

/* ------------------------------------------------------------
   ΚΑΤΑΣΤΑΣΗ ΠΑΙΧΝΙΔΙΟΥ
   ------------------------------------------------------------ */
let gameState = {
    currentError: 0,
    maxErrors: 7,
    isPlaying: false,
    isSwinging: false,
    hasWon: false,
    hasLost: false,
    selectedWordData: null,
    selectedWord: '',
    selectedWordNormalized: '',
    guessedLetters: [],
    wrongAttempts: 0,
    gameOver: false
};

/* Λίστα για παρακολούθηση χρησιμοποιημένων λέξεων */
let usedWordIndices = [];
let availableIndices = [...Array(wordData.length).keys()];

/* ------------------------------------------------------------
   ΣΥΝΤΕΤΑΓΜΕΝΕΣ ΓΙΑ ΤΑ ΜΕΡΗ ΤΟΥ HANGMAN
   ------------------------------------------------------------ */
const hangmanCoordinates = {
    container2: { x1: 0,  y1: 2,   x2: 99, y2: 207, type: 'rect' },
    fixedBeam:  { x1: 40, y1: 0,   x2: 60, y2: 35,  type: 'rect' },
    rope:       { x1: 31, y1: 35,  x2: 67, y2: 80,  type: 'rect' },
    center:     { x: 47,  y: 22,   radius: 1,       type: 'circle' },
    head:       { x1: 23, y1: 73,  x2: 81, y2: 110, type: 'rect' },
    body:       { x1: 43, y1: 106, x2: 57, y2: 146, type: 'rect' },
    rightHand:  { x1: 56, y1: 98,  x2: 95, y2: 156, type: 'rect' },
    leftHand:   { x1: 5,  y1: 98,  x2: 47, y2: 156, type: 'rect' },
    rightFoot:  { x1: 47, y1: 140, x2: 76, y2: 198, type: 'rect' },
    leftFoot:   { x1: 22, y1: 138, x2: 49, y2: 198, type: 'rect' }
};

/* ΧΑΡΤΟΓΡΑΦΗΣΗ ΜΕΡΩΝ ΣΕ IDs */
const partElementIds = {
    fixedBeam: 'fixedBeamPart',
    rope:      'ropePart',
    head:      'headPart',
    body:      'bodyPart',
    rightHand: 'rightHandPart',
    leftHand:  'leftHandPart',
    rightFoot: 'rightFootPart',
    leftFoot:  'leftFootPart'
};

/* ΑΚΟΛΟΥΘΙΑ ΣΦΑΛΜΑΤΩΝ */
const errorPartsSequence = [
    'ropePart',
    'headPart',
    'bodyPart',
    'rightHandPart',
    'leftHandPart',
    'rightFootPart',
    'leftFootPart'
];

/* ΣΥΝΤΕΤΑΓΜΕΝΕΣ ΓΙΑ ΣΤΑΤΙΚΕΣ ΠΕΡΙΟΧΕΣ */
const originalCoordinates = {
    container: { x1: 1,   y1: -1,  x2: 799, y2: 799 },
    letters:   { x1: 211, y1: 367, x2: 785, y2: 638 },
    alphabet:  { x1: 16,  y1: 675, x2: 786, y2: 786 },
    score:     { x1: 14,  y1: 13,  x2: 348, y2: 169 }
};

/* ============================================================
   ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ
   ============================================================ */
function normalizeGreekText(text) {
    return text
        .toLowerCase()
        .replace(/[άἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ]/g, 'α')
        .replace(/[έἐἑἒἓἔἕὲέ]/g, 'ε')
        .replace(/[ήἠἡἢἣἤἥἦἧὴήᾐᾑᾒᾓᾔᾕᾖᾗῂῃῄῆῇ]/g, 'η')
        .replace(/[ίἰἱἲἳἴἵὶίϊΐῐῑῒΐῖῗ]/g, 'ι')
        .replace(/[όὀὁὂὃὄὅὸό]/g, 'ο')
        .replace(/[ύὐὑὒὓὔὕὖὗὺύϋΰῠῡῢΰῦῧ]/g, 'υ')
        .replace(/[ώὠὡὢὣὤὥὦὧὼώᾠᾡᾢᾣᾤᾥᾦᾧῲῳῴῶῷ]/g, 'ω')
        .replace(/ς/g, 'σ');
}

function getClipPathForCoord(coord) {
    if (coord.type === 'rect') {
        const x1 = (coord.x1 / HANGMAN_WIDTH_REF) * 100;
        const y1 = (coord.y1 / HANGMAN_HEIGHT_REF) * 100;
        const x2 = (coord.x2 / HANGMAN_WIDTH_REF) * 100;
        const y2 = (coord.y2 / HANGMAN_HEIGHT_REF) * 100;

        return `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`;
    }
    return 'none';
}

function calculateRelativePercentages() {
    const containerWidth  = originalCoordinates.container.x2 - originalCoordinates.container.x1;
    const containerHeight = originalCoordinates.container.y2 - originalCoordinates.container.y1;

    const calculateAreaPercentages = (area) => ({
        left:   ((area.x1 - originalCoordinates.container.x1) / containerWidth) * 100,
        top:    ((area.y1 - originalCoordinates.container.y1) / containerHeight) * 100,
        width:  ((area.x2 - area.x1) / containerWidth) * 100,
        height: ((area.y2 - area.y1) / containerHeight) * 100
    });

    return {
        letters:  calculateAreaPercentages(originalCoordinates.letters),
        alphabet: calculateAreaPercentages(originalCoordinates.alphabet),
        score:    calculateAreaPercentages(originalCoordinates.score)
    };
}

function applyAreaStyles(element, percentages) {
    element.style.left   = percentages.left + '%';
    element.style.top    = percentages.top + '%';
    element.style.width  = percentages.width + '%';
    element.style.height = percentages.height + '%';
}

function applyHangedManClips() {
    for (const partName in hangmanCoordinates) {
        if (partName === 'container2' || partName === 'center') continue;

        const elementId = partElementIds[partName];
        const element = document.getElementById(elementId);

        if (element) {
            const clipPath = getClipPathForCoord(hangmanCoordinates[partName]);
            element.style.clipPath = clipPath;

            if (partName === 'fixedBeam') {
                element.style.display = 'block';
                element.style.opacity = '1';
                element.style.animation = 'none';
            }
        }
    }
}

function setupGameElements() {
    const lettersPercentages = calculateRelativePercentages().letters;
    wordDisplayContainer.style.left   = lettersPercentages.left + '%';
    wordDisplayContainer.style.top    = lettersPercentages.top + '%';
    wordDisplayContainer.style.width  = lettersPercentages.width + '%';
    wordDisplayContainer.style.height = lettersPercentages.height + '%';

    scrollingTextContainer.style.left   = lettersPercentages.left + '%';
    scrollingTextContainer.style.top    = (lettersPercentages.top - 10) + '%';
    scrollingTextContainer.style.width  = lettersPercentages.width + '%';
    scrollingTextContainer.style.height = '60px';

    const alphabetPercentages = calculateRelativePercentages().alphabet;
    keyboardContainer.style.left   = alphabetPercentages.left + '%';
    keyboardContainer.style.top    = alphabetPercentages.top + '%';
    keyboardContainer.style.width  = alphabetPercentages.width + '%';
    keyboardContainer.style.height = alphabetPercentages.height + '%';

    const scorePercentages = calculateRelativePercentages().score;
    gameStatus.style.left   = scorePercentages.left + '%';
    gameStatus.style.top    = scorePercentages.top + '%';
    gameStatus.style.width  = scorePercentages.width + '%';
    gameStatus.style.height = scorePercentages.height + '%';

    gameOverButtons.style.left  = scorePercentages.left + '%';
    gameOverButtons.style.top   = (scorePercentages.top + scorePercentages.height + 10) + '%';
    gameOverButtons.style.width = scorePercentages.width + '%';
}

function applyRelativePercentages() {
    const percentages = calculateRelativePercentages();

    applyAreaStyles(lettersArea,  percentages.letters);
    applyAreaStyles(alphabetArea, percentages.alphabet);
    applyAreaStyles(scoreArea,    percentages.score);

    hangmanWrapper.style.width  = HANGMAN_WIDTH_REF + 'px';
    hangmanWrapper.style.height = HANGMAN_HEIGHT_REF + 'px';

    const centerCoord = hangmanCoordinates.center;
    const originXPercent = (centerCoord.x / HANGMAN_WIDTH_REF) * 100;
    const originYPercent = (centerCoord.y / HANGMAN_HEIGHT_REF) * 100;
    hangmanWrapper.style.transformOrigin = `${originXPercent}% ${originYPercent}%`;

    applyHangedManClips();
    setupGameElements();
}

/* ============================================================
   ΣΥΝΑΡΤΗΣΕΙΣ ΠΑΙΧΝΙΔΙΟΥ
   ============================================================ */
function getRandomWordIndex() {
    if (availableIndices.length === 0) {
        availableIndices = [...Array(wordData.length).keys()];
        usedWordIndices = [];
    }

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const wordIndex = availableIndices[randomIndex];

    availableIndices.splice(randomIndex, 1);
    usedWordIndices.push(wordIndex);

    return wordIndex;
}

function initGame() {
    const wordIndex = getRandomWordIndex();
    gameState.selectedWordData = wordData[wordIndex];
    gameState.selectedWord = gameState.selectedWordData.word;
    gameState.selectedWordNormalized = normalizeGreekText(gameState.selectedWord);

    gameState.guessedLetters = [];
    gameState.wrongAttempts = 0;
    gameState.gameOver = false;
    gameState.currentError = 0;
    gameState.isPlaying = true;
    gameState.hasWon = false;
    gameState.hasLost = false;

    resetHangman();
    updateWordDisplay();
    updateAttempts();
    updateUsedLetters();

    message.textContent = '';
    message.className = 'message';

    wordDisplay.style.display = 'flex';
    explanationDisplay.style.display = 'none';
    scrollingTextContainer.style.display = 'none';
    gameOverButtons.style.display = 'none';

    createKeyboard();

    lostText.style.display = 'none';
    winText.style.display = 'none';
    winImage.classList.remove('visible', 'move-right');
}

function createKeyboard() {
    keyboard.innerHTML = '';

    for (let letter of greekAlphabet) {
        const button = document.createElement('button');
        button.className = 'letter-btn';
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        keyboard.appendChild(button);
    }
}

function guessLetter(letter) {
    if (gameState.gameOver || gameState.guessedLetters.includes(letter)) return;

    gameState.guessedLetters.push(letter);
    updateUsedLetters();

    const button = Array.from(keyboard.children).find(btn => btn.textContent === letter);

    if (gameState.selectedWordNormalized.includes(letter)) {
        button.classList.add('correct');
        message.textContent = 'Σωστό!';
        message.className = 'message';
    } else {
        button.classList.add('wrong');
        gameState.wrongAttempts++;
        gameState.currentError = gameState.wrongAttempts;
        message.textContent = 'Λάθος!';
        message.className = 'message';
        updateAttempts();
        showHangmanPart(gameState.wrongAttempts);
    }

    updateWordDisplay();
    checkGameStatus();
}

function updateWordDisplay() {
    const wordDisplayElement = document.getElementById('wordDisplay');
    wordDisplayElement.innerHTML = '';

    const wordParts = gameState.selectedWord.split(' ');

    if (wordParts.length > 1) {
        wordParts.forEach(word => {
            const row = document.createElement('div');
            row.className = 'word-row';

            for (let i = 0; i < word.length; i++) {
                const originalChar = word[i];
                const normalizedChar = normalizeGreekText(originalChar);
                const charSpan = document.createElement('span');

                if (gameState.guessedLetters.includes(normalizedChar)) {
                    charSpan.textContent = originalChar + ' ';
                } else {
                    charSpan.textContent = '_ ';
                }

                row.appendChild(charSpan);
            }
            wordDisplayElement.appendChild(row);
        });
    } else {
        const row = document.createElement('div');
        row.className = 'word-row';

        for (let i = 0; i < gameState.selectedWord.length; i++) {
            const originalChar = gameState.selectedWord[i];
            const normalizedChar = normalizeGreekText(originalChar);
            const charSpan = document.createElement('span');

            if (gameState.guessedLetters.includes(normalizedChar)) {
                charSpan.textContent = originalChar + ' ';
            } else {
                charSpan.textContent = '_ ';
            }

            row.appendChild(charSpan);
        }
        wordDisplayElement.appendChild(row);
    }
}

function updateAttempts() {
    attempts.textContent = 7 - gameState.wrongAttempts;
}

function updateUsedLetters() {
    const wrongLetters = gameState.guessedLetters.filter(letter =>
        !gameState.selectedWordNormalized.includes(letter)
    );
    usedLetters.textContent = wrongLetters.join(', ');
}

function checkGameStatus() {
    const wordWithoutSpaces = gameState.selectedWordNormalized.replace(/\s/g, '');
    const guessedWithoutSpaces = gameState.guessedLetters.filter(letter =>
        wordWithoutSpaces.includes(letter)
    );

    const won = wordWithoutSpaces.split('').every(letter =>
        guessedWithoutSpaces.includes(letter)
    );

    if (won) {
        message.textContent = 'Συγχαρητήρια! Κέρδισες!';
        message.className = 'message win';
        gameState.gameOver = true;
        gameState.hasWon = true;
        winGame();
        return;
    }

    if (gameState.wrongAttempts >= 7) {
        message.textContent = `Έχασες! Η λέξη ήταν: ${gameState.selectedWord}`;
        message.className = 'message lose';
        gameState.gameOver = true;
        gameState.hasLost = true;
        loseGame();

        const wordDisplayElement = document.getElementById('wordDisplay');
        wordDisplayElement.innerHTML = '';

        const wordParts = gameState.selectedWord.split(' ');

        if (wordParts.length > 1) {
            wordParts.forEach(word => {
                const row = document.createElement('div');
                row.className = 'word-row';

                for (let i = 0; i < word.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = word[i] + ' ';
                    row.appendChild(charSpan);
                }
                wordDisplayElement.appendChild(row);
            });
        } else {
            const row = document.createElement('div');
            row.className = 'word-row';

            for (let i = 0; i < gameState.selectedWord.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = gameState.selectedWord[i] + ' ';
                row.appendChild(charSpan);
            }
            wordDisplayElement.appendChild(row);
        }
    }
}

/* ============================================================
   HANGMAN ANIMATION
   ============================================================ */
function showHangmanPart(errorNumber) {
    if (errorNumber > 0 && errorNumber <= errorPartsSequence.length) {
        const partId = errorPartsSequence[errorNumber - 1];
        const partElement = document.getElementById(partId);

        if (partElement) {
            partElement.style.display = 'block';
            setTimeout(() => {
                partElement.style.opacity = '1';
            }, 10);
        }
    }
}

function resetHangman() {
    gameState.isSwinging = false;
    hangmanWrapper.classList.remove('swinging', 'swinging-initial', 'fade-out');
    hangmanWrapper.style.transform = 'rotate(0deg)';

    errorPartsSequence.forEach(partId => {
        const partElement = document.getElementById(partId);
        if (partElement) {
            partElement.style.display = 'none';
            partElement.style.opacity = '0';
        }
    });

    const fixedBeam = document.getElementById('fixedBeamPart');
    if (fixedBeam) {
        fixedBeam.style.display = 'block';
        fixedBeam.style.opacity = '1';
    }
}

function loseGame() {
    if (!gameState.isPlaying) return;

    gameState.isPlaying = false;
    gameState.isSwinging = true;

    hangmanWrapper.style.transform = 'rotate(0deg)';
    hangmanWrapper.classList.add('swinging-initial');

    setTimeout(() => {
        lostText.style.display = 'block';
    }, 500);

    setTimeout(() => {
        hangmanWrapper.classList.remove('swinging-initial');
        hangmanWrapper.classList.add('swinging');

        setTimeout(() => {
            gameOverButtons.style.display = 'flex';
        }, 1000);
    }, 1000);
}

function winGame() {
    if (!gameState.isPlaying) return;

    gameState.isPlaying = false;

    hangmanWrapper.classList.remove('swinging', 'swinging-initial');
    hangmanWrapper.classList.add('fade-out');

    scrollingText.textContent = gameState.selectedWord + " - " + gameState.selectedWord + " - " + gameState.selectedWord + " - " + gameState.selectedWord;
    scrollingTextContainer.style.display = 'block';

    wordDisplay.style.display = 'none';
    explanationDisplay.textContent = gameState.selectedWordData.explanation;
    explanationDisplay.style.display = 'block';

    setTimeout(() => {
        winImage.classList.add('visible');
        winImage.classList.add('move-right');
        winText.style.display = 'block';

        const timestamp = new Date().getTime();
        winImage.src = 'https://github.com/conchr/Hangman-Original/raw/main/Hangman%20run.gif?' + timestamp;

        setTimeout(() => {
            gameOverButtons.style.display = 'flex';
        }, 1000);
    }, 1000);
}

/* ============================================================
   ACTIONS
   ============================================================ */
function playAgain() {
    initGame();
}

function returnToGames() {
    window.location.href = 'https://conchr.github.io/Games/';
}

/* ============================================================
   CROSS-FADE
   ============================================================ */
function startCrossFade() {
    splashScreen.classList.add('fade-out');

    setTimeout(() => {
        imageContainer.classList.add('fade-in');
    }, 300);

    setTimeout(() => {
        splashScreen.style.display = 'none';
        applyRelativePercentages();
    }, 1800);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
window.addEventListener('resize', applyRelativePercentages);
backgroundImage.addEventListener('load', applyRelativePercentages);

document.addEventListener('keydown', function (event) {
    if (gameState.gameOver) return;

    const key = event.key.toLowerCase();
    if (greekAlphabet.includes(key)) {
        guessLetter(key);
    }
});

playAgainBtn.addEventListener('click', playAgain);
returnBtn.addEventListener('click', returnToGames);

/* ============================================================
   INIT
   ============================================================ */
setTimeout(() => {
    startCrossFade();
}, 3000);

window.addEventListener('load', function () {
    initGame();
});