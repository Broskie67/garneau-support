# Garneau-support

Garneau Support est une application web de gestion d’incidents. Elle permet aux clients de créer des tickets de soutien, aux techniciens de les consulter et de les traiter, ainsi qu’aux administrateurs de gérer les utilisateurs et le suivi des incidents.

## Technologies utilisées

### Frontend
- Vue.js 3
- Pinia
- Vue Router
- SCSS
- Bootstrap

### Backend
- Node.js
- Express.js
- Sequelize 
- MySQL
- Jwt
- Bcrypt
- Multer

## Prérequis

avant d'installer le projet, assurez-vous d'avoir installer les éléments suivants :

- Node.js
- WampServer
- npm
- MySQL
- Git
- Éditeur de code

## Installation du projet

### 1. Cloner le dépot

Cloner le projet à partir du dépot GitLab

```bash
git clone https://gitlab.com/Broskie67/garneau-support.git
```

### 2. Lancer les service de WampServer

Il vous faudra lancer les services wampServer pour permettre la connection a la base de données

### 3. Se positionner dans le dossier backend

Positionnez-vous dans le dossier garneau-support-api

```bash
cd garneau-support-api
```

### 4. Installer les dépendences

Installer les dépendences requise au projet

```bash
npm install
```

### 5. Lancer le sript de seed pour populer la base de données

Le projet contient un script permettant d'initialiser la base de données avec des données de départ

Ce script effectue les action suivantes :
- vérifie la connexion à la base de données;
- recrée les tables de la base de données;
- insère les utilisateurs de départ;
- insère les tickets de départ;
- insère les commentaires de départ.

Pour executer le script de seed :

```bash
npm run seed
```
> Attention : ce script utilise `sequelize.sync({ force: true })`. Cela supprime et recrée les tables de la base de données. Les données existantes seront donc effacées.

### 6. Démarer le backend

Apres avoir installé les dépendances et lancer le script de seed, demarrez le serveur backend

```bash
npm run dev
```

L’application devrait être accessible à l’adresse  `http://localhost:3000`


### 7. Se positionner dans le dossier frontend

À partir du dossier `garneau-support-api`, retournez dans le dossier principal du projet, puis accédez au dossier frontend :

```bash
cd ../garneau-support-web
```

### 8. Installer les dépendances du frontend

Installez les dépendances nécessaires au frontend :

```bash
npm install
```

### 9. Démarrer le frontend

Démarrez l’application frontend :

```bash
npm run dev
```

L’application devrait être accessible à l’adresse `http://localhost:5173`


## Configurations

Le fichier `.env` est déjà inclus dans le projet selon les consignes de la remise du travail
Il contient les informations nécéssaires pour connecter l'application à la base de données MySQL,
comme le nom de la base de données, l'utilisateur, le port du serveur et la clé utilisé pour les token JWT
