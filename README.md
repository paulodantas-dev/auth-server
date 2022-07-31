# auth-server-api

API - https://auth-app-node.herokuapp.com

APP - https://auth-client-paulodantas-dev.vercel.app/

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

## Installation / Execute

How to install and execute the project in LOCALHOST

```bash
    git clone https://github.com/paulodantas-dev/auth-server.git
    cd auth-server
    yarn / npm install
    yarn dev / npm run dev
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
  yarn build / npm run build
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
- [typescript](https://www.typescriptlang.org/)

## API Documentation

For more details [Doc](https://auth-app-node.herokuapp.com/api/doc/)

#### Returns token and sets cookie for user with refresh token

```http
  post /api/login
```

| BODY       | Type     | Description      |
| :--------- | :------- | :--------------- |
| `email`    | `string` | **Mandatory**.   |
| `password` | `string` | **Mandatory**.   |

#### send email with access token verification

```http
  post /api/register
```

| BODY       | Type     | Description    |
| :--------- | :------- | :------------- |
| `fullname` | `string` | **Mandatory**. |
| `username` | `string` | **Mandatory**. |
| `email`    | `string` | **Mandatory**. |
| `password` | `string` | **Mandatory**. |

#### Returns message with logout success and remove cookie with refresh token

```http
  post /api/logout
```

#### Returns token

```http
  post /api/refresh_token
```

#### Returns message account has been activated

```http
  post /api/activate
```

| BODY               | Type     | Description    |
| :----------------  | :------- | :------------- |
| `activation_token` | `string` | **Mandatory**. |


#### Returns message and send email with password reset link

```http
  post /api/forgot-password
```

| BODY    | Type     | Description    |
| :------ | :------- | :------------- |
| `email` | `string` | **Mandatory**. |

#### Returns message password successfully changed

```http
  post /api/reset-password
```

| BODY       | Type     | Description    |
| :--------- | :------- | :------------- |
| `password` | `string` | **Mandatory**. |

#### Returns img url

```http
  post /api/upload-avatar
```

| BODY   | Type   | Description    |
| :----- | :----- | :------------- |
| `file` | `file` | **Mandatory**. |

#### Returns your user

```http
  get /api/user
```

#### Returns all user

```http
  get /api/user/all
```

#### Returns message update user success

```http
  patch /api/user/update
```

| BODY       | Type     | Description    |
| :--------- | :------- | :------------- |
| `name`     | `string` | **Optional**.  |
| `avatar`   | `string` | **Optional**.  |

#### Returns message update role success

```http
  patch /api/user/update-role/:id
```

| BODY       | Type     | Description    |
| :--------- | :------- | :------------- |
| `role`     | `string` | **Mandatory**. |

| PARAMS     | Type     | Description    |
| :--------- | :------- | :------------- |
| `id`       | `string` | **Mandatory**. |

#### Returns message update role success

```http
  patch /api/user/delete/:id
```

| PARAMS     | Type     | Description    |
| :--------- | :------- | :------------- |
| `id`       | `string` | **Mandatory**. |



## Feedback

If you have any feedback, please let me know via paulodantasbjr@gmail.com
