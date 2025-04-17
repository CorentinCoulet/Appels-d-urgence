# Exercice : Refactorisation en Microservices du Système d'Urgence (PHP/Symfony)

## Contexte

Le système de gestion d'urgence actuel est construit comme une application monolithique. Votre mission est de le transformer en une architecture microservices avec Symfony, permettant ainsi une meilleure séparation des responsabilités, une maintenance plus aisée et une scalabilité améliorée.

## Objectifs

1. Décomposer l'application monolithique en trois microservices distincts avec Symfony
2. Implémenter la communication entre ces services
3. Assurer que toutes les fonctionnalités existantes sont maintenues
4. Mettre en place une structure de code organisée avec repositories et DTOs

## Architecture cible

```
┌─────────────────────────┐      ┌────────────────────┐
│                         │      │                    │
│ caller-operator-service │      │    team-service    │
│     (Port: 8001)        │      │    (Port: 8002)    │
│                         │      │                    │
└────────────┬────────────┘      └─────────┬──────────┘
             │                              │
             │                              │
             ▼                              ▼
       ┌─────────────────────────────────────────┐
       │             incident-service            │
       │               (Port: 8003)              │
       └─────────────────────────────────────────┘
```

## Structure des dossiers à implémenter

```
urgency-system-microservices/
│
├── caller-operator-service/
│   ├── .env
│   ├── composer.json
│   ├── symfony.lock
│   ├── config/
│   │   ├── routes.yaml
│   │   ├── services.yaml
│   │   └── packages/
│   │       ├── doctrine.yaml
│   │       └── framework.yaml
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── CallerController.php
│   │   │   └── OperatorController.php
│   │   ├── Repository/
│   │   │   ├── CallerRepository.php
│   │   │   └── OperatorRepository.php
│   │   ├── Entity/
│   │   │   ├── Caller.php
│   │   │   └── Operator.php
│   │   ├── DTO/
│   │   │   ├── CallerDTO.php
│   │   │   └── OperatorDTO.php
│   │   └── Kernel.php
│   └── public/
│       └── index.php
│
├── team-service/
│   ├── .env
│   ├── composer.json
│   ├── symfony.lock
│   ├── config/
│   │   ├── routes.yaml
│   │   ├── services.yaml
│   │   └── packages/
│   │       ├── doctrine.yaml
│   │       └── framework.yaml
│   ├── src/
│   │   ├── Controller/
│   │   │   └── TeamController.php
│   │   ├── Repository/
│   │   │   └── TeamRepository.php
│   │   ├── Entity/
│   │   │   └── Team.php
│   │   ├── DTO/
│   │   │   └── TeamDTO.php
│   │   └── Kernel.php
│   └── public/
│       └── index.php
│
└── incident-service/
    ├── .env
    ├── composer.json
    ├── symfony.lock
    ├── config/
    │   ├── routes.yaml
    │   ├── services.yaml
    │   └── packages/
    │       ├── doctrine.yaml
    │       └── framework.yaml
    ├── src/
    │   ├── Controller/
    │   │   └── IncidentController.php
    │   ├── Repository/
    │   │   └── IncidentRepository.php
    │   ├── Entity/
    │   │   └── Incident.php
    │   ├── DTO/
    │   │   ├── IncidentDTO.php
    │   │   ├── CreateIncidentDTO.php
    │   │   └── UpdateIncidentStatusDTO.php
    │   ├── Service/
    │   │   ├── CallerService.php
    │   │   └── TeamService.php
    │   └── Kernel.php
    └── public/
        └── index.php
```

## Exigences techniques

### 1. Services à créer

#### caller-operator-service (Port 8001)
- Gestion des appelants et des opérateurs
- Endpoints :
  - `POST /api/callers` - Créer un appelant
  - `GET /api/callers` - Lister tous les appelants
  - `GET /api/callers/{id}` - Récupérer un appelant par ID
  - `POST /api/operators` - Créer un opérateur
  - `GET /api/operators` - Lister tous les opérateurs
  - `GET /api/operators/{id}` - Récupérer un opérateur par ID

