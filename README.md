# Mandai-feedback

```bash
npm install

#serve app ay localhost:5001
npm run dev
```

### Prerequisites

1. Ensure [Node.js](https://nodejs.org/en/) installed.
2. Ensure postgres DB setted up locally, can import from the db file(mandai-feedback.sql)

#### Step-by-step

1. Clone this repository with command below, can copy and paste to the cmd.

```bash
git clone https://github.com/wng97/Mandai-Feedback.git
```

2. Open up the folder in VS code

3. Install dependencies

```bash
npm install
```

4. Run up the app

```bash
npm run dev
```

5. Can start playing around with the API, enjoy!

### API Design

There is total 10 API, these 10 API can categories to 2 main features, users and also feedback as below:

#### Users

1. Register user API, **POST** request, required 3 params in request body

   > name **string**;
   > email **string**;
   > password **string**;

```bash
/users/register
```

2. Login user API, **POST** request, required 2 params in request body

   > email **string**;
   > password **string**;

```bash
/users/login
```

3. Get user by userId API, **GET** request, required 1 param in request params, **auth token is needed**

   > id **string**;

```bash
/users/:id
```

4. Update user by userId API, **PUT** request, required 1 param in request params, 3 optional params in request body, **auth token is needed**

   > req params:
   > id **string**;
   >
   > req body:
   > name **string**;
   > email **string**;
   > password **string**;

```bash
/users/:id
```

5. Delete user by userId API, **DELETE** request, required 1 param in request params, **auth token is needed**

   > id **string**;

```bash
/users/:id
```

#### Feedback

1. Submit feedback API, **POST** request, required 1 param in request params, required 2 param in request body, **auth token is needed**

> request params:
> id **string**;
>
> request body:
> feedback **string**;
> rating **number** 1-5;

```bash
/feedback/:userId/submit
```

2. Get feedback list API, **GET** request, **auth token is needed**

```bash
/feedback/list
```

3. Get feedback by id API, **GET** request, required 1 param in request params, **auth token is needed**

> id **string**

```bash
/feedback/:id
```

4. Update feedback by id API, **PUT** request, required 1 param in request params, required 2 optional param in request body, **auth token is needed**

> request params:
> id **string**
>
> request body:
> feedback **string**;
> rating **number** 1-5;

```bash
/feedback/:id
```

5. Delete feedback by id API, **DELETE** request, required 1 param in request params, **auth token is needed**

> id **string**

```bash
/feedback/:id
```

### Unit Test

Unit test for this project is using [vitest](https://vitest.dev/guide/).

```bash
# to run up unit test
npm run test

# to run up test coverage
npm run coverage
```

### Database design

There is 2 main entities and table:

- users
- feedback
- Users have one to many relationship with feedback table, one user can have multiple feedback submission
- Feedback have many to one relationship with users table, one feedback can belong to one single user only
