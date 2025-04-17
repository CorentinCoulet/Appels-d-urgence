# 🆘 Urgency System - Microservices

Ce projet est une refactorisation d’un système de gestion des urgences en architecture **microservices**. Il a été réalisé dans le cadre d’un exercice pédagogique, basé sur un projet monolithique existant.

## 🚀 Objectif

Mettre en place un système distribué permettant de gérer les appels d'urgence, les opérateurs, les équipes d’intervention et les incidents, avec une meilleure séparation des responsabilités et une architecture plus évolutive.

## 📦 Microservices

Le système est composé de **3 microservices** principaux, chacun avec sa propre base de code, logique métier et base de données MongoDB partagée :

| Service                  | Port   | Rôle                                                             |
|--------------------------|--------|------------------------------------------------------------------|
| `caller-operator-service` | 3001   | Gère les appelants et les opérateurs                            |
| `team-service`            | 3002   | Gère les équipes d’intervention (création, dispo, maj)          |
| `incident-service`        | 3003   | Gère les incidents et communique avec les deux autres services  |

## ⚙️ Fonctionnalités principales

- Création et gestion d’appelants et d’opérateurs
- Création et gestion d’équipes disponibles pour intervention
- Création d’incidents (avec attribution automatique d’équipe)
- Mise à jour du statut d’un incident (`pending`, `in_progress`, `resolved`)
- Libération automatique des équipes à la résolution d’un incident
- Communication inter-services via HTTP (Axios)

## 🐳 Docker

L’ensemble des services est **conteneurisé avec Docker** et orchestré via `docker-compose`.

### Démarrage rapide

```bash
# À la racine du projet
docker-compose up --build -d
