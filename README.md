# A Bucket List API

This API lets you create a bucket list with registering your progress, adding comments and a picture to each comment

For example:

- I have an item to eat all sorts of sushi there are.
- I could add a progress like "01/08/2016 - Scheduled to visit an awesome Japanese restaurant that serves eel sushi"
- Later on, I could add a comment on how was the experience: "Eel sushi rocks! <picture of an eel sushi>"

### Installation

#### Prerequisites: Node version 6

To install:

- execute sql script in `db_install/ezybucketModel.sql` it will create dummy data iduser: 1
- run `npm install`
- verify: ports, database url, user and password, in settings.dev.json and settings.prod.json
- to test run `gulp serve-dev` to test in `http://localhost:3000`
- to lint run `gulp`
- Environment variables are only needed for production API
 In a `.env` file: process.env.PORT, process.env.ISPROD, process.env.DBURL, process.env.DBUSERNAME, process.env.DBPASSWORD (see app.config.js)

### TODOS

- Handle users
- Handle errors