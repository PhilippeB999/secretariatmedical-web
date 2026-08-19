/* ============================================================
   SecretariatMedicalQuest — Données du programme ASP 5374
   (Secrétariat médical). Contenu porté depuis l'app source vers
   le moteur web (PWA).
   Format moteur: COMPETENCIES[].tiers[].questions[] avec choices[{fr,en,correct}].
   9 modules officiels, 3 paliers par module.
   Les questions QCM sont des EXEMPLES à valider par les enseignants.
   ============================================================ */

const PROGRAM = {
  fr: {
    code: "5374",
    title: "Secrétariat médical",
    subtitle: "ASP 5374 — 450 heures — 30 unités"
  },
  en: {
    code: "5374",
    title: "Medical Secretary",
    subtitle: "AVS 5374 — 450 hours — 30 credits"
  }
};

function ch(fr, en, correct) { return { fr, en, correct: !!correct }; }

/* Question de type vrai/faux: affirmation à juger. */
function tf(fr, en, isTrue) { return { type: "tf", fr, en, isTrue: !!isTrue }; }

/* Question de type "association de termes": l'élève touche un terme puis
   sa définition correspondante. pairs: tableau de
   { term_fr, term_en, def_fr, def_en }. Toutes les paires doivent être
   associées correctement pour que la question soit considérée réussie. */
function pair(term_fr, term_en, def_fr, def_en) { return { term_fr, term_en, def_fr, def_en }; }
function match(fr, en, pairs) { return { type: "match", fr, en, pairs }; }

/* Question de type "situation complexe" (mise en situation): un court
   scénario réaliste suivi d'un choix multiple basé sur le jugement
   professionnel. Réutilise le même format "choices" qu'un QCM standard. */
function scenario(fr, en, choices) { return { type: "scenario", fr, en, choices }; }

/* Paliers de difficulté d'une quête. Chaque compétence est maintenant
   divisée en 3 paliers progressifs (tiers[]), débloqués l'un après l'autre:
   Débutant -> Intermédiaire -> Avancé. Réussir le palier 1 d'une compétence
   déverrouille la compétence suivante sur la carte; réussir le palier 3
   (Avancé) accorde le badge de maîtrise de la compétence. */

/* Un palier de difficulté d'un module (compat. données source). */
function lvl(level, label_fr, label_en, questions) { return { level, label_fr, label_en, questions }; }

const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];


