# 🌶️ Piiquante

Application web développée avec Angular, Node.js, Express et MongoDB permettant aux utilisateurs de créer un compte, s'authentifier et partager des sauces avec upload d'images.

## 🚀 Fonctionnalités

- Authentification sécurisée (JWT)
- Création et connexion des utilisateurs
- Hashage des mots de passe avec bcrypt
- CRUD complet des sauces
- Upload et gestion d'images
- API REST Express.js
- Base de données MongoDB Atlas
- Stockage persistant des données

## 🛠️ Technologies

### Frontend

- Angular
- HTML5
- CSS3
- TypeScript

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Multer

## 📂 Structure du projet

```
Piquantee-main/
├── back/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── front/
    ├── assets/
    ├── index.html
    └── ...
```

## 💻 Installation

### Backend

```bash
cd back
npm install
npm start
```

### Frontend

```bash
cd front
npm install
npm start
```

## 🔐 Variables d'environnement

Créer un fichier `.env` dans le dossier `back` :

```env
MONGO_URI=your_mongodb_connection_string
```

## 📸 Aperçu

Le projet permet aux utilisateurs de créer un compte, se connecter, publier des sauces avec image, modifier ou supprimer leurs propres publications et consulter celles des autres utilisateurs.

## 👨‍💻 Auteur

Luigi Behal
