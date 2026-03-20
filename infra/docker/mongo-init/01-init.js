/**
 * Script de inicialização do MongoDB.
 * Executado automaticamente apenas na PRIMEIRA vez que o container é criado.
 *
 * Cria um usuário de aplicação com permissões restritas ao banco da aplicação,
 * evitando o uso do usuário root nas aplicações.
 */

const dbName = process.env.MONGO_INITDB_DATABASE;
const appUser = process.env.MONGO_APP_USER;
const appPassword = process.env.MONGO_APP_PASSWORD;

db = db.getSiblingDB(dbName);

db.createUser({
  user: appUser,
  pwd: appPassword,
  roles: [
    {
      role: "readWrite",
      db: dbName,
    },
  ],
});

print(`[init] Banco '${dbName}' e usuário '${appUser}' criados com sucesso.`);
