echo "Aguardando o banco..."
until nc -z database 5432; do
  sleep 1
done

echo "Banco disponível! Rodando Prisma DB Push..."
npx prisma db push --schema=prisma/schema.prisma

echo "Iniciando a aplicação..."
node dist/apps/shortener/main.js
