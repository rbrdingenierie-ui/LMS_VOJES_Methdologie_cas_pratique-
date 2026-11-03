/* Contenu du cours — repris du support apprenant et du cours corrigé de Benjamin RICHARD
   (BTS Banque · La méthodologie du cas pratique).
   Les consignes, tableaux, propositions, justifications et corrections sont ceux de vos documents ;
   l'évaluation diagnostique, le quiz final et les libellés (badges, bilan) sont rédigés pour ce site. */
window.LMS = {
 "meta": {
  "titre": "La méthodologie du cas pratique",
  "sous": "BTS Banque · VOJES, bloc 4",
  "accroche": "Le cas pratique est l'un des exercices de l'épreuve finale de VOJES (Bloc 4). Il consiste à résoudre, à partir d'une situation concrète, une difficulté d'ordre juridique en mobilisant une démarche rigoureuse en quatre étapes. Le cours est à suivre <b>à votre rythme</b>, avec la correction affichée tout de suite.",
  "parcours": "l'introduction et les 3 parties",
  "arcade": "https://rbrdingenierie-ui.github.io/methodologie_cas_pratique/",
  "arcadeTexte": "L'Arcade de Mnémosia est l'espace d'entraînement en ligne de cette méthode : fiche méthode, lexique, flashcards, jeux en quatre paliers (repérer, maîtriser le vocabulaire, raisonner, résoudre un cas complet) et jeu des exploits. Elle est facultative et se joue à part, sur internet.",
  "contexte": null,
  "objectifs": [
   "<b>Qualifier juridiquement les faits</b> d'une situation donnée",
   "<b>Formuler un problème de droit</b> à partir d'une situation qualifiée juridiquement",
   "<b>Identifier, à partir d'annexes</b>, la ou les règles juridiques applicables à un cas donné (loi, contrat, jurisprudence)",
   "<b>Appliquer une règle de droit</b> à un cas pratique pour construire une argumentation juridique",
   "<b>Rédiger une réponse structurée</b> selon la méthode du syllogisme juridique"
  ],
  "savoirs": [
   "Les <b>quatre étapes</b> de la méthode du cas pratique",
   "La <b>qualification juridique des faits</b> (parties, lien juridique, faits, suites envisagées)",
   "Le <b>problème de droit</b> (formulation générale, abstraite et impersonnelle)",
   "Les <b>sources du droit mobilisables</b> en annexe (Code civil, Code pénal, contrats, décisions de justice)",
   "Le <b>syllogisme juridique</b> (majeure, mineure, conclusion)."
  ],
  "savIntro": "vous aurez mobilisé les savoirs suivants",
  "icoObjectifs": "img/ico_objectifs.webp",
  "icoSavoirs": "img/ico_savoirs.webp",
  "badgesIntro": "Vous gagnez un badge chaque fois que vous atteignez un objectif : exercice sans faute, partie terminée, quiz réussi… Les badges arrivent tout seuls, ils sont à vous pour de bon, et ils sont enregistrés avec le reste de votre travail.",
  "badges": [
   {
    "id": "b-diag",
    "g": "Mon parcours",
    "type": "diag",
    "ico": "🚀",
    "titre": "Premier pas",
    "cond": "Faire l'évaluation diagnostique de départ."
   },
   {
    "id": "b-sf",
    "g": "Mon parcours",
    "type": "sansfaute",
    "ico": "🎯",
    "titre": "Premier sans-faute",
    "cond": "Réussir un exercice corrigé avec tous les points."
   },
   {
    "id": "b-m1",
    "g": "Mon parcours",
    "type": "module",
    "n": 1,
    "ico": "🧭",
    "titre": "Méthode en poche",
    "cond": "Terminer l'introduction : Comprendre la méthode."
   },
   {
    "id": "b-m2",
    "g": "Mon parcours",
    "type": "module",
    "n": 2,
    "ico": "🧩",
    "titre": "Maître des quatre étapes",
    "cond": "Terminer la partie 1 : La méthode pas à pas."
   },
   {
    "id": "b-m3",
    "g": "Mon parcours",
    "type": "module",
    "n": 3,
    "ico": "🔦",
    "titre": "Guidé jusqu'au bout",
    "cond": "Terminer la partie 2 : Un cas pratique guidé."
   },
   {
    "id": "b-m4",
    "g": "Mon parcours",
    "type": "module",
    "n": 4,
    "ico": "⚖️",
    "titre": "Juriste en autonomie",
    "cond": "Terminer la partie 3 : Un cas pratique en autonomie."
   },
   {
    "id": "b-all",
    "g": "Mon parcours",
    "type": "parcours",
    "ico": "🏁",
    "titre": "Parcours complet",
    "cond": "Terminer les 13 étapes du parcours : le quiz final et l'Arcade de Mnémosia se débloquent."
   },
   {
    "id": "b-d2",
    "g": "Mon parcours",
    "type": "diag2",
    "ico": "📈",
    "titre": "Progression mesurée",
    "cond": "Refaire l'évaluation diagnostique à la fin du parcours pour comparer."
   },
   {
    "id": "b-q2",
    "g": "Quiz final",
    "type": "maitrise",
    "n": 2,
    "ico": "⭐",
    "titre": "Maîtrise · La méthode pas à pas",
    "cond": "Quiz final : au moins 3 bonnes réponses sur 4 pour la partie 1."
   },
   {
    "id": "b-q3",
    "g": "Quiz final",
    "type": "maitrise",
    "n": 3,
    "ico": "⭐",
    "titre": "Maîtrise · Un cas pratique guidé",
    "cond": "Quiz final : au moins 3 bonnes réponses sur 4 pour la partie 2."
   },
   {
    "id": "b-q4",
    "g": "Quiz final",
    "type": "maitrise",
    "n": 4,
    "ico": "⭐",
    "titre": "Maîtrise · Un cas pratique en autonomie",
    "cond": "Quiz final : au moins 3 bonnes réponses sur 4 pour la partie 3."
   },
   {
    "id": "b-q12",
    "g": "Quiz final",
    "type": "parfait",
    "ico": "🏆",
    "titre": "Quiz sans faute",
    "cond": "Réussir le quiz final avec 12 bonnes réponses sur 12."
   }
  ],
  "bilanIntro": "Ce bilan résume votre travail : les étapes terminées, les points des exercices corrigés automatiquement et vos compositions. <b>Votre enseignant ne reçoit rien automatiquement</b> : c'est à vous de lui remettre ce bilan.",
  "bilanRendre": "Écrivez d'abord votre nom et votre classe ci-dessus. Puis cliquez sur <b>Imprimer / enregistrer en PDF</b> : dans la fenêtre qui s'ouvre, choisissez l'enregistrement au format PDF (ou imprimez directement la page), puis remettez le document à votre enseignant.",
  "dureeTotale": "1 h 35"
 },
 "diag": {
  "titre": "Évaluation diagnostique",
  "court": "7 affirmations pour vous situer. Ce n'est pas noté.",
  "intro": "Avant de commencer, dites ce que vous savez déjà de la méthode du cas pratique. Ce n'est pas noté : cela sert à vous situer, et vous refaites cette évaluation à la fin du parcours pour mesurer votre progression.",
  "blocks": [
   {
    "t": "vf",
    "id": "diag",
    "titre": "Vrai ou faux ?",
    "consigne": "Pour chaque affirmation, choisissez Vrai ou Faux.",
    "items": [
     {
      "q": "Le cas pratique consiste à résoudre, à partir d'une situation concrète, une difficulté d'ordre juridique.",
      "a": true,
      "e": "Le cas pratique consiste à résoudre, à partir d'une situation concrète, une difficulté d'ordre juridique, en suivant une démarche rigoureuse en quatre étapes."
     },
     {
      "q": "Pour qualifier juridiquement les faits, il faut recopier toutes les informations de l'énoncé.",
      "a": false,
      "e": "Il faut au contraire éliminer les informations qui ne sont pas pertinentes d'un point de vue juridique, et traduire la situation, décrite en langage courant, en langage juridique."
     },
     {
      "q": "Un problème de droit se formule en citant les personnes du cas (par exemple Fadila et Sam).",
      "a": false,
      "e": "Un problème de droit est une question juridique d'ordre général : on généralise en dépassant le cas proposé, avec des termes concis, généraux et impersonnels."
     },
     {
      "q": "Les règles de droit à appliquer sont souvent données dans les annexes (extraits de Code, de contrats ou de décisions de justice).",
      "a": true,
      "e": "La règle est souvent donnée dans les annexes : extraits d'un Code, de contrats, ou de décisions de justice (Cour d'appel, Cour de cassation…)."
     },
     {
      "q": "Le correcteur lit et note le brouillon.",
      "a": false,
      "e": "Le brouillon est un outil de travail : le correcteur ne l'évalue pas. Ce qui est lu et noté, c'est la composition finale."
     },
     {
      "q": "Dans la composition finale, la solution du cas est introduite par « Donc ».",
      "a": true,
      "e": "Dans la composition finale, la règle est introduite par « On sait que », son application au cas par « Or, en l'espèce » et la solution par « Donc »."
     },
     {
      "q": "Un problème de droit peut être formulé de plusieurs façons.",
      "a": true,
      "e": "Un même cas peut conduire à plusieurs formulations correctes du problème de droit."
     }
    ]
   }
  ]
 },
 "modules": [
  {
   "n": 1,
   "lib": "Introduction",
   "num": "▶",
   "court": "Comprendre la méthode",
   "titre": "Comprendre la méthode du cas pratique",
   "accroche": "Cette séquence vous présente les quatre étapes de la méthode du cas pratique, au travers d'un cas simple.",
   "objectifs": [],
   "savoirs": [],
   "contexte": null,
   "steps": [
    {
     "titre": "Comprendre la démarche en quatre étapes",
     "tag": "Lecture",
     "blocks": [
      {
       "t": "h2",
       "x": "Introduction"
      },
      {
       "t": "p",
       "x": "Le cas pratique est l'un des exercices de l'épreuve finale de VOJES (Bloc 4). Il consiste à résoudre, à partir d'une situation concrète, une difficulté d'ordre juridique en mobilisant une démarche rigoureuse en quatre étapes : la <b>qualification des faits</b>, la formulation d'un <b>problème de droit</b>, la recherche de la <b>règle juridique applicable</b>, puis son <b>application</b> à la situation donnée."
      },
      {
       "t": "p",
       "x": "Cet exercice ne s'improvise pas : il demande de la <b>méthode</b>, la mobilisation de connaissances juridiques et l'exploitation d'<b>annexes</b> (extraits de Code, de contrats ou de décisions de justice) mises à votre disposition."
      },
      {
       "t": "p",
       "x": "Cette séquence vous présente les quatre étapes de la méthode du cas pratique, au travers d'un cas simple."
      },
      {
       "t": "contexte",
       "kind": "Contexte",
       "titre": "Contexte",
       "x": "<p>Fadila est propriétaire d'une maison de campagne, entourée d'un vaste terrain. Alors qu'elle revient dans cette maison après plusieurs semaines d'absence, elle se rend compte que Sam, le voisin, propriétaire du terrain qui jouxte le sien, a profité de son absence pour construire un cabanon qui empiète sur son terrain. Fadila, très mécontente de ne pas avoir obtenu un règlement amiable de cette situation, envisage d'agir en justice pour faire démolir le cabanon en partie construit chez elle.</p>",
       "icon": "img/ctx_scenario.webp"
      },
      {
       "t": "h3",
       "x": "Consigne"
      },
      {
       "t": "p",
       "x": "Vous allez suivre, pas à pas, la résolution de ce cas à travers les quatre étapes de la méthode : pour chaque étape, complétez d'abord le tableau de brouillon proposé, avant de lire la suite."
      },
      {
       "t": "h3",
       "x": "Les étapes du cas pratique"
      },
      {
       "t": "ol",
       "items": [
        "La qualification juridique des faits",
        "L'identification du problème de droit",
        "L'identification du/des règle(s) juridique(s)",
        "L'application à la situation",
        "La conclusion"
       ]
      },
      {
       "t": "note",
       "titre": "Astuce",
       "x": "<b>Un travail en deux temps, le brouillon, puis la composition finale</b><br>La méthode du cas pratique se construit en deux temps distincts, qui ne doivent jamais être confondus :<br><br><b>Le brouillon</b> est l'espace où vous réfléchissez librement, étape par étape : vous y qualifiez les faits, vous y cherchez le problème de droit — quitte à en essayer plusieurs formulations —, vous y notez les règles candidates trouvées dans les annexes, vous y construisez le raisonnement en style abrégé. C'est un outil de travail, pas une copie : le correcteur ne l'évalue pas. Chaque étape de cette séquence vous propose un tableau « À réaliser sur le brouillon » pour vous guider dans ce travail préparatoire.<br><br><b>La composition finale</b> est la copie que vous rendez et qui sera évaluée. Elle reprend, dans l'ordre, le résultat de votre brouillon, mais rédigée en phrases complètes et en paragraphes structurés, sans numérotation ni abréviation.",
       "icon": "img/ico_astuce.webp"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "lib": "Partie 1",
   "num": 1,
   "court": "La méthode pas à pas",
   "titre": "La méthode pas à pas, à partir d'un cas simple",
   "accroche": "Les quatre étapes de la méthode appliquées au cas de Fadila et Sam, puis la rédaction de la réponse.",
   "objectifs": [],
   "savoirs": [],
   "contexte": null,
   "steps": [
    {
     "titre": "La qualification juridique des faits",
     "tag": "Cours · Brouillon · Rédaction",
     "blocks": [
      {
       "t": "details",
       "titre": "Revoir l'énoncé : Fadila et Sam",
       "blocks": [
        {
         "t": "contexte",
         "kind": "Contexte",
         "titre": "Contexte",
         "x": "<p>Fadila est propriétaire d'une maison de campagne, entourée d'un vaste terrain. Alors qu'elle revient dans cette maison après plusieurs semaines d'absence, elle se rend compte que Sam, le voisin, propriétaire du terrain qui jouxte le sien, a profité de son absence pour construire un cabanon qui empiète sur son terrain. Fadila, très mécontente de ne pas avoir obtenu un règlement amiable de cette situation, envisage d'agir en justice pour faire démolir le cabanon en partie construit chez elle.</p>",
         "icon": "img/ctx_scenario.webp",
         "noTitle": true
        }
       ]
      },
      {
       "t": "h2",
       "x": "1re étape : la qualification juridique des faits"
      },
      {
       "t": "p",
       "x": "Cette première étape consiste à reprendre les <b>faits</b> et <b>éliminer</b> l'ensemble des <b>informations non pertinentes</b> d'un point de vue juridique."
      },
      {
       "t": "p",
       "x": "La situation étant décrite dans un langage courant, il vous est donc demandé de <b>traduire cette situation dans un langage juridique</b>."
      },
      {
       "t": "p",
       "x": "Afin de repérer les principales informations de la situation donnée, il convient de repérer :"
      },
      {
       "t": "ul",
       "items": [
        "Les <b>parties impliquées</b> dans la situation en répondant aux questions : qui est impliqué ? quels sont les acteurs ? ;",
        "Le <b>lien juridique</b> entre elles en répondant à la question : quelle relation unit les acteurs de la situation ?",
        "Les <b>faits relatés</b> en répondant aux questions : que s'est-il passé ? quelles sont les conséquences ?",
        "Les <b>suites envisagées</b> en répondant à la question : y a-t-il une suite envisagée ?"
       ]
      },
      {
       "t": "tableau",
       "id": "p1-t1",
       "titre": "Le brouillon : qualifier les faits",
       "consigne": "<b>Complétez le tableau à réaliser sur le brouillon :</b>",
       "head": [
        "Éléments",
        "Éléments collectés dans l'énoncé",
        "Traduction en langage juridique"
       ],
       "rows": [
        [
         "Parties impliquées",
         "<p>Fadila</p><p>Sam</p>",
         "<ul><li>Propriétaire d'un immeuble.</li><li>Propriétaire voisin.</li></ul>"
        ],
        [
         "Lien juridique",
         null,
         null
        ],
        [
         "Faits",
         null,
         null
        ],
        [
         "Suites à donner au litige",
         null,
         null
        ]
       ],
       "modele": [
        [
         "Parties impliquées",
         "<p>Fadila</p><p>Sam</p>",
         "<p>Propriétaire d'un immeuble</p><p>Propriétaire voisin</p>"
        ],
        [
         "Lien juridique",
         "<p>Propriétés voisines</p>",
         "<p>Propriétés contigües</p>"
        ],
        [
         "Faits",
         "<p>La construction d'un cabanon empiétant chez le voisin</p>",
         "<p>Une construction partiellement édifiée sur une parcelle contigüe</p>"
        ],
        [
         "Suites à donner au litige",
         "<p>Fadila veut voir disparaître le cabanon partiellement construit sur sa propriété.</p>",
         "<p>La propriétaire veut obtenir réparation en nature du préjudice subi en demandant la démolition de l'immeuble édifié, pour partie et sans droit, sur son terrain.</p>"
        ]
       ]
      },
      {
       "t": "ouvert",
       "id": "p1-q1",
       "titre": "Rédiger les faits",
       "consigne": "À partir des éléments identifiés, rédigez de <b>façon concise</b> les faits en utilisant les <b>termes juridiques</b> appropriés. Vous veillerez à vous limiter aux <b>informations indispensables</b> et qui ont une <b>conséquence juridique</b>.",
       "lignes": 4,
       "modele": "<p>Un propriétaire constate qu'un voisin, propriétaire d'un terrain contigu, a fait édifier une construction qui empiète partiellement sur son propre terrain. Il souhaite en obtenir la démolition.</p>",
       "mt": "Exemple de rédaction (début de la correction du cas pratique)"
      }
     ]
    },
    {
     "titre": "Le problème de droit",
     "tag": "Cours · Brouillon · Rédaction",
     "blocks": [
      {
       "t": "h2",
       "x": "2e étape : l'identification du problème de droit"
      },
      {
       "t": "p",
       "x": "Une fois les faits juridiquement établis, vous devez mobiliser vos <b>connaissances</b> et/ou les <b>annexes</b> pour trouver le problème de droit qui s'applique."
      },
      {
       "t": "p",
       "x": "Formuler ce problème juridique, c'est traduire le cas proposé en une <b>question juridique d'ordre général dont la solution découlera de la règle de droit</b>."
      },
      {
       "t": "p",
       "x": "La formulation du problème de droit suppose de :"
      },
      {
       "t": "ul",
       "items": [
        "<b>Généraliser</b> en dépassant le cas proposé, en élargissant la réflexion et en passant du particulier au général ;",
        "<b>Formuler</b> le problème en utilisant des termes <b>concis</b>, <b>généraux</b>, <b>impersonnels</b>."
       ]
      },
      {
       "t": "tableau",
       "id": "p1-t2",
       "titre": "Le brouillon : généraliser",
       "consigne": "<b>Complétez le tableau à réaliser sur le brouillon :</b>",
       "head": [
        "Éléments",
        "Traduction en langage juridique",
        "Traduction en langage juridique général"
       ],
       "rows": [
        [
         "Parties impliquées",
         "<p>Fadila, propriétaire d'une maison de campagne et d'un terrain.</p>",
         "<p>La propriétaire dont la propriété a été violée.</p>"
        ],
        [
         "Parties impliquées",
         "<p>Sam, le propriétaire voisin à l'origine de la construction.</p>",
         null
        ],
        [
         "Faits",
         "<p>Une construction réalisée pour partie sans autorisation.</p>",
         "<p>Un empiètement sur la propriété d'autrui.</p>"
        ],
        [
         "Suites à donner au litige",
         "<p>La construction cause un préjudice à la propriétaire qui veut la faire supprimer.</p>",
         null
        ]
       ],
       "modele": [
        [
         "Parties impliquées",
         "<p>Fadila, propriétaire d'une maison de campagne et d'un terrain.</p>",
         "<p>La <u>propriétaire</u> dont la propriété a été violée</p>"
        ],
        [
         "Parties impliquées",
         "<p>Sam, le voisin à l'origine de la construction.</p>",
         "<p>L'auteur d'une construction <u>édifiée sur le terrain appartenant à un tiers</u></p>"
        ],
        [
         "Faits",
         "<p>Une construction réalisée pour partie sans autorisation.</p>",
         "<p>Un empiètement sur la propriété d'un tiers sans autorisation préalable</p>"
        ],
        [
         "Suites à donner au litige",
         "<p>La construction cause un préjudice à la propriétaire qui veut la faire supprimer.</p>",
         "<p>La demande en <u>réparation</u> en nature par la démolition d'un bien édifié sans autorisation préalable</p>"
        ]
       ]
      },
      {
       "t": "note",
       "titre": "Astuces",
       "x": "Aidez-vous du vocabulaire donné dans les annexes, il reprend généralement du vocabulaire juridique, général et impersonnel (comme les caractéristiques de la règle de droit). Enfin, il est important de noter qu'un problème de droit peut être formulé de plusieurs façons.",
       "icon": "img/ico_astuce.webp"
      },
      {
       "t": "ouvert",
       "id": "p1-q2",
       "titre": "Formuler le problème de droit",
       "consigne": "<b>Déduisez des traductions en langage juridique général le problème de droit :</b>",
       "lignes": 3,
       "modele": "<p>Exemples de problèmes de droit :</p><ul><li>Dans quelles mesures un <u>propriétaire</u> constatant une <u>construction empiétant sur son terrain</u> peut-il en obtenir la <u>démolition</u> ?</li><li>La <u>démolition</u> d'une construction <u>en violation du droit de propriété</u> d'un <u>propriétaire</u> d'une parcelle contigüe est-elle justifiée ?</li><li>Un <u>propriétaire</u> peut-il obtenir la <u>démolition</u> d'une <u>construction édifiée par un tiers</u>, dès lors qu'elle empiète sur son terrain ?</li></ul>",
       "mt": "Réponse attendue : exemples de problèmes de droit"
      }
     ]
    },
    {
     "titre": "La règle juridique applicable",
     "tag": "Cours · Brouillon",
     "blocks": [
      {
       "t": "h2",
       "x": "3e étape : l'identification de la ou des règles juridiques applicables"
      },
      {
       "t": "p",
       "x": "Pour <b>résoudre le problème de droit</b> que vous venez de poser, il convient de repérer la ou les <b>règles générales</b> qui vont pouvoir s'appliquer au cas pratique."
      },
      {
       "t": "p",
       "x": "Souvent données dans les <b>annexes</b>, il peut s'agir d'extraits :"
      },
      {
       "t": "ul",
       "items": [
        "D'un <b>Code</b> (Code civil, pénal etc.) ;",
        "De <b>contrats</b> (contrat de travail, contrat de vente etc.) ;",
        "De <b>décisions</b> de justice (Cour d'appel, Cour de cassation etc.)."
       ]
      },
      {
       "t": "p",
       "x": "Aussi pour identifier le/les règle(s) applicable(s), il convient de :"
      },
      {
       "t": "ul",
       "items": [
        "Repérer les <b>mots-clefs</b> du problème de droit posé ;",
        "<b>Mettre en relation</b> les mots-clefs avec les informations utiles des annexes données."
       ]
      },
      {
       "t": "p",
       "x": "Les <b>mots clefs</b> du problème de droit trouvé sont : propriétaire, empiètement et démolition."
      },
      {
       "t": "tableau",
       "id": "p1-t3",
       "titre": "Le brouillon : relier les mots-clefs aux annexes",
       "consigne": "<b>Complétez le tableau ci-après :</b>",
       "head": [
        "Mot-clef rattaché",
        "Documentation à exploiter pour solutionner le cas"
       ],
       "rows": [
        [
         null,
         "<p><b>Article 545 du Code civil</b></p><p>Nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique, et moyennant une juste et préalable indemnité.</p>"
        ],
        [
         null,
         "<p><b>Article 555 du Code civil (extrait)</b></p><p>Lorsque les plantations, constructions et ouvrages ont été faits par un tiers […], le propriétaire du fonds a le droit d'obliger […] le tiers à les enlever.</p>"
        ],
        [
         null,
         "<p><b>Sanctions de l'empiètement : point sur la jurisprudence de la Cour de cassation</b></p><p>Dans un arrêt du 10 novembre 2016, la Cour considère qu'un empiètement de 0,04m² sur la propriété voisine ne permet pas de fonder une demande de démolition. Elle lui préfère un “rabotage permettant de mettre fin à l'empiètement constaté” Aussi, elle casse la décision de la Cour d'appel qui avait ordonné la destruction totale de l'ouvrage. En conclusion, lorsque le juge est saisi d'une demande de démolition, il doit rechercher si une autre solution (telle que l'adaptation de la construction litigieuse) permet de mettre fin à l'empiètement […].</p><p>La Cour de cassation rappelle clairement que nul ne peut être contraint de subir un empiètement sur la propriété et souligne dans le même temps qu'une solution alternative à la destruction totale de l'ouvrage peut être recherchée pour mettre fin à l'empiètement (Cour de cassation, 3e chambre civile, arrêt du 10 novembre 2016 – n°15-25113).</p>"
        ]
       ],
       "modele": [
        [
         "<p>Le principe du <u>caractère absolu</u> du <u>droit de propriété</u></p>",
         "<p><b>Article 545 du Code civil</b></p><p>Nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique, et moyennant une juste et préalable indemnité.</p>"
        ],
        [
         "<p>La <u>sanction légale</u> de l'<u>empiètement</u></p>",
         "<p><b>Article 555 du Code civil (extrait)</b></p><p>Lorsque les plantations, constructions et ouvrages ont été faits par un tiers […], le propriétaire du fonds a le droit d'obliger […] le tiers à les enlever.</p>"
        ],
        [
         "<p>L'<u>application</u> de la <u>sanction légale</u> de l'<u>empiètement</u> par la <u>Cour de cassation</u></p>",
         "<p><b>Sanctions de l'empiètement : point sur la jurisprudence de la Cour de cassation</b></p><p>Dans un arrêt du 10 novembre 2016, la Cour considère qu'un empiètement de 0,04m² sur la propriété voisine ne permet pas de fonder une demande de démolition. Elle lui préfère un “rabotage permettant de mettre fin à l'empiètement constaté” Aussi, elle casse la décision de la Cour d'appel qui avait ordonné la destruction totale de l'ouvrage. En conclusion, lorsque le juge est saisi d'une demande de démolition, il doit rechercher si une autre solution (telle que l'adaptation de la construction litigieuse) permet de mettre fin à l'empiètement […].</p><p>La Cour de cassation rappelle clairement que nul ne peut être contraint de subir un empiètement sur la propriété et souligne dans le même temps qu'une solution alternative à la destruction totale de l'ouvrage peut être recherchée pour mettre fin à l'empiètement (Cour de cassation, 3e chambre civile, arrêt du 10 novembre 2016 – n°15-25113).</p>"
        ]
       ]
      }
     ]
    },
    {
     "titre": "L'application à la situation et la conclusion",
     "tag": "Cours · Brouillon",
     "blocks": [
      {
       "t": "h2",
       "x": "4e étape : l'application à la situation et la conclusion"
      },
      {
       "t": "p",
       "x": "Appliquer le/les règle(s) consiste à les utiliser, c'est-à-dire faire <b>correspondre les règles générales</b> – que vous avez identifiées – avec le <b>cas particulier de la situation</b> pour construire une <b>argumentation juridique</b> permettant de <b>conclure sur une réponse</b> (positive ou négative)."
      },
      {
       "t": "tableau",
       "id": "p1-t4",
       "titre": "Le brouillon : appliquer les règles au cas",
       "consigne": "<b>Complétez le tableau ci-après :</b>",
       "head": [
        "Annexes données pour résoudre le cas",
        "Application au cas à solutionner"
       ],
       "rows": [
        [
         "<p class=\"subq\">Un propriétaire peut-il être contraint de céder son bien ?</p><p><b>Article 545 du Code civil</b></p><p>Nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique, et moyennant une juste et préalable indemnité.</p>",
         null
        ],
        [
         "<p class=\"subq\">La demande de démolition est-elle fondée juridiquement ?</p><p><b>Article 555 du Code civil (extraits)</b></p><p>Lorsque les plantations, constructions et ouvrages ont été faits par un tiers […], le propriétaire du fonds a le droit d'obliger […] le tiers à les enlever.</p><p>Si le propriétaire du fonds exige la suppression des constructions, plantations et ouvrages, elle est exécutée aux frais du tiers, sans aucune indemnité pour lui ; le tiers peut, en outre, être condamné à des dommages-intérêts pour le préjudice éventuellement subi par le propriétaire du fonds.</p>",
         null
        ],
        [
         "<p class=\"subq\">La demande de démolition s'applique-t-elle dans tous les cas ?</p><p><b>Extrait d'un arrêt du 10 novembre 2016 de la Cour de cassation</b></p><p>La Cour considère qu'un empiètement de 0,04m² sur la propriété voisine ne permet pas de fonder une demande de démolition. Elle lui préfère un “rabotage permettant de mettre fin à l'empiètement constaté” […]. Lorsque le juge est saisi d'une demande de démolition, il doit rechercher si une autre solution (telle que l'adaptation de la construction litigieuse) permet de mettre fin à l'empiètement.</p>",
         null
        ]
       ],
       "modele": [
        [
         "<p class=\"subq\">Un propriétaire peut-il être contraint de céder son bien ?</p><p><b>Article 545 du Code civil</b></p><p>Nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique, et moyennant une juste et préalable indemnité.</p>",
         "<p>La propriétaire n'a pas fait l'objet d'une expropriation pour cause d'utilité publique. C'est un propriétaire d'une parcelle contigüe qui porte atteinte à son droit de propriété.</p><p>On peut donc bien dire que la propriétaire est en droit de faire cesser les troubles à la propriété qu'elle a subi.</p>"
        ],
        [
         "<p class=\"subq\">La demande de démolition est-elle fondée juridiquement ?</p><p><b>Article 555 du Code civil (extraits)</b></p><p>Lorsque les plantations, constructions et ouvrages ont été faits par un tiers […], le propriétaire du fonds a le droit d'obliger […] le tiers à les enlever.</p><p>Si le propriétaire du fonds exige la suppression des constructions, plantations et ouvrages, elle est exécutée aux frais du tiers, sans aucune indemnité pour lui ; le tiers peut, en outre, être condamné à des dommages-intérêts pour le préjudice éventuellement subi par le propriétaire du fonds.</p>",
         "<p>Conformément aux dispositions du Code civil, la propriétaire peut demander que la construction, réalisée pour partie et sans droit sur sa propriété, puisse être enlevée et sans frais par son voisin.</p><p>La demande de démolition souhaitée par la propriétaire est juridiquement fondée.</p>"
        ],
        [
         "<p class=\"subq\">La demande de démolition s'applique-t-elle dans tous les cas ?</p><p><b>Extrait d'un arrêt du 10 novembre 2016 de la Cour de cassation</b></p><p>La Cour considère qu'un empiètement de 0,04m² sur la propriété voisine ne permet pas de fonder une demande de démolition. Elle lui préfère un “rabotage permettant de mettre fin à l'empiètement constaté” […]. Lorsque le juge est saisi d'une demande de démolition, il doit rechercher si une autre solution (telle que l'adaptation de la construction litigieuse) permet de mettre fin à l'empiètement.</p>",
         "<p>Le rapprochement de la jurisprudence et des règles légales montre qu'il existe une alternative :</p><ul><li>la démolition de la construction dès lors que l'empiètement sur le terrain de la propriétaire est significatif ;</li><li>un rabotage de la construction dès lors que l'empiètement sur le terrain est minime.</li></ul><p>Les juges devront examiner concrètement la situation pour trancher entre la démolition complète ou son rabotage.</p>"
        ]
       ],
       "plus": "<p>En conclusion, l'empiètement sur une parcelle contigüe sans autorisation est sanctionné par la loi. En principe, le propriétaire ayant subi le trouble peut exiger la démolition de l'ouvrage. Toutefois, les juges pourront imposer un rabotage en cas de dépassement minime.</p>",
       "cls": "rowtext"
      }
     ]
    },
    {
     "titre": "La composition finale : les consignes de rédaction",
     "tag": "Consignes · Rédaction",
     "blocks": [
      {
       "t": "h2",
       "x": "Les consignes pour rédiger la réponse"
      },
      {
       "t": "p",
       "x": "Une fois votre brouillon complété pour chacune des <b>quatre étapes</b>, vous devez rédiger la composition finale : la version définitive de votre réponse, en phrases complètes, qui sera lue et notée."
      },
      {
       "t": "p",
       "x": "Elle respecte les consignes suivantes :"
      },
      {
       "t": "ul",
       "items": [
        "Rappel des <b>faits qualifiés juridiquement</b> et énoncé du <b>problème de droit</b> ;",
        "Présentation du ou des <b>règles de droit applicables</b> introduites par “<u><b>On sait que</b></u>” ;",
        "<b>Application du ou des règles de droit au cas d'espèce</b> introduite par “<u><b>Or, en l'espèce</b></u>” ;",
        "Présentation de la <b>solution</b> du cas d'espèce introduite par “<u><b>Donc</b></u>”."
       ]
      },
      {
       "t": "ouvert",
       "id": "p1-q5",
       "titre": "Votre composition finale",
       "consigne": "À partir des réponses aux précédentes questions, présentez la qualification des faits, le problème juridique, les règles de droit applicables et la ou les solution(s) qui pourra(ont) être appliquée(s).",
       "lignes": 12,
       "modele": "<p>Un propriétaire constate qu'un voisin, propriétaire d'un terrain contigu, a fait édifier une construction qui empiète partiellement sur son propre terrain. Il souhaite en obtenir la démolition. Se pose alors la question suivante : un propriétaire peut-il obtenir la démolition d'une construction édifiée par un tiers, dès lors qu'elle empiète sur son terrain ?</p><p><b>On sait que</b> nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique et moyennant une juste et préalable indemnité (article 545 du Code civil), et que le propriétaire d'un fonds sur lequel un tiers a édifié une construction a le droit d'en exiger la suppression (article 555 du Code civil). La Cour de cassation précise toutefois que, saisi d'une demande de démolition, le juge doit rechercher si une solution alternative — telle qu'une adaptation de la construction litigieuse — permet de mettre fin à l'empiètement constaté (Cass. 3e civ., 10 novembre 2016, n°15-25113).</p><p><b>Or, en l'espèce,</b> le voisin a édifié une construction qui empiète effectivement sur le terrain du propriétaire, sans son accord ; le juge saisi devra donc vérifier si l'ampleur de cet empiètement justifie une démolition totale ou si une solution moins radicale, comme un rabotage de l'ouvrage, permet d'y mettre fin.</p><p><b>Donc,</b> le propriétaire est fondé à demander la suppression de l'empiètement, mais la forme de cette suppression (démolition totale ou adaptation de la construction) dépendra de l'appréciation du juge au regard de l'ampleur du dépassement constaté.</p>",
       "motsCles": [
        [
         "On sait que",
         [
          "on sait que"
         ]
        ],
        [
         "Or, en l'espèce",
         [
          "or en l'espece",
          "en l'espece"
         ]
        ],
        [
         "Donc",
         [
          "donc"
         ]
        ]
       ],
       "checklist": [
        "Rappel des <b>faits qualifiés juridiquement</b> et énoncé du <b>problème de droit</b>",
        "Présentation du ou des <b>règles de droit applicables</b> introduites par “<u><b>On sait que</b></u>”",
        "<b>Application du ou des règles de droit au cas d'espèce</b> introduite par “<u><b>Or, en l'espèce</b></u>”",
        "Présentation de la <b>solution</b> du cas d'espèce introduite par “<u><b>Donc</b></u>”"
       ],
       "clt": "Ma composition respecte les consignes",
       "bilan": "Composition finale : le cas de Fadila et Sam",
       "mot": "composition",
       "gate": "la correction",
       "mt": "Correction du cas pratique"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "lib": "Partie 2",
   "num": 2,
   "court": "Un cas pratique guidé",
   "titre": "Un cas pratique guidé à résoudre",
   "accroche": "Un conseiller clientèle, un crédit impayé : à chaque étape de la méthode, choisissez la bonne proposition, puis justifiez votre choix.",
   "objectifs": [],
   "savoirs": [],
   "contexte": null,
   "steps": [
    {
     "titre": "La qualification juridique des faits",
     "tag": "Cas guidé · Choix · Justification",
     "blocks": [
      {
       "t": "contexte",
       "kind": "Cas pratique guidé à résoudre",
       "titre": "Cas pratique guidé à résoudre",
       "x": "<p>Un conseiller clientèle a une alerte sur le crédit d'un couple, marié sous le régime de la communauté légale. Ils ont deux enfants, Clara, 5 ans et Gabriel, 2 ans.</p><p>En effet, plusieurs mensualités sont impayées. Ce crédit d'un montant de 30 000 € a été signé par madame, seule, pour financer l'achat d'un véhicule de collection, ce qui est sa passion.</p><p>Le conseiller se demande vers qui il pourrait se retourner, de Monsieur, de Madame ou les deux, pour obtenir le remboursement du prêt.</p>",
       "icon": "img/ctx_scenario.webp"
      },
      {
       "t": "h3",
       "x": "Étape 1 — La qualification juridique des faits"
      },
      {
       "t": "qcm",
       "id": "g1-q",
       "titre": null,
       "consigne": "Une seule proposition est correcte.",
       "items": [
        {
         "q": "Quelle proposition choisissez-vous ?",
         "o": [
          "<b>a)</b> Un époux marié sous le régime de la communauté légale a souscrit seul un emprunt pour un bien sans lien avec les besoins du ménage.",
          "<b>b)</b> Deux époux mariés sous le régime de la séparation de biens ont souscrit ensemble un emprunt pour l'entretien du ménage.",
          "<b>c)</b> Un époux marié sous le régime de la communauté légale a souscrit seul un emprunt pour financer l'éducation de ses enfants.",
          "<b>d)</b> Deux concubins ont souscrit ensemble un emprunt pour un bien commun."
         ],
         "a": [
          0
         ],
         "e": ""
        }
       ]
      },
      {
       "t": "ouvert",
       "id": "g1-j",
       "titre": "Justification",
       "consigne": "Expliquez pourquoi vous avez retenu cette proposition et écarté les autres.",
       "lignes": 5,
       "modele": "<p><b>a)</b> <b>Correct.</b> Le régime est bien la communauté légale, Madame a signé seule (« signé par madame, seule »), et l'achat d'un véhicule de collection pour sa passion personnelle n'a aucun lien avec l'entretien du ménage ni l'éducation des enfants.<br><b>b)</b> Faux. Le régime n'est pas la séparation de biens mais la communauté légale ; de plus, l'emprunt n'a pas été signé par les deux époux mais par Madame seule, et il ne finance pas l'entretien du ménage.<br><b>c)</b> Faux. Rien dans l'énoncé n'indique que cet emprunt finance l'éducation de Clara ou de Gabriel : il finance l'achat d'un véhicule de collection, une dépense personnelle de Madame.<br><b>d)</b> Faux. Le couple est marié, et non en concubinage, et l'emprunt n'a pas été souscrit par les deux, mais par Madame seule.</p>",
       "mt": "Justification attendue (corrigé)"
      }
     ]
    },
    {
     "titre": "La formulation du problème de droit",
     "tag": "Cas guidé · Choix · Justification",
     "blocks": [
      {
       "t": "details",
       "titre": "Revoir l'énoncé du cas guidé",
       "blocks": [
        {
         "t": "contexte",
         "kind": "Cas pratique guidé à résoudre",
         "titre": "Cas pratique guidé à résoudre",
         "x": "<p>Un conseiller clientèle a une alerte sur le crédit d'un couple, marié sous le régime de la communauté légale. Ils ont deux enfants, Clara, 5 ans et Gabriel, 2 ans.</p><p>En effet, plusieurs mensualités sont impayées. Ce crédit d'un montant de 30 000 € a été signé par madame, seule, pour financer l'achat d'un véhicule de collection, ce qui est sa passion.</p><p>Le conseiller se demande vers qui il pourrait se retourner, de Monsieur, de Madame ou les deux, pour obtenir le remboursement du prêt.</p>",
         "icon": "img/ctx_scenario.webp",
         "noTitle": true
        }
       ]
      },
      {
       "t": "h3",
       "x": "Étape 2 — La formulation du problème de droit"
      },
      {
       "t": "qcm",
       "id": "g2-q",
       "titre": null,
       "consigne": "Une seule proposition est correcte.",
       "items": [
        {
         "q": "Quelle proposition choisissez-vous ?",
         "o": [
          "<b>a)</b> Un époux peut-il engager seul les biens de son conjoint et de la communauté par un emprunt qu'il a contracté seul, sans lien avec l'entretien du ménage ?",
          "<b>b)</b> Un époux peut-il, seul, faire annuler un emprunt contracté avec le consentement de son conjoint ?",
          "<b>c)</b> Un créancier peut-il exiger le remboursement anticipé d'un prêt dès le premier impayé ?",
          "<b>d)</b> Un couple marié sous le régime de la communauté légale peut-il racheter un crédit à la consommation ?"
         ],
         "a": [
          0
         ],
         "e": ""
        }
       ]
      },
      {
       "t": "ouvert",
       "id": "g2-j",
       "titre": "Justification",
       "consigne": "Expliquez pourquoi vous avez retenu cette proposition et écarté les autres.",
       "lignes": 5,
       "modele": "<p><b>a)</b> <b>Correct.</b> C'est la seule formulation générale et abstraite qui correspond exactement à la question du conseiller : peut-on engager le conjoint et/ou la communauté par un emprunt souscrit par un seul époux, sans lien avec le ménage ?<br><b>b)</b> Faux. Il n'est pas question d'annulation de l'emprunt dans l'énoncé, et aucun consentement de Monsieur n'a été donné : ce n'est donc pas la question posée.<br><b>c)</b> Faux. Le remboursement anticipé (déchéance du terme) n'est pas la question du conseiller, qui s'interroge sur les personnes que la banque peut poursuivre, pas sur le moment où elle peut agir.<br><b>d)</b> Faux. Aucun rachat de crédit n'est évoqué dans l'énoncé ; c'est un problème de droit sans rapport avec le cas.</p>",
       "mt": "Justification attendue (corrigé)"
      }
     ]
    },
    {
     "titre": "La détermination de la règle de droit applicable",
     "tag": "Cas guidé · Choix · Justification",
     "blocks": [
      {
       "t": "details",
       "titre": "Revoir l'énoncé du cas guidé",
       "blocks": [
        {
         "t": "contexte",
         "kind": "Cas pratique guidé à résoudre",
         "titre": "Cas pratique guidé à résoudre",
         "x": "<p>Un conseiller clientèle a une alerte sur le crédit d'un couple, marié sous le régime de la communauté légale. Ils ont deux enfants, Clara, 5 ans et Gabriel, 2 ans.</p><p>En effet, plusieurs mensualités sont impayées. Ce crédit d'un montant de 30 000 € a été signé par madame, seule, pour financer l'achat d'un véhicule de collection, ce qui est sa passion.</p><p>Le conseiller se demande vers qui il pourrait se retourner, de Monsieur, de Madame ou les deux, pour obtenir le remboursement du prêt.</p>",
         "icon": "img/ctx_scenario.webp",
         "noTitle": true
        }
       ]
      },
      {
       "t": "h3",
       "x": "Étape 3 — La détermination de la règle de droit applicable"
      },
      {
       "t": "qcm",
       "id": "g3-q",
       "titre": null,
       "consigne": "Une seule proposition est correcte.",
       "items": [
        {
         "q": "Quelle proposition choisissez-vous ?",
         "o": [
          "<b>a)</b> « On sait que chacun des époux ne peut engager que ses biens propres et ses revenus par un cautionnement ou un emprunt, à moins que celui-ci n'ait été contracté avec le consentement exprès de l'autre époux. »",
          "<b>b)</b> « On sait que chacun des époux a pouvoir pour passer seul les contrats qui ont pour objet l'entretien du ménage ou l'éducation des enfants, et que toute dette ainsi contractée par l'un oblige l'autre solidairement. »",
          "<b>c)</b> « On sait que les époux contribuent aux charges du mariage à proportion de leurs facultés respectives. »",
          "<b>d)</b> « On sait que la communauté se compose activement des acquêts faits par les époux ensemble ou séparément durant le mariage. »"
         ],
         "a": [
          0
         ],
         "e": ""
        }
       ]
      },
      {
       "t": "ouvert",
       "id": "g3-j",
       "titre": "Justification",
       "consigne": "Expliquez pourquoi vous avez retenu cette proposition et écarté les autres.",
       "lignes": 5,
       "modele": "<p><b>a)</b> <b>Correct</b> (art. 1415 C. civ.). C'est la seule règle qui détermine précisément quels biens peuvent être engagés lorsqu'un époux contracte seul un emprunt.<br><b>b)</b> Faux (art. 220 C. civ.). Cette règle ne s'applique qu'aux dettes ménagères (entretien du ménage, éducation des enfants) ; l'achat d'un véhicule de collection pour la passion personnelle de Madame n'entre pas dans cette catégorie.<br><b>c)</b> Faux (art. 214 C. civ.). Cette règle organise la contribution des époux aux charges du mariage entre eux ; elle ne concerne pas le droit de poursuite d'un créancier extérieur au couple.<br><b>d)</b> Faux (art. 1401 C. civ.). Cette règle décrit seulement ce qui compose activement la communauté (les acquêts) ; elle ne dit rien des biens qu'un créancier peut saisir pour une dette.</p>",
       "mt": "Justification attendue (corrigé)"
      }
     ]
    },
    {
     "titre": "L'application aux faits",
     "tag": "Cas guidé · Choix · Justification",
     "blocks": [
      {
       "t": "details",
       "titre": "Revoir l'énoncé du cas guidé",
       "blocks": [
        {
         "t": "contexte",
         "kind": "Cas pratique guidé à résoudre",
         "titre": "Cas pratique guidé à résoudre",
         "x": "<p>Un conseiller clientèle a une alerte sur le crédit d'un couple, marié sous le régime de la communauté légale. Ils ont deux enfants, Clara, 5 ans et Gabriel, 2 ans.</p><p>En effet, plusieurs mensualités sont impayées. Ce crédit d'un montant de 30 000 € a été signé par madame, seule, pour financer l'achat d'un véhicule de collection, ce qui est sa passion.</p><p>Le conseiller se demande vers qui il pourrait se retourner, de Monsieur, de Madame ou les deux, pour obtenir le remboursement du prêt.</p>",
         "icon": "img/ctx_scenario.webp",
         "noTitle": true
        }
       ]
      },
      {
       "t": "h3",
       "x": "Étape 4 — L'application aux faits"
      },
      {
       "t": "qcm",
       "id": "g4-q",
       "titre": null,
       "consigne": "Une seule proposition est correcte.",
       "items": [
        {
         "q": "Quelle proposition choisissez-vous ?",
         "o": [
          "<b>a)</b> « Or, en l'espèce, Madame a souscrit seule un emprunt de 30 000 € pour financer l'achat d'un véhicule de collection destiné à son usage personnel, sans que Monsieur y ait expressément consenti. »",
          "<b>b)</b> « Or, en l'espèce, Monsieur et Madame ont tous deux signé le contrat de crédit auprès de la banque. »",
          "<b>c)</b> « Or, en l'espèce, cet emprunt a été souscrit pour financer l'achat d'un véhicule familial nécessaire aux déplacements des enfants. »",
          "<b>d)</b> « Or, en l'espèce, Madame a obtenu l'accord exprès de Monsieur avant de signer ce crédit. »"
         ],
         "a": [
          0
         ],
         "e": ""
        }
       ]
      },
      {
       "t": "ouvert",
       "id": "g4-j",
       "titre": "Justification",
       "consigne": "Expliquez pourquoi vous avez retenu cette proposition et écarté les autres.",
       "lignes": 5,
       "modele": "<p><b>a)</b> <b>Correct.</b> C'est la seule mineure fidèle à l'énoncé : Madame a signé seule (« signé par madame, seule »), pour 30 000 €, pour un véhicule de collection qui est sa passion — donc un usage personnel —, et rien n'indique un consentement exprès de Monsieur.<br><b>b)</b> Faux. L'énoncé précise que le crédit a été « signé par madame, seule » : Monsieur n'a pas signé le contrat.<br><b>c)</b> Faux. L'énoncé indique que le véhicule financé est un véhicule de collection, qui est la passion de Madame, et non un véhicule familial destiné aux déplacements des enfants.<br><b>d)</b> Faux. Rien dans l'énoncé n'indique un consentement exprès de Monsieur ; au contraire, le conseiller se demande justement s'il peut être poursuivi, ce qui suppose qu'il n'a pas été associé à l'emprunt.</p>",
       "mt": "Justification attendue (corrigé)"
      }
     ]
    },
    {
     "titre": "La conclusion",
     "tag": "Cas guidé · Choix · Justification",
     "blocks": [
      {
       "t": "details",
       "titre": "Revoir l'énoncé du cas guidé",
       "blocks": [
        {
         "t": "contexte",
         "kind": "Cas pratique guidé à résoudre",
         "titre": "Cas pratique guidé à résoudre",
         "x": "<p>Un conseiller clientèle a une alerte sur le crédit d'un couple, marié sous le régime de la communauté légale. Ils ont deux enfants, Clara, 5 ans et Gabriel, 2 ans.</p><p>En effet, plusieurs mensualités sont impayées. Ce crédit d'un montant de 30 000 € a été signé par madame, seule, pour financer l'achat d'un véhicule de collection, ce qui est sa passion.</p><p>Le conseiller se demande vers qui il pourrait se retourner, de Monsieur, de Madame ou les deux, pour obtenir le remboursement du prêt.</p>",
         "icon": "img/ctx_scenario.webp",
         "noTitle": true
        }
       ]
      },
      {
       "t": "h3",
       "x": "Étape 5 — La conclusion"
      },
      {
       "t": "qcm",
       "id": "g5-q",
       "titre": null,
       "consigne": "Une seule proposition est correcte.",
       "items": [
        {
         "q": "Quelle proposition choisissez-vous ?",
         "o": [
          "<b>a)</b> « Donc, seuls les biens propres de Madame et ses revenus peuvent être engagés pour rembourser ce crédit ; ni les biens propres de Monsieur, ni le reste de la communauté ne peuvent être saisis. »",
          "<b>b)</b> « Donc, Monsieur et Madame sont solidairement tenus au remboursement de ce crédit. »",
          "<b>c)</b> « Donc, seuls les biens propres de Monsieur peuvent être engagés. »",
          "<b>d)</b> « Donc, le crédit est nul et aucun remboursement n'est dû. »"
         ],
         "a": [
          0
         ],
         "e": ""
        }
       ]
      },
      {
       "t": "ouvert",
       "id": "g5-j",
       "titre": "Justification",
       "consigne": "Expliquez pourquoi vous avez retenu cette proposition et écarté les autres.",
       "lignes": 5,
       "modele": "<p><b>a)</b> <b>Correct.</b> Cette conclusion découle directement de la règle (article 1415) appliquée aux faits établis à l'étape 4 : emprunt souscrit par un seul époux, sans consentement exprès de l'autre, pour un usage sans lien avec le ménage.<br><b>b)</b> Faux. Cette solution correspondrait à l'article 220 (dettes ménagères), qui ne s'applique pas ici puisque la dépense est personnelle et sans lien avec l'entretien du ménage.<br><b>c)</b> Faux. Aucune règle ne permet d'engager les biens propres de Monsieur pour une dette qu'il n'a pas contractée et à laquelle il n'a pas consenti ; l'article 1415 protège au contraire ses biens propres.<br><b>d)</b> Faux. L'article 1415 ne prévoit pas la nullité de l'emprunt : il limite seulement le gage du créancier aux biens propres et aux revenus de l'époux qui a signé seul. Le crédit reste valable et dû par Madame.</p>",
       "mt": "Justification attendue (corrigé)"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "lib": "Partie 3",
   "num": 3,
   "court": "Un cas pratique en autonomie",
   "titre": "Un cas pratique à résoudre en autonomie",
   "accroche": "Les époux Vasseur et la clinique Belmont : à partir de deux annexes, résolvez le cas seul(e), puis comparez avec la correction.",
   "objectifs": [],
   "savoirs": [],
   "contexte": null,
   "steps": [
    {
     "titre": "Résoudre le cas pratique",
     "tag": "Cas · Annexes · Rédaction",
     "blocks": [
      {
       "t": "contexte",
       "kind": "Cas pratique",
       "titre": "Cas pratique",
       "x": "<p>Conseiller d'une agence bancaire, vous constatez – en consultant les relevés de compte – que les époux Vasseur, mariés sous le régime de la communauté légale, ont fait l'objet de frais de relance de la part de la clinique privée Belmont pour plusieurs échéances impayées, d'un montant total de 6 500 €.</p><p>Cette somme correspond à une intervention de chirurgie esthétique (liposuccion) réalisée à la demande de Mme Vasseur seule, sans finalité thérapeutique, dont le contrat a été signé par elle seule. Les revenus mensuels du couple s'élèvent à environ 2 800 € au total.</p><p>Vous vous demandez vers qui la clinique pourrait se retourner — M. Vasseur, Mme Vasseur, ou les deux — pour obtenir le paiement des sommes dues.</p><p>Vous disposez des <u><b>annexes 1 et 2</b></u>.</p>",
       "icon": "img/ctx_scenario.webp"
      },
      {
       "t": "doc",
       "titre": "Annexe 1 — Article 220 du Code civil (extrait)",
       "html": "<p>“Chacun des époux a pouvoir pour passer seul les contrats qui ont pour objet l'entretien du ménage ou l'éducation des enfants : toute dette ainsi contractée par l'un oblige l'autre solidairement.</p><p>La solidarité n'a pas lieu, néanmoins, pour des dépenses manifestement excessives, eu égard au train de vie du ménage, à l'utilité ou à l'inutilité de l'opération, à la bonne ou mauvaise foi du tiers contractant.</p><p>[…]”.</p>",
       "icon": "img/ico_document.webp"
      },
      {
       "t": "doc",
       "titre": "Annexe 2 — Extrait de jurisprudence",
       "html": "<p><b>Cour de cassation, 1re chambre civile, 17 décembre 2014, n° 13-25.117, publié au Bulletin</b></p><p><b>Faits :</b> Mme X est hospitalisée à l'Hôtel-Dieu en 2008. Les frais d'hospitalisation s'élèvent à 15 306,30 €. Cette somme demeurant impayée, l'Assistance Publique – Hôpitaux de Paris (AP-HP) assigne en paiement M. X, l'époux de la patiente, qui n'était pourtant pas partie aux soins.</p><p><b>Moyen invoqué par M. X :</b> il soutenait ne pas pouvoir être tenu au paiement d'une dette de santé contractée par son épouse seule, à laquelle il était resté étranger.</p><p><b>Solution de la Cour de cassation :</b> la Cour rejette le pourvoi. Elle retient que toute dette de santé contractée par un époux engage l'autre solidairement, sur le fondement de l'article 220 du Code civil, dès lors que cette dette ne relève d'aucune des exceptions prévues à l'alinéa 2 de ce texte (dépense manifestement excessive au regard du train de vie du ménage, de l'utilité ou de l'inutilité de l'opération, ou de la mauvaise foi du tiers contractant). M. X est en conséquence condamné au paiement de la somme réclamée par l'AP-HP.</p>",
       "icon": "img/ico_document.webp"
      },
      {
       "t": "ouvert",
       "id": "p3-q1",
       "titre": "Votre cas pratique",
       "consigne": "Rédigez votre cas pratique en suivant les consignes de rédaction : rappel des faits qualifiés juridiquement et énoncé du problème de droit, puis « On sait que », « Or, en l'espèce » et « Donc ».",
       "lignes": 16,
       "modele": "<p><u><b>1. Qualification juridique des faits</b></u></p><p>M. et Mme Vasseur sont mariés sous le régime de la communauté légale. Mme Vasseur a, seule, conclu avec la clinique privée Belmont un contrat portant sur une intervention de chirurgie esthétique (liposuccion), dépourvue de toute finalité thérapeutique, d'un coût de 6 500 €. Plusieurs échéances restant impayées, la clinique cherche à en obtenir le règlement et s'interroge sur la personne — M. Vasseur, Mme Vasseur, ou les deux — contre laquelle elle peut agir.</p><p>Il s'agit donc d'une dette de santé, contractée par un seul époux, dont il convient de déterminer si elle engage également l'époux qui n'y est pas intervenu.</p><p><u><b>2. Problème de droit</b></u></p><p>Une dette de santé contractée par un seul époux engage-t-elle solidairement l'autre époux lorsque l'acte médical en cause, dépourvu de nécessité thérapeutique, présente un coût manifestement disproportionné au regard des ressources du ménage ?</p><p><u><b>3. Majeure — On sait que…</b></u></p><p>On sait que l'article 220 du Code civil dispose que chacun des époux a le pouvoir de passer seul les contrats ayant pour objet l'entretien du ménage, une telle dette obligeant alors solidairement l'autre époux (Annexe 1). La Cour de cassation a précisé le champ de cette disposition en y intégrant les dépenses de santé : dans un arrêt du 17 décembre 2014, elle a jugé que toute dette de santé contractée par un époux engage l'autre solidairement sur le fondement de l'article 220 (Annexe 2).</p><p>On sait cependant que ce principe de solidarité connaît une exception : en application du second alinéa de l'article 220, la solidarité est écartée lorsque la dépense est manifestement excessive, ce caractère s'appréciant au regard de trois critères cumulatifs — le train de vie du ménage, l'utilité ou l'inutilité de l'opération, et la bonne ou mauvaise foi du tiers contractant. C'est d'ailleurs faute pour cette exception d'être caractérisée que la Cour de cassation a maintenu la solidarité dans son arrêt du 17 décembre 2014, les frais d'hospitalisation en cause répondant à un besoin de soins nécessaire et n'excédant pas les capacités du ménage.</p><p><u><b>4. Mineure — Or, en l'espèce…</b></u></p><p>Or, en l'espèce, la situation se distingue de celle jugée par la Cour de cassation en 2014. D'une part, l'intervention pratiquée sur Mme Vasseur est un acte de confort, sans nécessité thérapeutique : à la différence de soins hospitaliers indispensables, cette opération répond à une pure convenance personnelle, ce qui caractérise l'inutilité de l'opération au sens de l'article 220 alinéa 2. D'autre part, son coût, 6 500 €, représente plus de deux mois de revenus du ménage, dont les ressources mensuelles s'élèvent à environ 2 800 € : ce montant est manifestement disproportionné au regard du train de vie du couple.</p><p>Ces deux critères — inutilité de l'opération et disproportion au regard du train de vie du ménage — étant réunis, la dépense engagée par Mme Vasseur doit être qualifiée de manifestement excessive.</p><p><u><b>5. Conclusion — Donc…</b></u></p><p>Donc, la dépense étant manifestement excessive au sens de l'article 220 alinéa 2 du Code civil, l'exception à la solidarité s'applique : M. Vasseur, qui n'est pas intervenu au contrat, ne peut être tenu au paiement de cette dette envers la clinique Belmont. Seule Mme Vasseur, en sa qualité de signataire, demeure personnellement engagée et devra répondre du paiement des sommes dues sur son patrimoine propre.</p>",
       "motsCles": [
        [
         "On sait que",
         [
          "on sait que"
         ]
        ],
        [
         "Or, en l'espèce",
         [
          "or en l'espece",
          "en l'espece"
         ]
        ],
        [
         "Donc",
         [
          "donc"
         ]
        ]
       ],
       "checklist": [
        "Rappel des <b>faits qualifiés juridiquement</b> et énoncé du <b>problème de droit</b>",
        "Présentation du ou des <b>règles de droit applicables</b> introduites par “<u><b>On sait que</b></u>”",
        "<b>Application du ou des règles de droit au cas d'espèce</b> introduite par “<u><b>Or, en l'espèce</b></u>”",
        "Présentation de la <b>solution</b> du cas d'espèce introduite par “<u><b>Donc</b></u>”"
       ],
       "clt": "Ma composition respecte les consignes",
       "bilan": "Cas pratique : les époux Vasseur",
       "mot": "composition",
       "gate": "la correction",
       "mt": "Correction du cas pratique"
      }
     ]
    },
    {
     "titre": "Je mesure ma progression",
     "tag": "Activité",
     "blocks": [
      {
       "t": "p",
       "x": "Vous avez fait l'évaluation diagnostique au début de la séquence. Refaites-la maintenant et comparez vos réponses.",
       "c": "lead"
      },
      {
       "t": "ipsative",
       "titre": "Je refais l'évaluation diagnostique",
       "consigne": "Pour chaque affirmation, choisissez Vrai ou Faux."
      }
     ]
    }
   ]
  }
 ],
 "quiz": {
  "titre": "Quiz final",
  "court": "12 questions, partie par partie, pour vérifier vos acquis.",
  "intro": "Voici <b>12 questions</b>, classées par partie (4 par partie). Quand vous avez répondu à toutes, cliquez sur « Vérifier mes réponses » : chaque réponse est corrigée et expliquée, et vous voyez votre résultat pour chaque partie afin de savoir lesquelles revoir. Vous pouvez recommencer autant de fois que vous le souhaitez.",
  "blocks": [
   {
    "t": "qcm",
    "id": "quiz",
    "titre": "La méthodologie du cas pratique",
    "consigne": "Choisissez la bonne réponse. Quand plusieurs réponses sont possibles, la question le précise.",
    "items": [
     {
      "m": 2,
      "q": "À la 1re étape (la qualification juridique des faits), que fait-on des informations de l'énoncé ?",
      "o": [
       "On les recopie toutes, dans l'ordre de l'énoncé.",
       "On ne garde que celles qui sont favorables à l'une des parties.",
       "On élimine celles qui ne sont pas pertinentes d'un point de vue juridique et on traduit la situation en langage juridique.",
       "On les remplace par les articles de loi correspondants."
      ],
      "a": [
       2
      ],
      "e": "La qualification juridique consiste à reprendre les faits, à éliminer les informations non pertinentes d'un point de vue juridique et à traduire la situation, décrite en langage courant, en langage juridique."
     },
     {
      "m": 2,
      "q": "Dans le cas de Fadila et Sam, quelle formulation est un problème de droit correctement posé ?",
      "o": [
       "Un propriétaire peut-il obtenir la démolition d'une construction édifiée par un tiers, dès lors qu'elle empiète sur son terrain ?",
       "Fadila peut-elle obtenir la démolition du cabanon que Sam a construit sur son terrain ?",
       "Sam a-t-il profité de l'absence de Fadila pour construire son cabanon ?",
       "Comment Fadila peut-elle trouver un règlement amiable avec Sam ?"
      ],
      "a": [
       0
      ],
      "e": "Un problème de droit est une question juridique d'ordre général : on passe du particulier au général, avec des termes concis, généraux et impersonnels (pas de noms de personnes)."
     },
     {
      "m": 2,
      "q": "Dans un cas pratique, où trouve-t-on souvent les règles juridiques à appliquer ?",
      "o": [
       "Dans les faits de l'énoncé, qui les contiennent toujours.",
       "Nulle part : il faut toujours les connaître par cœur.",
       "Dans la question posée, qui indique l'article à appliquer.",
       "Dans les annexes : extraits d'un Code, de contrats ou de décisions de justice."
      ],
      "a": [
       3
      ],
      "e": "À la 3e étape, on repère les règles générales applicables : elles sont souvent données dans les annexes (Code, contrats, décisions de justice). On repère les mots-clefs du problème de droit, puis on les met en relation avec les informations utiles des annexes."
     },
     {
      "m": 2,
      "q": "Après le rappel des faits qualifiés et l'énoncé du problème de droit, comment s'enchaînent les trois temps de la composition finale ?",
      "o": [
       "« Donc » (la solution), puis « On sait que », puis « Or, en l'espèce ».",
       "« On sait que » (la règle), puis « Or, en l'espèce » (l'application au cas), puis « Donc » (la solution).",
       "« Or, en l'espèce », puis « On sait que », puis « Donc ».",
       "« On sait que », puis « Donc », puis « Or, en l'espèce »."
      ],
      "a": [
       1
      ],
      "e": "La règle de droit est introduite par « On sait que », son application au cas d'espèce par « Or, en l'espèce », la solution par « Donc »."
     },
     {
      "m": 3,
      "q": "Dans le cas guidé, pourquoi l'article 220 du Code civil (dettes ménagères) ne s'applique-t-il pas ?",
      "o": [
       "Les époux sont mariés sous le régime de la séparation de biens.",
       "Le crédit finance un véhicule de collection, passion personnelle de Madame : il n'a pas pour objet l'entretien du ménage ni l'éducation des enfants.",
       "Monsieur a refusé de signer le contrat de crédit.",
       "Le montant du crédit est trop faible pour que cet article s'applique."
      ],
      "a": [
       1
      ],
      "e": "L'article 220 ne s'applique qu'aux dettes ménagères (entretien du ménage, éducation des enfants) ; l'achat d'un véhicule de collection pour la passion personnelle de Madame n'entre pas dans cette catégorie."
     },
     {
      "m": 3,
      "q": "Dans le cas guidé, pourquoi « Un créancier peut-il exiger le remboursement anticipé d'un prêt dès le premier impayé ? » n'est-il pas le bon problème de droit ?",
      "o": [
       "Parce qu'un problème de droit ne peut jamais concerner un créancier.",
       "Parce que le crédit n'a pas de mensualités impayées.",
       "Parce qu'il faut toujours citer le nom des époux dans le problème de droit.",
       "Le conseiller se demande quelles personnes la banque peut poursuivre, et non à quel moment elle peut agir."
      ],
      "a": [
       3
      ],
      "e": "Le remboursement anticipé (déchéance du terme) n'est pas la question du conseiller, qui s'interroge sur les personnes que la banque peut poursuivre (Monsieur, Madame ou les deux), pas sur le moment où elle peut agir."
     },
     {
      "m": 3,
      "q": "Dans le cas guidé, qu'est-ce qui permet d'écarter la qualification « le crédit finance l'éducation de Clara et de Gabriel » ?",
      "o": [
       "L'énoncé indique que le crédit finance l'achat d'un véhicule de collection, qui est la passion de Madame.",
       "L'énoncé indique que Clara et Gabriel sont trop jeunes pour être scolarisés.",
       "L'énoncé précise que le crédit a été signé par Monsieur seul.",
       "L'énoncé indique que le couple est marié sous le régime de la séparation de biens."
      ],
      "a": [
       0
      ],
      "e": "Rien dans l'énoncé n'indique que cet emprunt finance l'éducation des enfants : il finance l'achat d'un véhicule de collection, une dépense personnelle de Madame."
     },
     {
      "m": 3,
      "q": "Dans le cas guidé, quelle conclusion tire-t-on de l'article 1415 du Code civil ?",
      "o": [
       "Seuls les biens propres de Madame et ses revenus peuvent être engagés ; ni les biens propres de Monsieur ni le reste de la communauté ne peuvent être saisis.",
       "Monsieur et Madame sont solidairement tenus au remboursement du crédit.",
       "Seuls les biens propres de Monsieur peuvent être engagés.",
       "Le crédit est nul et aucun remboursement n'est dû."
      ],
      "a": [
       0
      ],
      "e": "La règle (article 1415) appliquée aux faits (emprunt souscrit par un seul époux, sans consentement exprès de l'autre, pour un usage sans lien avec le ménage) conduit à cette conclusion. Le crédit reste valable et dû par Madame."
     },
     {
      "m": 4,
      "q": "Que prévoit le premier alinéa de l'article 220 du Code civil (Annexe 1) ?",
      "o": [
       "Chaque époux ne peut engager que ses biens propres et ses revenus par un emprunt.",
       "Les époux contribuent aux charges du mariage à proportion de leurs facultés respectives.",
       "Chaque époux peut passer seul les contrats ayant pour objet l'entretien du ménage ou l'éducation des enfants, et la dette ainsi contractée oblige l'autre solidairement.",
       "Aucun époux ne peut passer seul un contrat, quel qu'en soit l'objet."
      ],
      "a": [
       2
      ],
      "e": "Article 220, alinéa 1 : chaque époux a pouvoir pour passer seul les contrats qui ont pour objet l'entretien du ménage ou l'éducation des enfants ; toute dette ainsi contractée par l'un oblige l'autre solidairement."
     },
     {
      "m": 4,
      "q": "Selon l'Annexe 1, dans quel cas la solidarité n'a-t-elle pas lieu ?",
      "o": [
       "Pour les dépenses manifestement excessives, eu égard au train de vie du ménage, à l'utilité ou à l'inutilité de l'opération, à la bonne ou mauvaise foi du tiers contractant.",
       "Pour toutes les dettes de santé, sans exception.",
       "Pour toute dépense supérieure à 2 000 €, quelles que soient les circonstances.",
       "Lorsque l'époux qui a signé est le seul à percevoir des revenus."
      ],
      "a": [
       0
      ],
      "e": "Le second alinéa de l'article 220 écarte la solidarité pour les dépenses manifestement excessives, en tenant compte du train de vie du ménage, de l'utilité ou de l'inutilité de l'opération et de la bonne ou mauvaise foi du tiers contractant."
     },
     {
      "m": 4,
      "q": "Dans l'arrêt du 17 décembre 2014 (Annexe 2), pourquoi M. X est-il condamné à payer les frais d'hospitalisation de son épouse ?",
      "o": [
       "Parce qu'il avait signé le contrat avec l'hôpital.",
       "Parce qu'il avait expressément consenti à l'hospitalisation de son épouse.",
       "Parce que la Cour refuse d'appliquer l'article 220 aux dettes de santé.",
       "Toute dette de santé contractée par un époux engage l'autre solidairement (art. 220), dès lors qu'aucune exception de l'alinéa 2 n'est caractérisée."
      ],
      "a": [
       3
      ],
      "e": "La Cour de cassation rejette le pourvoi : toute dette de santé contractée par un époux engage l'autre solidairement sur le fondement de l'article 220, dès lors qu'elle ne relève d'aucune des exceptions de l'alinéa 2."
     },
     {
      "m": 4,
      "q": "Pourquoi la solution de l'arrêt de 2014 n'est-elle pas transposée telle quelle au cas des époux Vasseur ?",
      "o": [
       "Parce que les époux Vasseur sont mariés sous un autre régime matrimonial.",
       "Une liposuccion sans finalité thérapeutique est un acte de confort, et son coût (6 500 €) est manifestement disproportionné au regard des revenus du ménage (environ 2 800 € par mois).",
       "Parce que M. Vasseur a refusé de payer la clinique.",
       "Parce que la Cour de cassation ne s'est jamais prononcée sur l'article 220."
      ],
      "a": [
       1
      ],
      "e": "Les frais d'hospitalisation de 2014 répondaient à un besoin de soins nécessaire et n'excédaient pas les capacités du ménage. Ici, l'opération est inutile et la dépense manifestement excessive : M. Vasseur ne peut être tenu au paiement, seule Mme Vasseur demeure engagée."
     }
    ]
   }
  ]
 }
};
