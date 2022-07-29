#!/bin/bash

echo "Starting data sources renewal ...."
docker-compose down
docker-compose build
docker-compose up -d
echo "Waiting for deployment for 30 seconds..."
sleep 30
nvm use
npm run db:migration:run
npm run db:seed
echo "Completed data source renew"