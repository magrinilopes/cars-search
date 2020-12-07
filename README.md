# cars-search

## Setup do projeto
Execute os passos abaixo para rodar o projeto

### Clone o projeto em seu diretório de preferência
```
git clone https://github.com/magrinilopes/cars-search
```

### Acesse o diretório cars-seearch que foi clonado

### Tem duas formas de rodar este projeto, uma é instalando a aplicação.
Para esse processo, é necessário ter o node e o npm instalados na máquina. Caso tenha, execute o comando:
```
npm install
```

### Compilar o projeto e executar no mode desenvolvedor
```
npm run serve
```

### Caso queira subir em container
Lembre-se que o [docker](https://docs.docker.com/get-docker/) precisa estar instalado.

Gere a imagem conforme comando abaixo:
```
docker build -t tex/cars-search .
```

### Com a imagem criada, execute o comando
docker run -it -p 8080:80 --rm --name cars-search tex/cars-search
