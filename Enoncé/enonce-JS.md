# Exercice : Refactorisation en microservices du système d'urgence

## Contexte

Le système de gestion d'urgence actuel est construit comme une application monolithique. Votre mission est de le transformer en une architecture microservices, permettant ainsi une meilleure séparation des responsabilités, une maintenance plus aisée et une scalabilité améliorée.

## Exemple vu en cours:

https://github.com/bocarformation/cda31-dev2-microservices

## Objectifs

1. Décomposer l'application monolithique en trois microservices distincts
2. Implémenter la communication entre ces services
3. Assurer que toutes les fonctionnalités existantes sont maintenues
4. Mettre en place une structure de code organisée avec repositories et DTOs

## Architecture cible

```
┌─────────────────────────┐      ┌────────────────────┐
│                         │      │                    │
│ caller-operator-service │      │    team-service    │
│     (Port: 3001)        │      │    (Port: 3002)    │
│                         │      │                    │
└────────────┬────────────┘      └─────────┬──────────┘
             │                             │
             │                             │
             ▼                             ▼
       ┌─────────────────────────────────────────┐
       │             incident-service            │
       │               (Port: 3003)              │
       └─────────────────────────────────────────┘
```

## Structure des dossiers à implémenter

```
urgency-system-microservices/
│
├── caller-operator-service/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── callerController.js
│   │   └── operatorController.js
│   ├── models/
│   │   ├── Caller.js
│   │   └── Operator.js
│   ├── repositories/
│   │   ├── callerRepository.js
│   │   └── operatorRepository.js
│   ├── dtos/
│   │   ├── callerDto.js
│   │   └── operatorDto.js
│   ├── routes/
│   │   ├── callerRoutes.js
│   │   └── operatorRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── team-service/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── teamController.js
│   ├── models/
│   │   └── Team.js
│   ├── repositories/
│   │   └── teamRepository.js
│   ├── dtos/
│   │   └── teamDto.js
│   ├── routes/
│   │   └── teamRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── incident-service/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── incidentController.js
    ├── models/
    │   └── Incident.js
    ├── repositories/
    │   └── incidentRepository.js
    ├── dtos/
    │   ├── incidentDto.js
    │   ├── createIncidentDto.js
    │   └── updateIncidentStatusDto.js
    ├── routes/
    │   └── incidentRoutes.js
    ├── services/
    │   ├── callerService.js
    │   └── teamService.js
    ├── .env
    ├── package.json
    └── server.js
```

## Exigences techniques

### 1. Services à créer

#### caller-operator-service (Port 3001)
- Gestion des appelants et des opérateurs
- Endpoints :
  - `POST /api/callers` - Créer un appelant
  - `GET /api/callers` - Lister tous les appelants
  - `GET /api/callers/:id` - Récupérer un appelant par ID
  - `POST /api/operators` - Créer un opérateur
  - `GET /api/operators` - Lister tous les opérateurs
  - `GET /api/operators/:id` - Récupérer un opérateur par ID

#### team-service (Port 3002)
- Gestion des équipes d'intervention
- Endpoints :
  - `POST /api/teams` - Créer une équipe
  - `GET /api/teams` - Lister toutes les équipes
  - `GET /api/teams/available` - Récupérer une équipe disponible
  - `PATCH /api/teams/:id` - Mettre à jour la disponibilité d'une équipe

#### incident-service (Port 3003)
- Gestion des incidents
- Endpoints :
  - `POST /api/incidents` - Créer un incident
  - `GET /api/incidents` - Lister tous les incidents
  - `PATCH /api/incidents/:id/status` - Mettre à jour le statut d'un incident

### 2. Communication entre services

Implémenter la communication HTTP entre services en utilisant Axios :

- `incident-service` doit communiquer avec :
  - `caller-operator-service` pour vérifier l'existence des appelants et opérateurs
  - `team-service` pour obtenir une équipe disponible et mettre à jour sa disponibilité

### 3. Repositories et DTOs

- Utiliser le pattern Repository pour isoler l'accès aux données
- Implémenter des DTOs (Data Transfer Objects) pour valider et structurer les données entrantes/sortantes
- Assurer la séparation des responsabilités entre contrôleurs, services et repositories

### 4. Configuration

- Chaque service doit avoir son propre fichier `.env` avec :
  - Port du service
  - URL de la base de données MongoDB
  - URLs des autres services

## Étapes suggérées

1. Analyser le code monolithique existant pour comprendre les responsabilités
2. Structurer les dossiers pour chaque microservice
3. Implémenter les modèles, repositories et DTOs
4. Créer les contrôleurs et routes pour chaque service
5. Implémenter la communication entre services
6. Tester chaque service individuellement
7. Tester l'ensemble du système

## Exemple de flux de création d'incident

1. Un appelant signale un incident
2. L'`incident-service` vérifie l'existence de l'appelant via le `caller-operator-service`
3. L'`incident-service` demande une équipe disponible au `team-service`
4. Le `team-service` marque une équipe comme indisponible et la retourne
5. L'`incident-service` crée l'incident avec l'ID de l'équipe, de l'appelant et de l'opérateur
6. Plus tard, lors de la résolution de l'incident, l'`incident-service` informe le `team-service` pour libérer l'équipe

## Exemple de service HTTP client

