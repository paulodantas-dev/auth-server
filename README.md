# auth-server-api

APP - https://auth-app-node.herokuapp.com

## 🛠 Skills

Javascript, NodeJS, Express, Mvc, MongoDB, Mongoose

## 🚀 About Me

I am a full-stack developer and javascript specialist.(M.E.R.N)
Feel free to take a look at my latest projects on my [portifolio page](https://portfolio-paulodantas-dev.vercel.app/)

## Documentation

[Swagger](https://auth-app-node.herokuapp.com/api/doc/)

## Used stack

**Back-end:** NodeJS, Express, REST

**Database:** MongoDB, Mongoose

## Installation

How to install the project

```bash
    git clone https://github.com/paulodantas-dev/auth-server.git
    cd auth-server
    yarn or npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env

`PORT`

`NODE_ENV`

`ACCESS_TOKEN_SECRET`

`AREFRESH_TOKEN_SECRET`

`MONGO_URI`

## Deploy

To deploy this project, run

```bash
  npm run build
```

## Lib

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [body-parser](https://github.com/expressjs/body-parser#readme)
- [cookie-parser](https://github.com/expressjs/cookie-parser#readme)
- [cors](https://github.com/expressjs/cors#readme)
- [express](http://expressjs.com/)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [mongoose](https://mongoosejs.com/)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)

## API Documentation

For more details [Doc](https://auth-app-node.herokuapp.com/api/doc/)

#### Returns user, token and sets cookie for user with refresh token

```http
  post /api/login
```

| BODY       | Tipo     | Descrição        |
| :--------- | :------- | :--------------- |
| `email`    | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |

#### Returns user, token and sets cookie for user with refresh token

```http
  post /api/register
```

| BODY       | Tipo     | Descrição        |
| :--------- | :------- | :--------------- |
| `fullname` | `string` | **Obrigatório**. |
| `username` | `string` | **Obrigatório**. |
| `email`    | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |

#### Returns message with logout success and remove cookie with refresh token

```http
  post /api/logout
```

#### Returns user, token and sets cookie for user with refresh token

```http
  post /api/refresh_token
```

## Feedback

If you have any feedback, please let me know via paulodantasbjr@gmail.com
