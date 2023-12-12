# comments-platform

## Description

Websocket server with which you can leave comments. You can add a photo or text file to a comment, and you can reply to each comment as many times as you like.
You need to sign up to leave comments and view them.

## Features

- Sign up.
- Add new comments.
- Get comments.

## Main technologies

- Node.js
- Server: Express, Websockets
- Database: Posgresql
- ORM: Sequelize
- Database hosting: Supabase
- Bucket hosting: Supabase

## Server startup

```bash
git clone https://github.com/DobriyIm/comments-platform.git
>
npm install
>
touch .env
```

Then you need to provide some environment variables:

```plaintext
    PORT=3000
    DB_CONNECTION_STRING='connection string to your postresql db'
    JWT_TOKEN_SECRET_KEY='key for jwt tokens'
    SUPABASE_URL='url of yours supabase's project'
    SUPABASE_KEY='key of yours supabase's project'
```

After enter:

```bash
npm run dev
```

## Bugs and else

- Lack of validation for data sent from the client side.
- Not all errors are handled correctly.

## Project overview

The server at `ws://localhost:3000` is started, accepts client connections and processes the message from clients in JSON format as text.
The server also sends responses in JSON format as text.

It is possible to attach `.jpg`, `.gif`, `.png`, `.txt` files in Base64 string format to the comment. The `.txt` file should be no larger than 100kb, and `.jpg`, `.gif`, `.png` are compressed to 320x240 pixels resolution.

### Messages from client

- **Sign-up**

```json
{
	"event": "SIGN_UP",
	"data": {
		"name": "Victor",
		"email": "victor2005@gmail.com",
		"password": "qwerty"
	}
}
```

- **Sign-in**

```json
{
	"event": "SIGN_IN",
	"data": {
		"email": "victor2005@gmail.com",
		"password": "qwerty"
	}
}
```

- **Add new comment**

```json
{
	"event": "ADD_COMMENT",
	"token": "Bearer token",
	"data": {
		"text": "Some text....",
		// optional
		"file": {
			"name": "HelloWorld.txt",
			"data": "SGVsbG8gV29ybGQh"
		}
	}
}
```

- **Get cooments**

```json
{
	"event": "GET_PART",
	"token": "Bearer token",
	"data": {
		// optional
		"limit": 2,
		// optional
		"offset": 1
	}
}
```

### Messages from server

- **Sign-up/Sign-in**

```json
{
	"event": "EVENT",
	"succes": true,
	"data": {
		"id": "New user's id",
		"token": "User's token"
	}
}
```

- **Add comment/Get comments**

```json
{
	"event": "EVENT",
	"succes": true,
	"data": "Some data"
}
```

- **New comment added. Broadcast**

```json
{
	"event": "UPDATE"
}
```

- **Error**

```json
{
	"event": "EVENT",
	"succes": false,
	"data": "Some data"
}
```