Voici un exemple de comment le `incident-service` pourrait communiquer avec le `team-service` :

```javascript
// incident-service/services/teamService.js
import axios from 'axios';

const TEAM_SERVICE_URL = process.env.TEAM_SERVICE_URL || 'http://localhost:3002';

// Obtenir une équipe disponible
export const getAvailableTeam = async () => {
  try {
    const response = await axios.get(`${TEAM_SERVICE_URL}/api/teams/available`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération d\'une équipe disponible', error);
    throw new Error('Aucune équipe disponible');
  }
};

// Libérer une équipe après résolution d'un incident
export const releaseTeam = async (teamId) => {
  try {
    const response = await axios.patch(`${TEAM_SERVICE_URL}/api/teams/${teamId}`, {
      availability: true
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la libération de l'équipe ${teamId}`, error);
    throw error;
  }
};
```

---

# BONUS : Dockerisation des Microservices

Cette partie bonus vous guide dans la mise en place de Docker pour conteneuriser chaque microservice et les faire fonctionner ensemble.

## Prérequis

- Docker installé sur votre machine
- Docker Compose installé sur votre machine

## Structure des fichiers Docker

Ajoutez les fichiers suivants à votre projet :

```
urgency-system-microservices/
│
├── docker-compose.yml
├── caller-operator-service/
│   ├── Dockerfile
│   └── ... (autres fichiers)
│
├── team-service/
│   ├── Dockerfile
│   └── ... (autres fichiers)
│
└── incident-service/
    ├── Dockerfile
    └── ... (autres fichiers)
```

## Exemple de Dockerfile

Créez un Dockerfile identique dans chaque service :

```dockerfile
# Dockerfile pour chaque service
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## Exemple de docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - urgency-network

  caller-operator-service:
    build: ./caller-operator-service
    container_name: caller-operator-service
    restart: always
    ports:
      - "3001:3000"
    environment:
      - PORT=3000
      - MONGODB_URI=mongodb://mongodb:27017/urgency-system
      - TEAM_SERVICE_URL=http://team-service:3000
      - INCIDENT_SERVICE_URL=http://incident-service:3000
    depends_on:
      - mongodb
    networks:
      - urgency-network

  team-service:
    build: ./team-service
    container_name: team-service
    restart: always
    ports:
      - "3002:3000"
    environment:
      - PORT=3000
      - MONGODB_URI=mongodb://mongodb:27017/urgency-system
      - CALLER_OPERATOR_SERVICE_URL=http://caller-operator-service:3000
      - INCIDENT_SERVICE_URL=http://incident-service:3000
    depends_on:
      - mongodb
    networks:
      - urgency-network

  incident-service:
    build: ./incident-service
    container_name: incident-service
    restart: always
    ports:
      - "3003:3000"
    environment:
      - PORT=3000
      - MONGODB_URI=mongodb://mongodb:27017/urgency-system
      - CALLER_OPERATOR_SERVICE_URL=http://caller-operator-service:3000
      - TEAM_SERVICE_URL=http://team-service:3000
    depends_on:
      - mongodb
      - caller-operator-service
      - team-service
    networks:
      - urgency-network

networks:
  urgency-network:
    driver: bridge

volumes:
  mongodb_data:
```

## Adaptation des services pour Docker

Modifiez les configurations des services pour qu'ils utilisent les variables d'environnement définies dans docker-compose.yml :

1. Dans chaque fichier `config/db.js`, utilisez :
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

2. Dans chaque fichier `server.js`, utilisez :
```javascript
import express from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
// ...

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
```

## Exécution avec Docker Compose

Pour lancer l'ensemble de l'application :

```bash
# Construire les images
docker-compose build

# Démarrer les conteneurs
docker-compose up

# Pour exécuter en arrière-plan
docker-compose up -d

# Pour arrêter les conteneurs
docker-compose down
```

## Développer avec Docker

Pour le développement, nous pouvons monter les dossiers locaux dans les conteneurs afin que les modifications soient prises en compte sans reconstruire les images :

```yaml
# Ajoutez dans chaque service du docker-compose.yml
volumes:
  - ./caller-operator-service:/app
  - /app/node_modules
```

## Tests avec Docker

Pour tester les services, utilisez Postman :

1. **Créer un appelant :**
   - Méthode : POST
   - URL : http://localhost:3001/api/callers
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "name": "Bocar Sam",
       "phone": "0123456789"
     }
     ```

2. **Créer un opérateur :**
   - Méthode : POST
   - URL : http://localhost:3001/api/operators
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "name": "Opérateur 1"
     }
     ```

3. **Créer une équipe :**
   - Méthode : POST
   - URL : http://localhost:3002/api/teams
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "type": "Urgence Médicale"
     }
     ```

4. **Créer un incident :**
   - Méthode : POST
   - URL : http://localhost:3003/api/incidents
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "description": "Accident de la route",
       "localisation": "123 Avenue des Champs-Élysées",
       "callerId": "ID_DE_L_APPELANT",
       "operatorId": "ID_DE_L_OPERATEUR"
     }
     ```

Vous pouvez également utiliser les commandes Docker suivantes pour surveiller vos services :

```bash
# Vérifier les services lancés
docker-compose ps

# Voir les logs d'un service spécifique
docker-compose logs incident-service
```
