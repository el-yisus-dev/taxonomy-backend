#!/bin/bash

# =========================
# CONFIG
# =========================
CONTAINER_NAME="taxondex-db"
DB_NAME="taxondex_db"
DB_USER="postgres"
BACKUP_DIR="./backups"

# =========================
# SETUP
# =========================
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
FILENAME="$BACKUP_DIR/backup_$DATE.sql"

mkdir -p $BACKUP_DIR

# =========================
# BACKUP
# =========================
echo "Creando backup: $FILENAME"

docker exec -t $CONTAINER_NAME pg_dump -U $DB_USER -d $DB_NAME > $FILENAME

if [ $? -eq 0 ]; then
  echo "✅ Backup creado correctamente"
else
  echo "❌ Error al crear el backup"
fi
