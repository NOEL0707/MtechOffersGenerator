#Installation Steps

## How to run using Docker?

### `Git Clone`
Make sure You have Git installed on your system.If you have Git installed you can use Use `git clone https://github.com/NOEL0707/MtechOffersGenerator.git ` to clone this repository.If you don't have git you can download the zip folder from the code button.

### `docker compose up --build`
Use this command if you want to recompile/rebuild the image.
To run this command Make sure you are in the same directory in which `docker-compose.yaml` is present.
This command will spawn the frontend container at localhost:3000,Backend container at localhost:4444 and a mysql database.

### `docker compose up`
To run this command Make sure you are in the same directory in which `docker-compose.yaml` is present.
This command will spawn the frontend container at localhost:3000,Backend container at localhost:4444 and a mysql database.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `docker compose down`
This command will remove the spawned containers.

### `docker compose down -v`
This command will remove the spawned containers as well as the data/volumes associated with it.


### `Environment variables`
inside the dockerr-compose.yaml file you will find the below lines of code in the backend and mysqldb section.
    environment:
      - MYSQL_DATABASE=Applicants2023
      - MYSQL_PASSWORD=Your_MySql_Password
      - MYSQL_ROOT_PASSWORD=Your_MySql_Root_Password
      - MYSQL_HOSTNAME="mysqldb"
Change MYSQL_PASSWORD,MYSQL_ROOT_PASSWORD to the password of your choice.