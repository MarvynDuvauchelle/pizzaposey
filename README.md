# PizzaPosey
Gestionnaire de pizza

### Install
'sudo apt-get update'
'sudo apt-get install mongodb-org'

### Create tools for mongo

- Create file named mongod and copy the line below

mongod --bind_ip=$IP --dbpath=data --nojournal --rest"$@"

'sudo chmod +x mongod'

- Create file named mongodRepair and copy the line below

mongod --bind_ip=$IP --dbpath=data --nojournal --rest"$@" --repair

'sudo chmod +x mongodRepair'


- Create folder named data

- Connect to db interface

cd adminMongo
node app.js


Rappel :

Pizza controller :

    Si une requete rest a fonctionnée -> pizzaEvent -> evennement socket pour tou mettre à jour