const COMPETENCIES = [
  {
    id: "secmed01", code: "449301", hours: 15, order: 1,
    title_fr: "Profession et formation", title_en: "Profession and Training",
    icon: "🏥",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Dans quels milieux exerce principalement une secrétaire médicale?", en: "In which settings does a medical secretary mainly work?",
          choices: [ ch("Centres hospitaliers, cliniques médicales, cabinets de médecins, laboratoires", "Hospitals, medical clinics, doctors' offices, medical labs", true), ch("Uniquement dans des études notariales", "Only in notary offices"), ch("Uniquement dans des usines manufacturières", "Only in manufacturing plants"), ch("Uniquement dans des agences de voyages", "Only in travel agencies") ] },
        { fr: "Quelles sont les deux fonctions distinctes du métier de secrétariat médical?", en: "What are the two distinct functions of the medical secretary trade?",
          choices: [ ch("Transcription de rapports médicaux et soutien administratif aux consultations", "Medical report transcription and administrative support for consultations", true), ch("Diagnostic médical et prescription de médicaments", "Medical diagnosis and prescribing medication"), ch("Chirurgie et anesthésie", "Surgery and anesthesia"), ch("Comptabilité et paie uniquement", "Accounting and payroll only") ] },
        tf("Le programme Secrétariat médical (ASP 5374) mène à l'obtention d'un diplôme d'études professionnelles (DEP).", "The Medical Secretary program (VSA 5374) leads to a Diploma of Vocational Studies (DVS).", false)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quel programme est normalement un préalable pour être admis à l'ASP Secrétariat médical?", en: "Which program is normally a prerequisite for admission to the Medical Secretary VSA?",
          choices: [ ch("DEP Secrétariat (5357)", "DVS Secretarial Studies (5357)", true), ch("DEP Soins infirmiers", "DVS Nursing"), ch("DEP Comptabilité", "DVS Accounting"), ch("Aucun programme préalable n'est requis", "No prerequisite program is required") ] },
        { fr: "Combien d'heures totalise le programme Secrétariat médical (ASP 5374)?", en: "How many hours does the Medical Secretary program (VSA 5374) total?",
          choices: [ ch("450 heures", "450 hours", true), ch("1485 heures", "1485 hours"), ch("900 heures", "900 hours"), ch("180 heures", "180 hours") ] },
        tf("Des 450 heures du programme, 330 sont consacrées aux compétences propres au métier et 120 aux compétences générales.", "Of the program's 450 hours, 330 are devoted to job-specific competencies and 120 to general competencies.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Pourquoi une rigueur constante est-elle exigée dans l'exercice de ce métier?", en: "Why is constant rigour required in the practice of this trade?",
          choices: [ ch("Parce que des erreurs peuvent avoir des conséquences importantes sur des vies humaines", "Because errors can have significant consequences on human lives", true), ch("Parce que le salaire dépend du nombre d'erreurs commises", "Because pay depends on the number of errors made"), ch("Parce que les erreurs n'ont aucune conséquence dans ce secteur", "Because errors have no consequences in this sector"), ch("Parce que c'est une exigence purement esthétique", "Because it's a purely aesthetic requirement") ] },
        { fr: "Une secrétaire médicale expérimentée peut éventuellement se voir confier...", en: "An experienced medical secretary may eventually be entrusted with...",
          choices: [ ch("La supervision d'une équipe de travail", "Supervising a work team", true), ch("La pratique de la médecine générale", "Practicing general medicine"), ch("La direction d'un hôpital sans formation additionnelle", "Running a hospital with no additional training"), ch("La prescription d'examens d'imagerie", "Prescribing imaging exams") ] },
        tf("L'ASP Secrétariat médical ne nécessite aucun préalable en secrétariat général.", "The Medical Secretary VSA requires no prerequisite in general secretarial studies.", false)
      ])
    ]
  },
  {
    id: "secmed02", code: "449313", hours: 45, order: 2,
    title_fr: "Interprétation de termes médicaux", title_en: "Interpreting Medical Terms",
    icon: "🔤",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Dans « bradycardie », que signifie le préfixe « brady- »?", en: "In 'bradycardia', what does the prefix 'brady-' mean?",
          choices: [ ch("Lent", "Slow", true), ch("Rapide", "Fast"), ch("Absent", "Absent"), ch("Douloureux", "Painful") ] },
        { fr: "Dans « arthrite », que signifie le suffixe « -ite »?", en: "In 'arthritis', what does the suffix '-itis' mean?",
          choices: [ ch("Inflammation", "Inflammation", true), ch("Ablation chirurgicale", "Surgical removal"), ch("Absence totale", "Total absence"), ch("Douleur chronique uniquement", "Chronic pain only") ] },
        tf("Un terme médical peut combiner un préfixe, un radical et un suffixe.", "A medical term can combine a prefix, a root and a suffix.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Dans « myalgie », que signifie le suffixe « -algie »?", en: "In 'myalgia', what does the suffix '-algia' mean?",
          choices: [ ch("Douleur", "Pain", true), ch("Inflammation", "Inflammation"), ch("Ablation", "Removal"), ch("Dilatation", "Dilation") ] },
        { fr: "Que signifie généralement le préfixe « hyper- » dans un terme médical?", en: "What does the prefix 'hyper-' generally mean in a medical term?",
          choices: [ ch("Excès, au-dessus de la normale", "Excess, above normal", true), ch("Manque, en dessous de la normale", "Lack, below normal"), ch("À l'intérieur de", "Inside"), ch("À travers", "Through") ] },
        tf("Une abréviation médicale n'a jamais plus d'une signification possible.", "A medical abbreviation never has more than one possible meaning.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Le terme « cardiomyopathie » combine cardio- (cœur), myo- (muscle) et -pathie. Que désigne-t-il?", en: "The term 'cardiomyopathy' combines cardio- (heart), myo- (muscle) and -pathy. What does it refer to?",
          choices: [ ch("Une maladie du muscle cardiaque", "A disease of the heart muscle", true), ch("Une chirurgie du cœur", "Heart surgery"), ch("Un examen d'imagerie du thorax", "A chest imaging exam"), ch("Une prise de sang", "A blood test") ] },
        { fr: "Le terme « gastro-entérologie » combine gastro- (estomac) et entéro- (intestin). Que désigne le suffixe « -logie »?", en: "The term 'gastroenterology' combines gastro- (stomach) and entero- (intestine). What does the suffix '-ology' refer to?",
          choices: [ ch("L'étude, la spécialité qui s'y consacre", "The study, the specialty devoted to it", true), ch("Une ablation chirurgicale", "A surgical removal"), ch("Une douleur aiguë", "Acute pain"), ch("Un examen sanguin", "A blood test") ] },
        tf("Une secrétaire médicale doit toujours vérifier le sens d'un terme médical inconnu plutôt que de le deviner.", "A medical secretary should always verify the meaning of an unfamiliar medical term rather than guess it.", true)
      ])
    ]
  },
  {
    id: "secmed03", code: "449324", hours: 60, order: 3,
    title_fr: "Liens entre termes médicaux et spécialités", title_en: "Linking Medical Terms and Specialties",
    icon: "🧬",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle spécialité médicale traite principalement des troubles du cœur?", en: "Which medical specialty mainly treats heart disorders?",
          choices: [ ch("La cardiologie", "Cardiology", true), ch("La dermatologie", "Dermatology"), ch("La podiatrie", "Podiatry"), ch("L'ophtalmologie", "Ophthalmology") ] },
        { fr: "Quelle spécialité médicale traite principalement des troubles de la peau?", en: "Which medical specialty mainly treats skin disorders?",
          choices: [ ch("La dermatologie", "Dermatology", true), ch("La cardiologie", "Cardiology"), ch("La néphrologie", "Nephrology"), ch("L'urologie", "Urology") ] },
        tf("Chaque spécialité médicale est associée à un ou plusieurs systèmes du corps humain.", "Each medical specialty is associated with one or more systems of the human body.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle spécialité s'intéresse principalement au système nerveux?", en: "Which specialty mainly focuses on the nervous system?",
          choices: [ ch("La neurologie", "Neurology", true), ch("L'orthopédie", "Orthopedics"), ch("La gastro-entérologie", "Gastroenterology"), ch("L'endocrinologie", "Endocrinology") ] },
        { fr: "Une IRM (imagerie par résonance magnétique) est un exemple de...", en: "An MRI (magnetic resonance imaging) is an example of a...",
          choices: [ ch("Examen d'imagerie médicale", "Medical imaging exam", true), ch("Traitement chirurgical", "Surgical treatment"), ch("Médicament", "Medication"), ch("Formulaire administratif", "Administrative form") ] },
        tf("L'orthopédie s'intéresse principalement aux os, aux articulations et aux muscles.", "Orthopedics mainly focuses on bones, joints and muscles.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Quelle spécialité est le plus souvent associée au suivi de la grossesse et de l'accouchement?", en: "Which specialty is most often associated with monitoring pregnancy and childbirth?",
          choices: [ ch("L'obstétrique", "Obstetrics", true), ch("La rhumatologie", "Rheumatology"), ch("L'urologie", "Urology"), ch("La pneumologie", "Pulmonology") ] },
        { fr: "Un rapport mentionne une « arthrite » chez un patient. À quelle spécialité ce terme est-il le plus souvent lié?", en: "A report mentions a patient's 'arthritis'. Which specialty is this term most often linked to?",
          choices: [ ch("La rhumatologie", "Rheumatology", true), ch("La dermatologie", "Dermatology"), ch("L'ophtalmologie", "Ophthalmology"), ch("La cardiologie", "Cardiology") ] },
        tf("La cardiologie est la spécialité qui traite principalement des troubles de la peau.", "Cardiology is the specialty that mainly treats skin disorders.", false)
      ])
    ]
  },
  {
    id: "secmed04", code: "449333", hours: 45, order: 4,
    title_fr: "Révision de rapports transcrits par systèmes automatisés", title_en: "Reviewing Auto-Transcribed Reports",
    icon: "🎧",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel est le but principal de la révision d'un rapport transcrit par un système automatisé?", en: "What is the main purpose of reviewing a report transcribed by an automated system?",
          choices: [ ch("Détecter et corriger les erreurs de transcription", "Detecting and correcting transcription errors", true), ch("Traduire le rapport dans une autre langue", "Translating the report into another language"), ch("Résumer le rapport en une phrase", "Summarizing the report in one sentence"), ch("Supprimer les renseignements sur le patient", "Deleting the patient's information") ] },
        { fr: "Quels équipements sont couramment utilisés en transcription médicale?", en: "Which equipment is commonly used in medical transcription?",
          choices: [ ch("Un pédalier et un casque d'écoute", "A foot pedal and a headset", true), ch("Un microscope et une centrifugeuse", "A microscope and a centrifuge"), ch("Un stéthoscope et un tensiomètre", "A stethoscope and a blood pressure cuff"), ch("Un défibrillateur", "A defibrillator") ] },
        tf("Les systèmes de reconnaissance vocale peuvent produire des erreurs comme des mots manquants ou des doublons.", "Speech recognition systems can produce errors such as missing words or duplicated words.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "En plus de l'orthographe, quels autres éléments faut-il vérifier lors de la révision d'un texte transcrit?", en: "Besides spelling, what other elements must be checked when reviewing a transcribed text?",
          choices: [ ch("La grammaire, la ponctuation et les majuscules", "Grammar, punctuation and capitalization", true), ch("Uniquement la police de caractères", "Only the font"), ch("Uniquement la couleur du texte", "Only the text colour"), ch("Rien d'autre n'est nécessaire", "Nothing else is necessary") ] },
        { fr: "Une partie de la dictée est inaudible ou peu claire. Quelle est la bonne pratique?", en: "Part of the dictation is inaudible or unclear. What is the correct practice?",
          choices: [ ch("Faire une recherche à l'aide de sources fiables plutôt que deviner", "Research it using reliable sources rather than guessing", true), ch("Inventer un mot plausible", "Making up a plausible word"), ch("Laisser un blanc sans vérifier", "Leaving a blank without checking"), ch("Supprimer la phrase concernée", "Deleting the sentence in question") ] },
        tf("Lors de la révision, seule l'orthographe doit être vérifiée, pas la grammaire ni la ponctuation.", "During review, only spelling needs to be checked, not grammar or punctuation.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Pourquoi les informations quantitatives (ex. nombre de points de suture) exigent-elles une attention particulière?", en: "Why do quantitative details (e.g. number of stitches) require special attention?",
          choices: [ ch("Une erreur sur ces détails peut nuire à l'exactitude du dossier médical", "An error in these details can compromise the accuracy of the medical record", true), ch("Ces détails n'apparaissent jamais dans les rapports médicaux", "These details never appear in medical reports"), ch("Ils sont toujours corrects automatiquement", "They are always automatically correct"), ch("Ils n'ont aucune importance clinique", "They have no clinical importance") ] },
        { fr: "Que faut-il vérifier avant de considérer un rapport révisé comme terminé?", en: "What must be checked before considering a revised report complete?",
          choices: [ ch("La sauvegarde dans le bon format et son envoi au bon endroit", "Saving it in the right format and sending it to the right place", true), ch("Uniquement que le fichier a un nom", "Only that the file has a name"), ch("Uniquement la date du jour", "Only today's date"), ch("Rien, la sauvegarde automatique suffit toujours", "Nothing, automatic saving is always enough") ] },
        tf("Une fois le rapport sauvegardé, il n'est plus nécessaire de vérifier le format ou la destination d'enregistrement.", "Once the report is saved, there is no longer any need to check the format or where it was saved.", false)
      ])
    ]
  },
  {
    id: "secmed05", code: "449343", hours: 45, order: 5,
    title_fr: "Transcription de rapports de consultation médicale", title_en: "Transcribing Medical Consultation Reports",
    icon: "🎙️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Comment doit être la transcription d'une dictée de consultation médicale?", en: "How should the transcription of a medical consultation dictation be?",
          choices: [ ch("Exhaustive et fidèle à la dictée originale", "Exhaustive and faithful to the original dictation", true), ch("Résumée en quelques mots-clés", "Summarized in a few keywords"), ch("Réécrite dans un style plus simple", "Rewritten in a simpler style"), ch("Traduite automatiquement en anglais", "Automatically translated into English") ] },
        { fr: "Quelles informations sont essentielles dans un rapport de consultation médicale?", en: "What information is essential in a medical consultation report?",
          choices: [ ch("L'identité du patient, celle du professionnel de la santé, et les dates", "The patient's identity, the healthcare professional's identity, and the dates", true), ch("Uniquement le nom de la clinique", "Only the clinic's name"), ch("Uniquement le numéro de téléphone du patient", "Only the patient's phone number"), ch("Aucune information particulière n'est requise", "No particular information is required") ] },
        tf("La transcription doit respecter les priorités indiquées dans le système informatique.", "Transcription must respect the priorities indicated in the computer system.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Une dictée présente un bruit de fond ou une prononciation particulière. Quelle est la bonne approche?", en: "A dictation has background noise or unusual pronunciation. What is the right approach?",
          choices: [ ch("Utiliser des stratégies d'écoute adaptées (réécoute, ralenti, recherche des passages incertains)", "Use appropriate listening strategies (replaying, slowing down, researching unclear passages)", true), ch("Ignorer les passages difficiles à comprendre", "Ignore the parts that are hard to understand"), ch("Transcrire n'importe quoi de plausible", "Transcribe anything plausible"), ch("Refuser de transcrire la dictée", "Refuse to transcribe the dictation") ] },
        { fr: "Comment doit-on transcrire un terme dicté dans une langue étrangère?", en: "How should a term dictated in a foreign language be transcribed?",
          choices: [ ch("Entre guillemets", "In quotation marks", true), ch("En le traduisant automatiquement en français", "By automatically translating it into French"), ch("En le supprimant", "By deleting it"), ch("En majuscules seulement", "In uppercase only") ] },
        tf("Il est recommandé de reformuler les phrases dictées par le professionnel de la santé pour les rendre plus claires.", "It is recommended to rephrase sentences dictated by the healthcare professional to make them clearer.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un terme dicté semble hors contexte par rapport au reste du rapport. Quelle est la bonne pratique?", en: "A dictated term seems out of context compared to the rest of the report. What is the correct practice?",
          choices: [ ch("Rechercher à l'aide de sources fiables, puis demander conseil à un collègue ou au professionnel si le doute persiste", "Research using reliable sources, then ask a colleague or the professional if doubt remains", true), ch("Le remplacer par un terme similaire au hasard", "Replace it with a random similar-sounding term"), ch("Le retirer du rapport sans le signaler", "Remove it from the report without flagging it"), ch("Laisser tel quel même si le sens est douteux", "Leave it as is even if the meaning is doubtful") ] },
        { fr: "Pourquoi le respect du délai de transcription est-il important?", en: "Why is respecting the transcription turnaround time important?",
          choices: [ ch("Les rapports médicaux doivent être disponibles rapidement pour la suite des soins", "Medical reports must be available quickly to support continued care", true), ch("Le délai n'a aucune importance en secrétariat médical", "The turnaround time has no importance in medical secretarial work"), ch("Seul le style compte, jamais le délai", "Only style matters, never the deadline"), ch("Les délais ne s'appliquent qu'aux dossiers papier", "Deadlines only apply to paper files") ] },
        tf("Le respect du cadre légal et de la confidentialité s'applique à la transcription de rapports médicaux.", "Respecting the legal framework and confidentiality applies to transcribing medical reports.", true)
      ])
    ]
  },
  {
    id: "secmed06", code: "449355", hours: 75, order: 6,
    title_fr: "Soutien administratif en lien avec les consultations médicales", title_en: "Administrative Support for Medical Consultations",
    icon: "📋",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle est la priorité lorsqu'un patient se présente à la réception?", en: "What is the priority when a patient arrives at the front desk?",
          choices: [ ch("L'accueillir avec courtoisie et comprendre le motif de sa visite", "Greet them courteously and understand the reason for their visit", true), ch("Terminer une autre tâche avant de le remarquer", "Finish another task before acknowledging them"), ch("Lui demander de revenir un autre jour", "Ask them to come back another day"), ch("L'ignorer s'il n'a pas de rendez-vous", "Ignore them if they have no appointment") ] },
        { fr: "Quel système sert à gérer les dossiers-patients de façon informatisée?", en: "Which system is used to manage patient files electronically?",
          choices: [ ch("Le dossier médical électronique (DME)", "The electronic medical record (EMR)", true), ch("Le grand livre comptable", "The accounting general ledger"), ch("Le registre des salaires", "The payroll register"), ch("Le calendrier scolaire", "The school calendar") ] },
        tf("La gestion des rendez-vous doit respecter les plages horaires spécifiées par les professionnels de la santé.", "Managing appointments must respect the time slots specified by the healthcare professionals.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que doit-on vérifier entre la carte d'assurance maladie et le dossier du patient?", en: "What must be verified between the health insurance card and the patient's file?",
          choices: [ ch("La concordance des renseignements d'identité", "That the identity information matches", true), ch("La couleur de la carte", "The colour of the card"), ch("Le poids du patient", "The patient's weight"), ch("Aucune vérification n'est nécessaire", "No verification is necessary") ] },
        { fr: "Avant d'inclure un formulaire dans un dossier médical, il faut...", en: "Before including a form in a medical file, you must...",
          choices: [ ch("Déterminer que c'est bien le bon document à y inclure", "Determine that it is indeed the correct document to include", true), ch("L'inclure sans le lire", "Include it without reading it"), ch("Le détruire par précaution", "Destroy it as a precaution"), ch("Le remettre directement au patient", "Hand it directly back to the patient") ] },
        tf("Certains services offerts en clinique médicale ne sont pas couverts par le régime d'assurance maladie et doivent être facturés au patient.", "Some services offered at a medical clinic are not covered by the health insurance plan and must be billed to the patient.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un rendez-vous doit être déplacé. Quelle contrainte faut-il respecter en priorité?", en: "An appointment needs to be rescheduled. Which constraint must be respected first?",
          choices: [ ch("Les plages horaires et disponibilités du professionnel de la santé", "The healthcare professional's time slots and availability", true), ch("Uniquement la préférence du patient, peu importe l'horaire du médecin", "Only the patient's preference, regardless of the doctor's schedule"), ch("Aucune contrainte particulière", "No particular constraint"), ch("Le premier rendez-vous disponible dans un an", "The first available appointment in a year") ] },
        { fr: "Une situation d'urgence survient à la réception. Quelle est la bonne pratique?", en: "An emergency situation occurs at the front desk. What is the correct practice?",
          choices: [ ch("Suivre la procédure d'urgence établie et alerter le personnel soignant approprié", "Follow the established emergency procedure and alert the appropriate care staff", true), ch("Attendre que quelqu'un d'autre s'en occupe", "Wait for someone else to handle it"), ch("Gérer seul la situation médicale sans alerter personne", "Handle the medical situation alone without alerting anyone"), ch("Fermer la réception", "Close the front desk") ] },
        tf("La discrétion et la confidentialité ne s'appliquent qu'aux dossiers écrits, jamais aux conversations tenues à la réception.", "Discretion and confidentiality only apply to written files, never to conversations held at the front desk.", false)
      ])
    ]
  },
  {
    id: "secmed07", code: "449363", hours: 45, order: 7,
    title_fr: "Transcription de rapports d'imagerie médicale", title_en: "Transcribing Medical Imaging Reports",
    icon: "🩻",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Lequel de ces éléments est un exemple d'examen d'imagerie médicale?", en: "Which of these is an example of a medical imaging exam?",
          choices: [ ch("Une échographie", "An ultrasound", true), ch("Une prise de sang", "A blood test"), ch("Une vaccination", "A vaccination"), ch("Une consultation téléphonique", "A phone consultation") ] },
        { fr: "Que signifie l'abréviation IRM?", en: "What does the abbreviation MRI stand for?",
          choices: [ ch("Imagerie par résonance magnétique", "Magnetic resonance imaging", true), ch("Intervention rapide en médecine", "Rapid medical intervention"), ch("Institut de recherche médicale", "Medical research institute"), ch("Indice de risque médical", "Medical risk index") ] },
        tf("Un rapport d'imagerie médicale peut inclure une comparaison avec un examen antérieur, s'il y a lieu.", "A medical imaging report can include a comparison with a prior exam, if applicable.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que désigne l'abréviation TDM (ou TACO) en imagerie médicale?", en: "What does the abbreviation CT (or CAT scan) refer to in medical imaging?",
          choices: [ ch("La tomodensitométrie", "Computed tomography", true), ch("La transfusion directe multiple", "Multiple direct transfusion"), ch("Un traitement dermatologique", "A dermatological treatment"), ch("Un test diagnostique manuel", "A manual diagnostic test") ] },
        { fr: "En transcription d'imagerie médicale, quel type de détail exige une attention particulière?", en: "In medical imaging transcription, what type of detail requires special attention?",
          choices: [ ch("Les informations quantitatives (dimensions, nombre d'anomalies, etc.)", "Quantitative information (dimensions, number of anomalies, etc.)", true), ch("La couleur du gabarit du rapport", "The colour of the report template"), ch("Le nom de l'imprimante utilisée", "The name of the printer used"), ch("Rien de particulier", "Nothing in particular") ] },
        tf("La vertèbre notée « L5 » se trouve dans la région cervicale de la colonne vertébrale.", "The vertebra labelled 'L5' is located in the cervical region of the spine.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un rapport d'imagerie médicale doit notamment...", en: "A medical imaging report must, among other things...",
          choices: [ ch("Répondre à la demande formulée par le médecin traitant", "Address the request made by the referring physician", true), ch("Éviter toute mention des résultats obtenus", "Avoid mentioning any results obtained"), ch("Ignorer les examens antérieurs du patient", "Ignore the patient's prior exams"), ch("Se limiter à la date de l'examen uniquement", "Be limited to the exam date only") ] },
        { fr: "Quand un examen révèle des anomalies (examen positif), le rapport doit généralement inclure...", en: "When an exam reveals anomalies (a positive exam), the report should generally include...",
          choices: [ ch("La description et la localisation des anomalies", "The description and location of the anomalies", true), ch("Uniquement le nom du technicien", "Only the technician's name"), ch("Uniquement la durée de l'examen", "Only the exam's duration"), ch("Aucun détail supplémentaire", "No additional detail") ] },
        tf("La rigueur est moins importante en transcription d'imagerie médicale que dans les autres compétences du programme.", "Rigour is less important in medical imaging transcription than in the program's other competencies.", false)
      ])
    ]
  },
  {
    id: "secmed08", code: "449373", hours: 45, order: 8,
    title_fr: "Transcription de comptes rendus opératoires", title_en: "Transcribing Operative Reports",
    icon: "🩹",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel élément un compte rendu opératoire doit-il notamment préciser?", en: "What must an operative report specifically indicate?",
          choices: [ ch("Le diagnostic préopératoire justifiant l'intervention", "The preoperative diagnosis justifying the procedure", true), ch("Le menu du repas du patient avant l'opération", "The patient's meal before the operation"), ch("Le numéro de chambre uniquement", "The room number only"), ch("La météo du jour de l'intervention", "The weather on the day of the procedure") ] },
        { fr: "Quel élément lié au temps doit être précisé dans un compte rendu opératoire?", en: "What time-related element must be specified in an operative report?",
          choices: [ ch("Les heures de début et de fin de l'intervention", "The procedure's start and end times", true), ch("L'heure du dîner de l'équipe chirurgicale", "The surgical team's lunch time"), ch("L'heure d'ouverture de la clinique", "The clinic's opening hour"), ch("Aucune heure n'est requise", "No time is required") ] },
        tf("Un compte rendu opératoire précise le type d'anesthésie utilisée.", "An operative report specifies the type of anesthesia used.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Lequel de ces détails quantitatifs peut apparaître dans un compte rendu opératoire?", en: "Which of these quantitative details can appear in an operative report?",
          choices: [ ch("Les pertes sanguines et le nombre de points de suture", "Blood loss and the number of stitches", true), ch("Le prix de la chirurgie", "The price of the surgery"), ch("Le nombre d'employés de la clinique", "The number of clinic employees"), ch("Le kilométrage parcouru par le patient", "The distance travelled by the patient") ] },
        { fr: "Que confirme le décompte des instruments à la fin d'une chirurgie?", en: "What does the instrument count confirm at the end of a surgery?",
          choices: [ ch("Qu'aucun instrument n'a été oublié dans le corps du patient", "That no instrument was left inside the patient's body", true), ch("Le coût total de l'opération", "The total cost of the operation"), ch("La durée du séjour à l'hôpital", "The length of the hospital stay"), ch("Le nom du fabricant des instruments", "The name of the instrument manufacturer") ] },
        tf("Le décompte des instruments chirurgicaux n'a pas besoin d'être mentionné dans le compte rendu opératoire.", "The surgical instrument count does not need to be mentioned in the operative report.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Pourquoi la précision est-elle particulièrement critique dans la transcription de comptes rendus opératoires?", en: "Why is precision especially critical when transcribing operative reports?",
          choices: [ ch("Parce qu'une erreur peut avoir des conséquences graves dans un contexte chirurgical", "Because an error can have serious consequences in a surgical context", true), ch("Parce que ces rapports ne sont jamais relus par personne", "Because these reports are never reviewed by anyone"), ch("Parce que la précision n'a pas d'effet sur les soins", "Because precision has no effect on patient care"), ch("Parce que ces rapports sont détruits après la chirurgie", "Because these reports are destroyed after surgery") ] },
        { fr: "Quelle attitude professionnelle est essentielle tout au long du travail de transcription médicale?", en: "What professional attitude is essential throughout medical transcription work?",
          choices: [ ch("Un travail méthodique et une attitude rigoureuse", "Methodical work and a rigorous attitude", true), ch("La rapidité avant tout, peu importe l'exactitude", "Speed above all, regardless of accuracy"), ch("L'improvisation constante", "Constant improvisation"), ch("L'indifférence face aux erreurs", "Indifference toward errors") ] },
        tf("Les comptes rendus opératoires peuvent varier selon le système du corps humain visé et le type d'intervention chirurgicale.", "Operative reports can vary depending on the body system involved and the type of surgical procedure.", true)
      ])
    ]
  },
  {
    id: "secmed09", code: "449385", hours: 75, order: 9,
    title_fr: "Intégration au milieu de travail", title_en: "Workplace Integration",
    icon: "🎓",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Sur quoi repose principalement la compétence « Intégration au milieu de travail »?", en: "What is the 'Workplace Integration' competency mainly based on?",
          choices: [ ch("Un stage en milieu de travail", "A workplace internship", true), ch("Un examen théorique uniquement", "A theoretical exam only"), ch("Une recherche sur Internet", "An internet research project"), ch("Un travail d'équipe en classe", "A group project in class") ] },
        { fr: "Quel outil sert à consigner les observations faites durant le stage?", en: "What tool is used to record observations made during the internship?",
          choices: [ ch("Le journal de bord", "The logbook", true), ch("Le grand livre comptable", "The accounting general ledger"), ch("Le calendrier scolaire", "The school calendar"), ch("Le dossier médical du stagiaire", "The intern's own medical file") ] },
        tf("Le stage permet de mettre en pratique les compétences acquises durant la formation.", "The internship allows applying the skills acquired during training.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que devrait comporter le bilan final produit après le stage?", en: "What should the final summary produced after the internship include?",
          choices: [ ch("Une comparaison entre la formation et le milieu de stage, et une autoévaluation", "A comparison between the training and the internship setting, and a self-assessment", true), ch("Uniquement la liste des employés rencontrés", "Only a list of employees met"), ch("Uniquement le nombre d'heures travaillées", "Only the number of hours worked"), ch("Rien de particulier n'est exigé", "Nothing in particular is required") ] },
        { fr: "Quelle attitude est attendue de l'élève durant l'exécution des tâches en stage?", en: "What attitude is expected of the student while carrying out tasks during the internship?",
          choices: [ ch("Une attitude professionnelle dans l'exécution des tâches confiées", "A professional attitude in carrying out assigned tasks", true), ch("Une attitude désinvolte face aux consignes", "A casual attitude toward instructions"), ch("Une indifférence envers l'équipe de travail", "Indifference toward the work team"), ch("Un refus des tâches non précisées à l'avance", "Refusing tasks not specified in advance") ] },
        tf("L'élève doit effectuer des démarches auprès d'organisations pour obtenir une place de stage.", "The student must reach out to organizations to secure an internship placement.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Dans l'exécution de ses tâches en stage, l'élève doit notamment respecter...", en: "While carrying out tasks during the internship, the student must in particular respect...",
          choices: [ ch("Les procédures en vigueur, le cadre légal et les règles de santé et sécurité au travail", "The procedures in place, the legal framework, and workplace health and safety rules", true), ch("Uniquement ses propres préférences de travail", "Only their own work preferences"), ch("Aucune règle particulière durant le stage", "No particular rules during the internship"), ch("Uniquement les horaires des autres stagiaires", "Only the schedules of other interns") ] },
        { fr: "Pourquoi l'objectivité est-elle importante dans l'autoévaluation de fin de stage?", en: "Why is objectivity important in the end-of-internship self-assessment?",
          choices: [ ch("Pour juger avec justesse ses forces et ses points à améliorer", "To accurately judge one's strengths and areas for improvement", true), ch("Parce que l'autoévaluation n'est jamais lue par personne", "Because the self-assessment is never read by anyone"), ch("Parce que l'objectivité n'a aucune utilité professionnelle", "Because objectivity has no professional value"), ch("Parce que seule l'opinion de l'employeur compte", "Because only the employer's opinion matters") ] },
        tf("Le roulement de personnel étant élevé dans ce métier, la secrétaire médicale est souvent appelée à accompagner des personnes nouvellement en poste.", "Since staff turnover is high in this trade, medical secretaries are often called upon to mentor newly hired staff.", true)
      ])
    ]
  }
];