#### team-service (Port 8002)
- Gestion des équipes d'intervention
- Endpoints :
  - `POST /api/teams` - Créer une équipe
  - `GET /api/teams` - Lister toutes les équipes
  - `GET /api/teams/available` - Récupérer une équipe disponible
  - `PATCH /api/teams/{id}` - Mettre à jour la disponibilité d'une équipe

#### incident-service (Port 8003)
- Gestion des incidents
- Endpoints :
  - `POST /api/incidents` - Créer un incident
  - `GET /api/incidents` - Lister tous les incidents
  - `PATCH /api/incidents/{id}/status` - Mettre à jour le statut d'un incident

### 2. Communication entre services

Implémenter la communication HTTP entre services en utilisant Symfony HttpClient :

- `incident-service` doit communiquer avec :
  - `caller-operator-service` pour vérifier l'existence des appelants et opérateurs
  - `team-service` pour obtenir une équipe disponible et mettre à jour sa disponibilité

### 3. Repositories et DTOs

- Utiliser le pattern Repository de Doctrine pour isoler l'accès aux données
- Implémenter des DTOs (Data Transfer Objects) pour valider et structurer les données entrantes/sortantes
- Assurer la séparation des responsabilités entre contrôleurs, services et repositories

### 4. Configuration

- Chaque service doit avoir son propre fichier `.env` avec :
  - Port du service
  - URL de la base de données
  - URLs des autres services

## Étapes suggérées

1. Analyser le code monolithique existant pour comprendre les responsabilités
2. Créer les trois projets Symfony distincts avec `symfony new --full service-name`
3. Implémenter les entités, repositories et DTOs
4. Créer les contrôleurs et configurer les routes
5. Implémenter la communication entre services avec HttpClient
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

```php
<?php
// src/Service/TeamService.php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class TeamService
{
    private HttpClientInterface $client;
    private string $teamServiceUrl;

    public function __construct(HttpClientInterface $client, ParameterBagInterface $params)
    {
        $this->client = $client;
        $this->teamServiceUrl = $params->get('team_service_url');
    }

    /**
     * Obtenir une équipe disponible
     */
    public function getAvailableTeam(): array
    {
        try {
            $response = $this->client->request('GET', $this->teamServiceUrl . '/api/teams/available');

            return $response->toArray();
        } catch (\Exception $e) {
            throw new \Exception('Aucune équipe disponible: ' . $e->getMessage());
        }
    }

    /**
     * Libérer une équipe après résolution d'un incident
     */
    public function releaseTeam(string $teamId): array
    {
        try {
            $response = $this->client->request('PATCH', $this->teamServiceUrl . '/api/teams/' . $teamId, [
                'json' => ['availability' => true]
            ]);

            return $response->toArray();
        } catch (\Exception $e) {
            throw new \Exception("Erreur lors de la libération de l'équipe: " . $e->getMessage());
        }
    }
}
```


---

# BONUS : Dockerisation des Microservices

Cette partie bonus vous guide dans la mise en place de Docker pour conteneuriser chaque microservice Symfony et les faire fonctionner ensemble.

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
│   ├── docker/
│   │   └── php/
│   │       └── php.ini
│   │
│   └── ... (autres fichiers)
│
├── team-service/
│   ├── Dockerfile
│   ├── docker/
│   │   └── php/
│   │       └── php.ini
│   └── ... (autres fichiers)
│
└── incident-service/
    ├── Dockerfile
    ├── docker/
    │   └── php/
    │       └── php.ini
    └── ... (autres fichiers)
```

## Exemple de Dockerfile

Créez un Dockerfile similaire dans chaque service :

```dockerfile
# Dockerfile
FROM php:8.2-fpm

# Installation des dépendances
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration de l'application
WORKDIR /var/www

# Copie des fichiers de l'application
COPY . /var/www/

# Installation des dépendances PHP
RUN composer install --no-scripts --prefer-dist --no-dev --no-progress --no-interaction

# Définition des permissions
RUN chown -R www-data:www-data /var/www

# Exposition du port
EXPOSE 9000

