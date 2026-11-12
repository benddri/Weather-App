# 🌤️ Weather App

Weather App est une application web qui permet de consulter la météo actuelle et les prévisions météorologiques d'une ville à partir de son nom.

Le projet utilise l'API **Open-Meteo** pour récupérer et afficher les données météorologiques.

## ✅ Fonctionnalités

- Rechercher une ville par son nom.
- Afficher la température actuelle.
- Afficher le taux d'humidité.
- Afficher la vitesse du vent.
- Afficher les prévisions météorologiques sur 14 jours.
- Afficher une description et une icône selon les conditions météorologiques.
- Gérer les erreurs :
  - Ville introuvable.
  - Problème de connexion.
  - Erreur API.
- Réessayer la recherche après une erreur.

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (Vanilla JS)
- Fetch API
- Async / Await
- Open-Meteo API

## 🌐 API utilisées

Le projet utilise deux API Open-Meteo :

- **Geocoding API :** rechercher les coordonnées géographiques d'une ville à partir de son nom.
- **Forecast API :** récupérer les données météorologiques actuelles et les prévisions sur 14 jours.

**Documentation officielle :** https://open-meteo.com/

## 🚀 Installation et lancement

1. Cloner le projet :

```bash
git clone https://github.com/benddri/Weather-App.git
```

2. Ouvrir le dossier du projet :

```bash
cd Weather-App
```

3. Ouvrir le projet dans Visual Studio Code.

4. Lancer le fichier `index.html` avec l'extension **Live Server**.

## 📚 Objectif pédagogique

Ce projet a pour objectif de pratiquer et d'améliorer les compétences en JavaScript, notamment :

- La manipulation du DOM.
- Les appels API avec Fetch.
- La programmation asynchrone avec Async / Await.
- La gestion des erreurs avec Try