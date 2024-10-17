#!/bin/bash
# Script này sẽ chạy khi container khởi động

# Kiểm tra nếu các biến môi trường được đặt
if [ -n "$POSTGRES_USER_DEV" ] && [ -n "$POSTGRES_PASSWORD_DEV" ]; then
  echo "Creating user: $POSTGRES_USER_DEV"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_USER_DEV WITH PASSWORD '$POSTGRES_PASSWORD_DEV';
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER_DEV;
EOSQL
else
  echo "NEW_USER or NEW_PASSWORD is not set!"
fi
