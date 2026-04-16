# Image de base demandée par le prof
FROM node:18-alpine

# Métadonnées
LABEL maintainer="Mohamed Khallaoui"

# Dossier de travail
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source de Mohamed
COPY . .

# Port exposé
EXPOSE 3000

# Commande de lancement
CMD ["npm", "start"]