const UI_TEXT = {
  fr: {
    appName: "SecretariatMedicalQuest",
    tagline: "Deviens Secrétaire médicale — ASP 5374",
    start: "Commencer l'aventure",
    yourName: "Ton prénom",
    chooseAvatar: "Choisis ton avatar",
    map: "Mon parcours",
    badges: "Badges",
    trophies: "Trophées",
    leaderboard: "Palmarès",
    profile: "Profil",
    level: "Niveau",
    xp: "XP",
    locked: "Verrouillé",
    completeToUnlock: "Termine la quête précédente pour déverrouiller",
    startQuest: "Démarrer la quête",
    retryQuest: "Reprendre la quête",
    question: "Question",
    of: "sur",
    submit: "Valider",
    next: "Suivant",
    finish: "Terminer",
    correct: "Bonne réponse!",
    incorrect: "Ce n'est pas ça...",
    questResult: "Résultat de la quête",
    score: "Score",
    passed: "Quête réussie! 🎉",
    failed: "Pas encore réussi — réessaie pour débloquer le badge (seuil: 70%)",
    backToMap: "Retour à la carte",
    newBadge: "Nouveau badge!",
    newTrophy: "Nouveau trophée!",
    hours: "heures",
    switchLang: "EN",
    privacy: "Confidentialité",
    resetProgress: "Réinitialiser tout",
    confirmReset: "Tout réinitialiser? Ton avatar, tes badges, trophées et toute ta progression seront effacés. Cette action est irréversible.",
    installApp: "Installer l'application",
    rank: "Rang",
    you: "Toi",
    leaderboardNote: "Classement local (démo) — un vrai palmarès de classe nécessite un serveur partagé.",
    completedQuests: "quêtes complétées",
    chooseVehicle: "Choisis ta machine",
    myVehicle: "Ta machine",
    vehicleGrows: "Évolue avec ton expérience",
    maxSize: "Taille maximale atteinte!",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tfPrompt: "Vrai ou faux?",
    masteredLabel: "compétences maîtrisées",
    tierLabel: "Palier",
    matchPrompt: "Touche un terme, puis sa définition qui correspond.",
    scenarioLabel: "Mise en situation",
    masteryUnlocked: "Compétence maîtrisée — badge débloqué!",
    accessCodeTitle: "Code d'accès",
    accessCodePrompt: "Entre le code d'accès fourni par ton enseignant pour continuer.",
    accessCodeTrialOver: "Ton essai gratuit de 7 jours est terminé. Entre le code d'accès fourni par ton centre de formation pour continuer.",
    accessCodePlaceholder: "Code d'accès",
    accessCodeSubmit: "Valider",
    accessCodeChecking: "Vérification...",
    accessCodeInvalid: "Code invalide ou inactif. Vérifie auprès de ton enseignant.",
    accessCodeOffline: "Connexion Internet requise pour valider ton code la première fois. Réessaie une fois connecté.",
    accessCodeNotConfigured: "L'application n'est pas encore configurée. Contacte ton enseignant.",
    welcomeHeading: "Comment ça marche",
    welcomeIntro: "Avant de commencer, voici un survol rapide de l'application.",
    welcomeSteps: [
      { icon: "🗺️", title: "Mon parcours", text: "Chaque compétence du programme est une quête sur la carte. Termine-les dans l'ordre pour avancer." },
      { icon: "📝", title: "Questions", text: "Réponds à des questions à choix multiples et vrai/faux liées à chaque compétence." },
      { icon: "🎖️", title: "Badges", text: "Réussis une quête à 70% ou plus pour débloquer son badge." },
      { icon: "🏆", title: "Trophées", text: "Décroche des trophées spéciaux pour tes exploits et ta progression." },
      { icon: "📊", title: "Palmarès", text: "Compare ton avancement avec celui du reste de la classe." },
      { icon: "👷", title: "Ton avatar", text: "Choisis ton avatar — il évolue à mesure que tu gagnes de l'expérience." }
    ]
  },
  en: {
    appName: "SecretariatMedicalQuest",
    tagline: "Become a Medical Secretary — VSA 5374",
    start: "Start the adventure",
    yourName: "Your first name",
    chooseAvatar: "Choose your avatar",
    map: "My path",
    badges: "Badges",
    trophies: "Trophies",
    leaderboard: "Leaderboard",
    profile: "Profile",
    level: "Level",
    xp: "XP",
    locked: "Locked",
    completeToUnlock: "Complete the previous quest to unlock",
    startQuest: "Start quest",
    retryQuest: "Retry quest",
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
    correct: "Correct!",
    incorrect: "Not quite...",
    questResult: "Quest Result",
    score: "Score",
    passed: "Quest passed! 🎉",
    failed: "Not passed yet — try again to unlock the badge (threshold: 70%)",
    backToMap: "Back to map",
    newBadge: "New badge!",
    newTrophy: "New trophy!",
    hours: "hours",
    switchLang: "FR",
    privacy: "Privacy",
    resetProgress: "Reset everything",
    confirmReset: "Reset everything? Your avatar, badges, trophies and all progress will be erased. This cannot be undone.",
    installApp: "Install the app",
    rank: "Rank",
    you: "You",
    leaderboardNote: "Local (demo) ranking — a real class leaderboard needs a shared server.",
    completedQuests: "quests completed",
    chooseVehicle: "Choose your machine",
    myVehicle: "Your machine",
    vehicleGrows: "Evolves with your experience",
    maxSize: "Maximum size reached!",
    trueLabel: "True",
    falseLabel: "False",
    tfPrompt: "True or false?",
    masteredLabel: "competencies mastered",
    tierLabel: "Tier",
    matchPrompt: "Tap a term, then its matching definition.",
    scenarioLabel: "Scenario",
    masteryUnlocked: "Competency mastered — badge unlocked!",
    accessCodeTitle: "Access code",
    accessCodePrompt: "Enter the access code given by your teacher to continue.",
    accessCodeTrialOver: "Your free 7-day trial has ended. Enter the access code provided by your training center to continue.",
    accessCodePlaceholder: "Access code",
    accessCodeSubmit: "Submit",
    accessCodeChecking: "Checking...",
    accessCodeInvalid: "Invalid or inactive code. Check with your teacher.",
    accessCodeOffline: "Internet connection required to validate your code the first time. Try again once connected.",
    accessCodeNotConfigured: "The app isn't configured yet. Contact your teacher.",
    welcomeHeading: "How it works",
    welcomeIntro: "Before you start, here's a quick overview of the app.",
    welcomeSteps: [
      { icon: "🗺️", title: "My path", text: "Each program competency is a quest on the map. Complete them in order to move forward." },
      { icon: "📝", title: "Questions", text: "Answer multiple-choice and true/false questions tied to each competency." },
      { icon: "🎖️", title: "Badges", text: "Pass a quest with 70% or more to unlock its badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "👷", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ---- */
const LEVELS = [
  { min: 0,    name_fr: "Novice",       name_en: "Novice",     avatarStage: 0 },
  { min: 200,  name_fr: "Apprenti(e)",  name_en: "Apprentice", avatarStage: 2 },
  { min: 500,  name_fr: "Compétent(e)", name_en: "Competent",  avatarStage: 4 },
  { min: 1000, name_fr: "Chevronné(e)", name_en: "Seasoned",   avatarStage: 6 },
  { min: 2000, name_fr: "Expert(e)",    name_en: "Expert",     avatarStage: 9 },
  { min: 3500, name_fr: "Maître",       name_en: "Master",     avatarStage: 11 }
];

/* ---- Personnages d'avatar (ouvriers de chantier / camionneurs) ----
   Chaque personnage est dessiné en SVG dans app.js (fonction AVATAR_SVG).
   "accent" = couleur par défaut du casque/gilet, modifiable via la
   sélection de couleur. */
const AVATAR_CHARACTERS = [
 {
  "id": "dragon",
  "name_fr": "Dragon",
  "name_en": "Dragon",
  "title_fr": "Le Sage",
  "title_en": "The Sage",
  "stages": [
   "🥚",
   "🥚",
   "🦎",
   "🦎",
   "🐲",
   "🐲",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉"
  ]
 },
 {
  "id": "licorne",
  "name_fr": "Licorne",
  "name_en": "Unicorn",
  "title_fr": "La Guérisseuse",
  "title_en": "The Healer",
  "stages": [
   "🥚",
   "🥚",
   "🐴",
   "🐴",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄"
  ]
 },
 {
  "id": "phenix",
  "name_fr": "Phénix",
  "name_en": "Phoenix",
  "title_fr": "Le Résilient",
  "title_en": "The Resilient One",
  "stages": [
   "🥚",
   "🥚",
   "🐣",
   "🐣",
   "🐦",
   "🐦",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅"
  ]
 },
 {
  "id": "griffon",
  "name_fr": "Griffon",
  "name_en": "Griffin",
  "title_fr": "Le Courageux",
  "title_en": "The Brave One",
  "stages": [
   "🥚",
   "🥚",
   "🐱",
   "🐱",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁"
  ]
 }
];

const AVATAR_COLORS = [
  { id: "jaune",  hex: "#f7b500", name_fr: "Jaune sécurité", name_en: "Safety Yellow" },
  { id: "orange", hex: "#ff7a1a", name_fr: "Orange chantier", name_en: "Site Orange" },
  { id: "vert",   hex: "#3bb54a", name_fr: "Vert forêt", name_en: "Forest Green" },
  { id: "bleu",   hex: "#2a7de1", name_fr: "Bleu acier", name_en: "Steel Blue" },
  { id: "rouge",  hex: "#e13c3c", name_fr: "Rouge feu", name_en: "Fire Red" }
];

/* ---- Machines de l'élève (grossissent avec le XP) ----
   Le dessin SVG de chaque machine est dans app.js (fonction vehicleSVG). */
const VEHICLE_TYPES = [
  { id: "camion", name_fr: "Camion à benne", name_en: "Dump Truck" },
  { id: "pelle", name_fr: "Pelle mécanique", name_en: "Excavator" },
  { id: "bouteur", name_fr: "Bouteur", name_en: "Bulldozer" },
  { id: "chargeuse", name_fr: "Chargeuse", name_en: "Loader" }
];

/* La hauteur affichée (en pixels) interpole entre minHeight et maxHeight
   selon le XP actuel de l'élève (voir vehicleHeight() dans app.js). La
   largeur est calculée automatiquement pour respecter les proportions
   propres à chaque machine (voir VEHICLE_VIEWBOX dans app.js). */
const VEHICLE_GROWTH = { minHeight: 78, maxHeight: 178, maxXP: 3500 };

/* ---- Commandes de cabine (questions basées sur une image) ----
   Chaque machine a 4 commandes numérotées, dessinées par cabinSVG()
   dans app.js aux coordonnées cx/cy (viewBox 0 0 360 220). Ces mêmes
   coordonnées servent à la fois à dessiner l'illustration et à
   positionner les zones cliquables des questions de type "hotspot" —
   l'image et les questions restent donc toujours alignées.
   Configuration générique à titre pédagogique — la disposition réelle
   varie selon le fabricant et le modèle (à valider par l'enseignant). */
const CABIN_CONTROLS = {
  pelle: [
    { num: 1, cx: 100, cy: 168, kind: "joystick",
      label_fr: "Joystick gauche", label_en: "Left joystick",
      desc_fr: "Contrôle la rotation de la tourelle et le godet",
      desc_en: "Controls turret rotation and the bucket" },
    { num: 2, cx: 210, cy: 168, kind: "joystick",
      label_fr: "Joystick droit", label_en: "Right joystick",
      desc_fr: "Contrôle la flèche et le bras (balancier)",
      desc_en: "Controls the boom and the stick (arm)" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédales de translation", label_en: "Travel pedals",
      desc_fr: "Font avancer ou reculer les chenilles",
      desc_en: "Move the tracks forward or backward" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  bouteur: [
    { num: 1, cx: 110, cy: 172, kind: "lever",
      label_fr: "Levier de la lame", label_en: "Blade control lever",
      desc_fr: "Lève, abaisse et incline la lame",
      desc_en: "Raises, lowers and tilts the blade" },
    { num: 2, cx: 210, cy: 172, kind: "lever",
      label_fr: "Manettes de direction (chenilles)", label_en: "Steering clutch levers",
      desc_fr: "Contrôlent la direction en ralentissant une chenille à la fois",
      desc_en: "Control steering by slowing one track at a time" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale de frein", label_en: "Brake pedal",
      desc_fr: "Ralentit ou immobilise la machine",
      desc_en: "Slows or stops the machine" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  chargeuse: [
    { num: 1, cx: 210, cy: 168, kind: "lever",
      label_fr: "Levier de commande du godet", label_en: "Bucket control lever",
      desc_fr: "Lève, abaisse et bascule le godet",
      desc_en: "Raises, lowers and tilts the bucket" },
    { num: 2, cx: 110, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues",
      desc_en: "Controls the direction of the wheels" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale d'accélérateur", label_en: "Accelerator pedal",
      desc_fr: "Contrôle le régime moteur et la vitesse",
      desc_en: "Controls engine speed and travel speed" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  niveleuse: [
    { num: 1, cx: 190, cy: 172, kind: "lever",
      label_fr: "Leviers de la lame", label_en: "Blade control levers",
      desc_fr: "Ajustent l'angle, la hauteur et l'inclinaison de la lame",
      desc_en: "Adjust the blade's angle, height and tilt" },
    { num: 2, cx: 100, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues avant",
      desc_en: "Controls the direction of the front wheels" },
    { num: 3, cx: 255, cy: 172, kind: "switch",
      label_fr: "Commande d'articulation du châssis", label_en: "Frame articulation control",
      desc_fr: "Articule le châssis pour resserrer le rayon de braquage",
      desc_en: "Articulates the frame to tighten the turning radius" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ]
};

/* ---- Trophées (méta-réussites) ---- */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir ton premier palier de compétence", desc_en: "Pass your first competency tier",
    check: (state) => Object.keys(state.completed).length >= 1 },
  { id: "t_half", name_fr: "Mi-parcours", name_en: "Halfway There", icon: "🥈",
    desc_fr: "Maîtriser 10 compétences (palier Avancé)", desc_en: "Master 10 competencies (Advanced tier)",
    check: (state) => (state.badges || []).length >= 10 },
  { id: "t_all", name_fr: "Diplômé virtuel", name_en: "Virtual Graduate", icon: "🏆",
    desc_fr: "Maîtriser les 20 compétences du programme", desc_en: "Master all 20 competencies of the program",
    check: (state) => (state.badges || []).length >= 20 },
  { id: "t_perfect", name_fr: "Sans faute", name_en: "Flawless", icon: "💯",
    desc_fr: "Obtenir 100% à un palier", desc_en: "Score 100% on a tier",
    check: (state) => Object.values(state.completed).some(s => s.score === 100) },
  { id: "t_safety", name_fr: "Zone sécurité", name_en: "Safety Zone", icon: "🦺",
    desc_fr: "Réussir le palier Débutant du module Santé et sécurité", desc_en: "Pass the Beginner tier of the Health & Safety module",
    check: (state) => state.completed["c02_1"] && state.completed["c02_1"].score >= 70 },
  { id: "t_streak", name_fr: "Assidu", name_en: "Dedicated", icon: "🔥",
    desc_fr: "Se connecter 3 jours différents", desc_en: "Log in on 3 different days",
    check: (state) => (state.loginDays || []).length >= 3 },
  { id: "t_podium", name_fr: "Sur le podium", name_en: "On the Podium", icon: "🏅",
    desc_fr: "Atteindre le top 3 du palmarès", desc_en: "Reach the top 3 of the leaderboard",
    check: (state) => (LEADERBOARD_SEED.filter(p => p.xp > state.xp).length) < 3 },
  { id: "t_matcher", name_fr: "Bon association", name_en: "Great Match", icon: "🧩",
    desc_fr: "Réussir 15 questions d'association de termes", desc_en: "Complete 15 term-matching questions",
    check: (state) => (state.matchesCompleted || 0) >= 15 }
];

/* ---- Palmarès (données d'exemple — classe fictive) ----
   À remplacer par de vraies données élèves lorsqu'un backend
   partagé sera branché (voir README). */
const LEADERBOARD_SEED = [
  { name: "Mia-Rose T.", xp: 3120, avatarChar: "operatrice_bouteur", avatarColor: "vert" },
  { name: "Xavier L.", xp: 2450, avatarChar: "contremaitre", avatarColor: "bleu" },
  { name: "Sam D.", xp: 1780, avatarChar: "camionneur", avatarColor: "orange" },
  { name: "Alicia P.", xp: 1290, avatarChar: "camionneuse", avatarColor: "rouge" },
  { name: "Kevin R.", xp: 860, avatarChar: "contremaitre", avatarColor: "jaune" },
  { name: "Noémie B.", xp: 430, avatarChar: "mecanicienne", avatarColor: "bleu" },
  { name: "Tommy G.", xp: 120, avatarChar: "camionneur", avatarColor: "vert" }
];
