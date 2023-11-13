# How to run this project

Follow all the steps to successfully launch project

## Installation

Clone the project

```
  git clone https://link-to-project
```

After opening the project, write in the terminal
```
  npm install
```
then **IMPORTANT**
```
  change Environment Variables in .env
```
finally
```
  npm start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_NAME` 

`DB_LOGIN`

`DB_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

## API Reference

#### Get single user by id

```http
  GET /users/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `id`      | `string` | **Required** id to fetch data |

#### Create user

```http
  POST /users
```

| Parameter   | Type     | Description                            |
| :---------- | :------- | :------------------------------------- |
| `first_name`| `string` | **Required**. Displayed name           |
| `last_name` | `string` | **Optional**. It won`t display as name |
| `email`     | `string` | **Required**. Will be used for login   |
| `phone`     | `string` | **Optional**. Format: `+380990030123`  |
| `password`  | `string` | **Required**. Will be used for login   |

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**               |
| `password`| `string` | **Required**               |

#### Update user

```http
  PUT /users/${id}
```

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `id`         | `string` | **Required** id to find user           |
| `first_name` | `string` | **Optional**. Displayed name           |
| `last_name`  | `string` | **Optional**. It won`t display as name |
| `email`      | `string` | **Optional**. Will be used for login   |
| `phone`      | `string` | **Optional**. Format: `+380990030123`  |
| `password`   | `string` | **Optional**. Will be used for login   |




## Support

If you have any problems or questions, write to me by mail `nazar.mraka@gmail.com` or telegram `@NoobsSos`

