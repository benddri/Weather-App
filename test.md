# Test Log — Weather App US-04

**Objectif :** Vérifier la gestion des erreurs et le bouton Réessayer.

|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
| N°|               Test                   |              Résultat attendu               |          Résultat obtenu        | Statut |
|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
| 1 | Recherche d'une ville inconnue       | Afficher « Ville introuvable ! »            | Message affiché correctement    | Réussi |
|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
| 2 |Désactivation du réseau (Offline)     | Afficher un message de connexion            | Message affiché correctement    | Réussi |
|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
| 3 | Simulation d'une erreur API 500      | Afficher un message de service indisponible | Message affiché correctement    | Réussi |
|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
| 4 | Clic sur Réessayer après reconnexion | Relancer la recherche de la dernière ville  | La météo s'affiche correctement | Réussi |
|---|--------------------------------------|---------------------------------------------|---------------------------------|--------|
 
 Conclusion : La gestion des erreurs fonctionne correctement. Les messages adaptés s'affichent selon le type d'erreur, et le bouton « Réessayer » permet de relancer la recherche de la dernière ville après le rétablissement de la connexion.