# La méthodologie du cas pratique — parcours en autonomie (BTS Banque, VOJES, bloc 4)

Site web statique (HTML, CSS, JavaScript) : aucune installation, aucun serveur, aucun compte pour les apprenants.
Le contenu reprend votre support apprenant (`Méthodologie cas pratique.doc`) et votre cours corrigé (`Méthodologie cas pratique Corrigé.doc`) :
une introduction et 3 parties, soit 13 étapes, avec une évaluation diagnostique (7 affirmations vrai/faux), un quiz final (12 questions, 4 par partie,
avec un résultat « acquis / à consolider / à revoir » pour chaque partie) et un bilan à rendre.

| Partie | Titre | Étapes |
|---|---|---|
| Introduction | Comprendre la méthode du cas pratique | 1 |
| Partie 1 | La méthode pas à pas, à partir d'un cas simple (Fadila et Sam) | 5 |
| Partie 2 | Un cas pratique guidé à résoudre (le crédit impayé) | 5 |
| Partie 3 | Un cas pratique à résoudre en autonomie (les époux Vasseur) | 2 |

Les consignes, tableaux, propositions, annexes, astuces, réponses attendues et modèles de rédaction sont ceux de vos deux fichiers
(quelques coquilles et accents ont été corrigés ; la liste vous a été communiquée à la livraison).
**Durée affichée** sur l'accueil (« durées prévues en classe, données à titre indicatif ») : environ **1 h 35**, soit les 25 min de méthodologie et les 70 min de cas pratique guidé prévues à la séance 10 de votre progression pédagogique
(« Je maîtrise la méthodologie du cas pratique », 2 h ; le rappel, les conseils et la synthèse de 5 + 15 + 5 min sont animés par l'enseignant). Cette progression ne détaille pas la durée de chaque partie : seule la durée totale est affichée.
Pour la modifier ou ajouter une durée par partie : `js/content.js`, repères `"dureeTotale"` (total) et `"duree"` (à ajouter dans une partie, par exemple `"duree": "30 min"`).
Ne sont pas repris : le bandeau d'accueil du support (image avec l'adresse et le QR code de l'Arcade), remplacé par la rubrique « Pour réviser en jouant » de l'accueil
(voir la partie 3 ci-dessous).

## 1. Mettre le site en ligne avec GitHub Pages

1. Connectez-vous à GitHub, puis **New repository** (nom au choix, par exemple `LMS_Methodologie_Cas_pratique`). Choisissez **Public**
   (GitHub Pages gratuit sur un compte personnel). Ne réutilisez pas le dépôt d'un autre cours : ce site a ses propres fichiers.
2. Dans le dépôt : **Add file → Upload files**.
3. Décompressez le zip, puis glissez-déposez **le contenu** du dossier : `index.html`, les dossiers `css`, `js`, `img`
   (et `.nojekyll` si votre ordinateur l'affiche — il est facultatif). Les fichiers doivent être **à la racine** du dépôt,
   pas dans un sous-dossier.
4. Cliquez sur **Commit changes**.
5. **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
6. Au bout d'une à deux minutes, l'adresse apparaît en haut de la page Pages :
   `https://VOTRE-IDENTIFIANT.github.io/NOM-DU-DEPOT/`
   C'est cette adresse (ou un QR code qui y mène) que vous donnez aux apprenants.

**Variante la plus simple** : déposer uniquement le fichier unique `index.html` (version « un seul fichier » : texte, images et styles
sont tous dedans). Il suffit alors de remplacer le fichier `index.html` du dépôt (**Add file → Upload files**, même nom, **Commit changes**).

**Mettre à jour** : remplacez le fichier concerné (même nom), puis « Commit changes ». Le site se met à jour en une à deux minutes.

**Important après une mise à jour du contenu** : l'avancement des apprenants est enregistré dans leur navigateur. Si vous modifiez beaucoup
le contenu après le début du parcours, un apprenant peut retrouver une étape à refaire.

Testez toujours l'adresse sur un téléphone avant de la diffuser.

## 2. Utiliser le site sans Internet (variante)

Le dossier peut aussi être donné tel quel (zip) : décompresser, puis ouvrir `index.html` dans un navigateur récent (double-clic).
Seule l'Arcade de Mnémosia (lien externe) demande une connexion.

## 3. L'Arcade de Mnémosia (la « borne d'arcade »)

Sur l'accueil, la rubrique **Pour réviser en jouant** présente l'Arcade de Mnémosia du cours : `https://rbrdingenierie-ui.github.io/methodologie_cas_pratique/`
(« La méthodologie du cas pratique — Arcade de Mnémosia » : fiche méthode, lexique, flashcards, jeux en quatre paliers, jeu des exploits).
La borne est **verrouillée** tant que les 13 étapes ne sont pas terminées ; elle se **débloque dès la dernière étape terminée**, sans attendre le quiz ni le bilan.
Sur la dernière étape, un message rappelle aussi qu'elle est débloquée. Ce verrou est pédagogique : l'adresse reste lisible dans le code du site pour qui sait l'y chercher.
Pour changer l'adresse ou le texte de présentation : ouvrez `js/content.js`, cherchez `"arcade"` (adresse) et `"arcadeTexte"` (texte). Pour retirer la borne, remplacez l'adresse par `""` (deux guillemets) : la rubrique disparaît.

## 4. Fonctionnement pédagogique

- **Reprise du travail** : le bouton de l'accueil et le bouton « Continuer : étape X » en haut de chaque page de partie ramènent l'apprenant à sa première étape non terminée. Un oubli de réponse est signalé précisément (nombre restant, première question entourée en orange).
- **Accueil** : objectifs pédagogiques et savoirs associés, avec vos deux pictogrammes, parcours, quiz, badges et borne d'arcade (« Pour réviser en jouant »).
- **Progression verrouillée** : l'apprenant ne peut ouvrir l'étape suivante qu'après avoir terminé l'étape en cours. « J'ai terminé cette étape » n'est
  disponible qu'une fois toutes les activités de l'étape faites.
- **Partie 1 — la méthode pas à pas** : pour chacune des quatre étapes (qualification des faits, problème de droit, règle juridique, application et conclusion), le cours, puis l'exercice « brouillon » à compléter, puis (étapes 1 et 2) la rédaction. L'étape 5 réunit les consignes de rédaction et la composition finale.
- **Tableaux à compléter** (partie 1) : certaines cases sont déjà remplies, d'autres sont à compléter ; l'apprenant écrit, puis clique sur « Voir la réponse attendue » et compare avec votre corrigé. Sur téléphone, les tableaux s'affichent en « cartes » (une carte par ligne).
- **Questions rédigées** : l'apprenant écrit sa réponse (au moins quelques mots), puis clique sur « Voir la réponse attendue » (celle de votre corrigé). Rien n'est noté.
- **Partie 2 — cas guidé** : à chaque étape de la méthode, l'apprenant choisit **une proposition** parmi quatre (corrigée automatiquement, avec l'explication de votre corrigé), puis **justifie par écrit** son choix et le rejet des autres propositions ; votre justification attendue s'affiche ensuite. **Attention** : dans votre support, la bonne proposition est toujours la proposition « a) ». Le site la reprend telle quelle ; pour mélanger l'ordre des propositions, il suffit de me le demander.
- **Compositions** (fin de la partie 1 et partie 3) : l'apprenant voit les mots-clés attendus (« On sait que », « Or, en l'espèce », « Donc »), rédige sa composition (au moins 15 mots), la valide, puis la correction s'affiche ; il coche ensuite sa liste « Ma composition respecte les consignes ». Les mots-clés utilisés dans son texte se cochent tout seuls.
- **Partie 3 — en autonomie** : le cas des époux Vasseur, avec les annexes 1 (article 220 du Code civil) et 2 (arrêt de la Cour de cassation), puis votre correction une fois la composition validée. La dernière étape propose de refaire l'évaluation diagnostique pour mesurer la progression (ajout du site, absent de vos documents).
- **Quiz final** : 12 questions, 4 par partie (1, 2 et 3). Après correction, un tableau « Mes acquis, partie par partie » indique pour chaque partie « acquis » (3 bonnes réponses sur 4 ou plus), « à consolider » (2 sur 4) ou « à revoir » (moins), avec un lien pour revoir la partie. Le quiz est verrouillé tant que les 13 étapes ne sont pas terminées. **Les questions du quiz et de l'évaluation diagnostique ont été rédigées pour le site** à partir de votre corrigé (elles ne figurent pas dans vos documents) : relisez-les (`js/content.js`, repères `"diag"` et `"quiz"` ; chaque question du quiz porte le numéro de sa partie dans le champ `m`).
- **Badges** : 12 badges (diagnostic fait, premier exercice sans faute, introduction et chaque partie terminées, parcours complet — qui débloque aussi l'Arcade —, diagnostic refait, « maîtrise » de chaque partie au quiz, quiz sans faute). Noms, pictogrammes et conditions se modifient dans `js/content.js` (repère `"badges"`). Ils sont enregistrés avec le reste du travail, sur l'appareil.
- **Points** : calculés uniquement sur les exercices corrigés automatiquement (évaluation diagnostique, choix du cas guidé, quiz) ; ils servent à l'apprenant à se situer, pas à la notation.
- **XP (points d'expérience)** : un compteur « ⭐ N XP » reste affiché en haut de chaque page ; il monte à chaque bonne réponse à un exercice corrigé automatiquement (diagnostic, exercices, quiz final, y compris le diagnostic refait en fin de parcours), avec un « +N » animé. **1 bonne réponse = 1 XP** ; le total possible (31 XP) est affiché sur l'accueil (« 0 XP sur 31 possibles », avec une barre de progression). **Les XP ne baissent jamais** : le meilleur résultat de chaque exercice est conservé, même si l'apprenant recommence. Les réponses rédigées, comparées à la réponse attendue, ne rapportent pas d'XP. Le total figure dans le bilan (tableau et texte à rendre). Les XP sont enregistrés avec le reste du travail, sur l'appareil ; un apprenant qui avait déjà commencé retrouve ses XP calculés d'après ses exercices déjà corrigés. Comme les points, ils servent à se situer, pas à la notation.
- **Temps passé** : le site relève le temps passé sur chaque partie (et sur le diagnostic et le quiz final). Il est affiché sur la page de chaque partie (« Temps déjà passé ici : 25 min »), sur sa carte de l'accueil, puis repris dans **Mon bilan** : colonne « Temps passé » et ligne « Temps total passé sur le cours » dans le tableau, rubrique « TEMPS PASSÉ » dans le texte à rendre. Le temps est compté tant que la page est ouverte **et active** : il se met en pause quand l'onglet est caché ou après 3 minutes sans aucune action (clic, frappe, défilement, toucher). C'est une mesure approximative, enregistrée sur l'appareil comme le reste (rien n'est envoyé) ; elle ne distingue pas un apprenant qui lit de un apprenant qui laisse la page ouverte en bougeant la souris : à prendre comme une indication, pas comme une preuve ni pour la notation. Pour changer le seuil de pause, ajouter dans `js/content.js`, juste après `"meta": {`, la ligne `"inactiviteSec": 300,` (en secondes ; 180 par défaut).

## 5. Ce que le site enregistre (et ce qu'il ne transmet pas)

- **Rien n'est envoyé à qui que ce soit par le site.** Ni serveur, ni compte, ni suivi, ni statistiques.
- La progression, les réponses et les compositions restent dans le navigateur de l'apprenant (stockage local de l'appareil).
  S'il change d'appareil, utilise la navigation privée ou vide les données du site, il retrouve un parcours vierge.
  **Conseil** : faire travailler les apprenants à partir de l'adresse web (GitHub Pages) plutôt qu'avec le fichier `index.html` ouvert depuis un dossier de l'ordinateur : l'enregistrement automatique y est plus fiable. La version « un seul fichier » convient pour une consultation ponctuelle ou hors connexion ; l'apprenant peut toujours utiliser « Télécharger ma sauvegarde » dans Mon bilan.
- Pour que vous voyiez son travail, l'apprenant ouvre **Mon bilan**, indique prénom, nom et classe, puis clique sur « Imprimer / enregistrer en PDF »
  (c'est la seule façon de rendre son travail proposée dans le bilan) et vous remet le document obtenu (ENT, mail).
  « Télécharger ma sauvegarde » (`.json`) et « Charger une sauvegarde » permettent de reprendre son travail sur un autre appareil.

## 6. Confort de lecture et usage mobile

Bouton « Accessibilité » en haut de chaque page :

- **Police adaptée** : Verdana, espacement élargi (utile en cas de dyslexie).
- **Contraste renforcé**.
- **Taille du texte** : 7 niveaux, jusqu'à +50 %.
- **Mode FALC** : texte plus grand, lignes courtes et aérées, éléments secondaires masqués (icônes de contexte).
- **Lecture au survol** (synthèse vocale du navigateur) et **réduction des animations**.

Vérifié sur ordinateur et sur téléphone (375 px et 320 px de large) : aucun débordement horizontal, navigation complète au clavier,
aucune anomalie détectée par l'outil d'audit d'accessibilité automatique (axe, niveau WCAG 2.2 AA) sur l'ensemble des pages.
Le site n'a pas été conçu spécifiquement pour les lecteurs d'écran.

## 7. Contenu du dossier

```
index.html       page unique du site
css/style.css    mise en forme
js/content.js    tout le contenu pédagogique (textes, annexes, questions, réponses attendues, quiz, badges, lien de l'Arcade)
js/store.js      sauvegarde locale
js/blocks.js     types d'activités (vrai/faux, choix, écrits, tableaux, compositions…)
js/app.js        navigation, verrouillage, menu, accessibilité, bilan
img/             pictogrammes (objectifs, savoirs, contexte, astuce, document)
```

Cours conçu par Benjamin RICHARD.