CMD ["php-fpm"]
```

## Exemple de docker-compose.yml

```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0
    container_name: urgency_db
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: urgency_system
      MYSQL_USER: app
      MYSQL_PASSWORD: app_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - urgency-network

  nginx:
    image: nginx:latest
    container_name: urgency_nginx
    ports:
      - "8001:8001"
      - "8002:8002"
      - "8003:8003"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - caller-operator-service
      - team-service
      - incident-service
    networks:
      - urgency-network

  caller-operator-service:
    build: ./caller-operator-service
    container_name: caller-operator-service
    volumes:
      - ./caller-operator-service:/var/www
    environment:
      - APP_ENV=dev
      - DATABASE_URL=mysql://app:app_password@database:3306/urgency_system_caller_operator
      - TEAM_SERVICE_URL=http://nginx:8002
      - INCIDENT_SERVICE_URL=http://nginx:8003
    depends_on:
      - database
    networks:
      - urgency-network

  team-service:
    build: ./team-service
    container_name: team-service
    volumes:
      - ./team-service:/var/www
    environment:
      - APP_ENV=dev
      - DATABASE_URL=mysql://app:app_password@database:3306/urgency_system_team
      - CALLER_OPERATOR_SERVICE_URL=http://nginx:8001
      - INCIDENT_SERVICE_URL=http://nginx:8003
    depends_on:
      - database
    networks:
      - urgency-network

  incident-service:
    build: ./incident-service
    container_name: incident-service
    volumes:
      - ./incident-service:/var/www
    environment:
      - APP_ENV=dev
      - DATABASE_URL=mysql://app:app_password@database:3306/urgency_system_incident
      - CALLER_OPERATOR_SERVICE_URL=http://nginx:8001
      - TEAM_SERVICE_URL=http://nginx:8002
    depends_on:
      - database
      - caller-operator-service
      - team-service
    networks:
      - urgency-network

networks:
  urgency-network:
    driver: bridge

volumes:
  mysql_data:
```

## Configuration Nginx

Créez un fichier `nginx.conf` à la racine du projet :

```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 8001;
        server_name caller-operator-service;

        root /var/www/public;
        index index.php;

        location / {
            try_files $uri /index.php$is_args$args;
        }

        location ~ ^/index\.php(/|$) {
            fastcgi_pass caller-operator-service:9000;
            fastcgi_split_path_info ^(.+\.php)(/.*)$;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param DOCUMENT_ROOT $document_root;
            internal;
        }
    }

    server {
        listen 8002;
        server_name team-service;

        root /var/www/public;
        index index.php;

        location / {
            try_files $uri /index.php$is_args$args;
        }

        location ~ ^/index\.php(/|$) {
            fastcgi_pass team-service:9000;
            fastcgi_split_path_info ^(.+\.php)(/.*)$;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param DOCUMENT_ROOT $document_root;
            internal;
        }
    }

    server {
        listen 8003;
        server_name incident-service;

        root /var/www/public;
        index index.php;

        location / {
            try_files $uri /index.php$is_args$args;
        }

        location ~ ^/index\.php(/|$) {
            fastcgi_pass incident-service:9000;
            fastcgi_split_path_info ^(.+\.php)(/.*)$;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param DOCUMENT_ROOT $document_root;
            internal;
        }
    }
}
```

## Configuration de Symfony pour Docker

Dans chaque service, ajoutez dans `config/services.yaml` :

```yaml
parameters:
    caller_operator_service_url: '%env(CALLER_OPERATOR_SERVICE_URL)%'
    team_service_url: '%env(TEAM_SERVICE_URL)%'
    incident_service_url: '%env(INCIDENT_SERVICE_URL)%'

services:
    # configuration par défaut dans ce fichier
    _defaults:
        autowire: true
        autoconfigure: true
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

## Tests avec Postman

Pour tester les services, utilisez Postman :

1. **Créer un appelant :**
   - Méthode : POST
   - URL : http://localhost:8001/api/callers
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
   - URL : http://localhost:8001/api/operators
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "name": "Opérateur 1"
     }
     ```

3. **Créer une équipe :**
   - Méthode : POST
   - URL : http://localhost:8002/api/teams
   - Headers : Content-Type: application/json
   - Body (raw JSON) :
     ```json
     {
       "type": "Urgence Médicale"
     }
     ```

4. **Créer un incident :**
   - Méthode : POST
   - URL : http://localhost:8003/api/incidents
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
