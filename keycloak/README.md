# How to Update Keycloak Realm JSON file

Included [test-realm.json](./test-realm.json) is configured to be auto imported when starting up Keycloak via [docker-compose.yaml](../docker-compose.yaml). Follow these instructions to make changes to apps, users, scopes, roles, etc. on Keycloak and create a new export JSON. We're using Keycloak version `25.0.4`

## Step 1: Run Keycloak with postgres DB

To allow export to work, we'll need to run Keycloak with Postgres. By default, Keycloak runs with H2, but it does not allow multiple connections needed for export while the app is running.

1. Stop existing Keycloak containers, if any.

```bash
docker compose down
```

2. Run the docker compose containing postgres container [docker-compose-with-postgres.yaml](./docker-compose-with-postgres.yaml)

```bash
cd ./keycloak
docker compose -f docker-compose-with-postgres.yaml up -d
```

## Step 2: Make any necessary changes

Open https://localhost:8443 and make any necessary changed you'd like to keep

## Step 3: Create an export JSON

In order to create an export JSON that includes realm, clients and users, we need to leverage a commandline option. Unfortunately, exporting a realm using Keycloak UI will not include users.

1. Open a bash terminal from running Keycloak container

```bash
docker exec -it keycloak bash
```

2. Create an export JSON using Keycloak command

```bash
/opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --users realm_file --realm test
```

3. Copy the exported JSON file to host (from host machine)

```bash
exit
docker cp keycloak:/opt/keycloak/data/import/test-realm.json .
```
