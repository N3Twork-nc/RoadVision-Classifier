echo "cron.database_name='$POSTGRES_DB'"  >> /var/lib/postgresql/data/postgresql.conf
if [ -n "${POSTGRES_USER_DEV}" ] && [ -n "${POSTGRES_PASSWORD_DEV}" ]; then
    echo "Creating user: ${POSTGRES_USER_DEV}"
    export PGPASSWORD="$POSTGRES_PASSWORD"
    psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_DB}" <<-EOSQL
        CREATE USER "${POSTGRES_USER_DEV}" WITH PASSWORD '${POSTGRES_PASSWORD_DEV}';
        GRANT ALL PRIVILEGES ON DATABASE "${POSTGRES_DB}" TO "${POSTGRES_USER_DEV}";
	GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "${POSTGRES_USER_DEV}";
	ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO "${POSTGRES_USER_DEV}";
	GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO "${POSTGRES_USER_DEV}";
	ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO "${POSTGRES_USER_DEV}";
	CREATE EXTENSION pg_cron;
	SELECT cron.schedule(
    		'delete_account_inactive',     
    		'*/2 * * * *',
		'DELETE FROM account WHERE created < NOW() - INTERVAL ''2 minutes'' AND active = false;'
	);
	UPDATE cron.job SET nodename = '';
EOSQL
else
    echo 'POSTGRES_USER_DEV or POSTGRES_PASSWORD_DEV is not set!'
fi

# Add rules
PG_HBA_FILE="/var/lib/postgresql/data/pg_hba.conf"

NEW_CONFIG="local    all             admin                          trust"

# Thêm cấu hình ngay dưới dòng "# 'local' is for Unix domain socket connections only"
sed -i "/# \"local\" is for Unix domain socket connections only/a $NEW_CONFIG" $PG_HBA_FILE
