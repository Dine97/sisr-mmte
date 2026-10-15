# SISR-MMTE

Système d'Inscription et de Suivi des Requêtes MMTE — Bénin Control SA.

Application web interne qui remplace le « Tableau des requêtes » hebdomadaire : saisie, suivi des requêtes en cours,
tableau de bord, exports Excel et PDF, rapport de direction. L'accès est réservé aux comptes créés par l'administrateur.
**Aucune donnée n'est stockée dans ce dépôt** (elles sont dans la base Supabase).

## Contenu

- `index.html` : l'application
- `config.js` : adresse du projet Supabase et clé publique (publiques par conception ; seuls les mots de passe donnent accès aux données)
- `sw.js`, `manifest.json`, `icon-*.png` : installation sur téléphone et ordinateur (PWA)
- `vendor/` : bibliothèques tierces embarquées (Supabase JS 2.117.1 — MIT, SheetJS 0.18.5 — Apache-2.0, jsPDF 2.5.1 — MIT, jsPDF-AutoTable 3.5.31 — MIT)
- `.github/workflows/keepalive.yml` : appel léger, deux fois par semaine, pour que la base gratuite ne soit pas mise en pause

## Fonctions

- **Saisie** : n° de référence automatique (REQ-AAAA-NNNN), **priorité facultative P1 / P2 / P3** (délai de résolution 2 h / 24 h / 72 h calculé automatiquement), catégorie proposée, échéance et motif d'attente, alerte de doublon, duplication d'une requête, pièces jointes (photos réduites, PDF).
- **En cours** : couleur par priorité (P1 rouge, P2 orange, P3 bleu), compte à rebours du délai, **ligne rouge + cloche + message + titre de l'onglet (+ bip facultatif) quand un délai est dépassé**, filtres par priorité, tri par délai, échéances, filtre « Mes requêtes », notifications dans l'application.
- **Tableau de bord** : filtre par priorité, respect des délais (global et par priorité), requêtes en retard, indicateurs avec comparaison à la semaine précédente, délai médian, évolution sur 12 semaines, répartitions et délais par module / agent / catégorie, exports Excel et PDF, **rapport de direction** en un clic.
- **Administration** (rôle administrateur) : comptes, listes (usagers, agents, modules, canaux, requêtes types, catégories, motifs), corbeille, journal des modifications, sauvegarde complète en Excel (rappel mensuel), import de l'historique Excel (colonne PRIORITÉ facultative).
- **Sécurité** : rôles administrateur / agent appliqués par la base, journal de toute modification, double authentification facultative (application d'authentification).

## Mise à jour de l'application

Remplacer les fichiers concernés dans ce dépôt (Add file > Upload files) : GitHub Pages republie en 1 à 3 minutes.
**Si la base de données change** (fichier SQL fourni à part, par exemple `mise-a-jour-v3.sql` pour les priorités), exécuter d'abord le SQL, puis déposer les fichiers.
