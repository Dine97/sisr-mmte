# SISR-MMTE

Système d'Inscription et de Suivi des Requêtes MMTE — Bénin Control SA.

Application web interne qui remplace le « Tableau des requêtes » hebdomadaire : saisie, suivi des requêtes en cours,
tableau de bord, exports Excel et PDF, rapport de direction. L'accès est réservé aux comptes créés par l'administrateur.
**Aucune donnée n'est stockée dans ce dépôt** (elles sont dans la base Supabase).

## Contenu

- `index.html` : l'application
- `om.html` : l'outil **Ordres de mission**, ouvert dans SISR par le bouton « Ordre de mission » (même compte, même base)
- `config.js` : adresse du projet Supabase et clé publique (publiques par conception ; seuls les mots de passe donnent accès aux données)
- `sw.js`, `manifest.json`, `icon-*.png` : installation sur téléphone et ordinateur (PWA)
- `vendor/` : bibliothèques tierces embarquées (Supabase JS 2.117.1 — MIT, SheetJS 0.18.5 — Apache-2.0, jsPDF 2.5.1 — MIT, jsPDF-AutoTable 3.5.31 — MIT)
- `vendor/fonts/` : polices Newsreader (titres et chiffres), Hanken Grotesk (texte) et JetBrains Mono (références et comptes à rebours), licence SIL OFL 1.1, hébergées ici : aucune requête vers un service de polices externe
- `.github/workflows/keepalive.yml` : appel léger, deux fois par semaine, pour que la base gratuite ne soit pas mise en pause

## Fonctions

- **Saisie** : n° de référence automatique (REQ-AAAA-NNNN), **priorité facultative P1 / P2 / P3** (délai de résolution 2 h / 24 h / 72 h calculé automatiquement), catégorie proposée, échéance et motif d'attente, alerte de doublon, duplication d'une requête, pièces jointes (photos réduites, PDF).
- **En cours** : couleur par priorité (P1 rouge, P2 orange, P3 bleu), compte à rebours du délai, **ligne rouge + cloche + message + titre de l'onglet (+ bip facultatif) quand un délai est dépassé**, filtres par priorité, tri par délai, échéances, filtre « Mes requêtes », notifications dans l'application.
- **Tableau de bord** : filtre par priorité, respect des délais (global et par priorité), requêtes en retard, indicateurs avec comparaison à la semaine précédente, délai médian, évolution sur 12 semaines, répartitions et délais par module / agent / catégorie, exports Excel et PDF, **rapport de direction** en un clic.
- **Administration** (rôle administrateur) : comptes, listes (usagers, agents, modules, canaux, requêtes types, catégories, motifs), corbeille, journal des modifications, sauvegarde complète en Excel (rappel mensuel), import de l'historique Excel (colonne PRIORITÉ facultative).
- **Accueil** : après la connexion, choix entre SISR-MMTE et Ordres de mission (bouton « Accueil » pour y revenir).
- **Ordres de mission** (bouton dans l'en-tête) : saisie avec propositions mémorisées, numéro unique NNN/AAAA attribué par la base, PDF au modèle Bénin Control, ordre vierge, registre partagé paginé et filtrable, tableau de bord, corbeille (suppression définitive réservée aux administrateurs), journal automatique, sauvegarde et restauration. Tables `om_ordres`, `om_journal`, `om_suggestions`, `om_compteurs`.
- **Sécurité** : rôles administrateur / agent appliqués par la base, journal de toute modification, double authentification facultative (application d'authentification).

## Présentation

Habillage « Marine et laiton » : bleu marine, laiton et ivoire, typographie à empattements pour les titres. Trois dispositions, sans aucune différence de fonctionnement :
- **ordinateur (à partir de 1100 px)** : menu latéral fixe, lignes de requêtes sur une seule rangée, formulaire en deux colonnes ;
- **tablette (700 à 1099 px)** : menu réduit à une barre d'icônes sur le côté ;
- **téléphone (moins de 700 px)** : barre de navigation en bas de l'écran, requêtes en cartes, boutons et champs agrandis pour le pouce.

L'écran d'accueil (choix de l'outil) et les boutons « Accueil » et « Ordre de mission » suivent la même présentation ; l'outil Ordres de mission (`om.html`) reprend le même habillage (onglets en haut sur ordinateur et tablette, barre de navigation en bas sur téléphone). Le document généré (PDF) et l'aperçu A4 du document restent strictement identiques : ils ne suivent pas l'habillage.

## Mise à jour de l'application

Remplacer les fichiers concernés dans ce dépôt (Add file > Upload files) : GitHub Pages republie en 1 à 3 minutes.
**Si la base de données change** (fichier SQL fourni à part, par exemple `mise-a-jour-v3.sql` pour les priorités), exécuter d'abord le SQL, puis déposer les fichiers.
