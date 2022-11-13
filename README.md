## Backend with NodeJS and Express

```bash
# start the server
>> node index.js
# OR
# start the server with nodemon (auto restart so any changes will be applied without restarting manually)
>> npm install -g nodemon
# start the server with nodemon
>> nodemon index.js
```

Node.js Tutorial from W3Schools [here](https://www.w3schools.com/nodejs/nodejs_get_started.asp)

----

### Representational State Transfer (REST)
Intro [here](https://www.developer.com/web-services/intro-representational-state-transfer-rest/)

REST architectural paradigm:
- Client: who sends requests to the server for resources
- Server: who provides an API for accessing its data and operations
- Resources: any content, i.e., text file or image that server provides to client

REST Request Structure:
- comprises a URL, an HTTP method, request headers, and the request body optionally
- HTTP methods: GET, POST, PUT, DELETE, etc
- Endpoint: comprises a URI (Uniform Resource Identifier) that can locate a resource.
URL (Uniform Resource Locator) is the most common type of URI and represents the complete 
web address
- Headers: used to store metadata relevant to both client and server, such as name or IP address
of server, authentication, API key, info about response format, etc
- Body: represents a piece of data sent along with the request to the server. You might want
this piece of data to be used to add or edit data at the server
- more info check HTTP section below

----

### HTTP Module:
- W3Schools Example [here](https://www.w3schools.com/nodejs/nodejs_http.asp)
- MDN Intro [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

HTTP itself is stateless, but not sessionless.
- stateless: 
  - there is no link between two requests being successively carried out on the same connection
  - prospect of being problematic for users attempting to interact with certain page coherently
- HTTP cookies: 
  - allow for websites to remember stateful information (or state) for a user
  - 

HTTP Messages:
- Data exchanges between client and server via HTTP messages.
- Two types of HTTP messages: requests and responses.

----

### Express
Express.js tutorial [here](https://www.tutorialspoint.com/expressjs/expressjs_overview.htm)
and [here](https://expressjs.com/en/starter/hello-world.html)

**Basics**

```bash
# install express
# first cd to the directory
>> npm init -y # create package.json
>> npm install express --save
````

```bash
# a basic express server example

# import Express in the file, 
const express = require('express');

# create an instance of Express
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

app.method(route, callback)
- get is a http method, other options are post, put, delete, etc
- route is the specific path to the resource
- callback function has two parameters, request and response
- res.send() sends the response back to the client

app.listen(port, [host], [backlog], [callback])
- port: a port number on which the server should accept incoming requests
- callback: an asynchronous function that is called when the server starts listening for requests

Start node server (node index.js), 
then navigate to `http://localhost:3000/`
(http://:::3000 in terminal is not suppose to work)


**Payloads**
- Node uses `require()` to import modules
- Express `use` is applied before every endpoint _subsequently_ defined
- no longer need `JSON.parse()` for req.body
- passes request, response objects to the callback function

**Request Params**
- implement `GET/articles/:id`, not specify specific id
- `:id` is a parameter whose value is determined at runtime
- get the value from request: `req.params.id`

**Create a new post**
```bash
let post = {posts.length: req.body}; # Error: can't perform field access for object key

# use dictionary approach to access post by id using length
let post = {};
post[posts.length] = req.body; 
```

**Access Server**

There are three access mechanisms to use the backend server:
- use a command line utility, such as curl
- use a browser plugin, such as Postman or Advanced REST Client
- use your server connected frontend web app

Curl is a tool to transfer data to/from a server without user interaction via a browser.
- GET is the default request method, use -X to specify other methods
- common options of POST:
  - -d: transfer payload
  - -H: header info to include in the request
  - -i: include header response info in the output

```bash
# GET request
>> curl http://localhost:3000/
# POST request
>> curl -X POST http://localhost:3000/login
>> curl -d '{"key1": "value1", "key2": "value2"}' -H "Content-Type: application/json" -X POST http://localhost:3333/login
```

**Routing with Express**

Not covered too much in lecture, check tutorials above.

**Middleware**

Install Middleware (body-parser).
```bash
>> npm install body-parser --save
```
Then import it in the file.
Without this, the request body - Payload received undefined.
```bash
const bodyParser = require('body-parser');
```

----

### Backend Unit Testing with Jasmine

Jasmine tutorial [here](https://www.cloudbees.com/blog/jasmine-node-js-application-testing-tutorial)

Check `spec > articles.spec.js` for implementation. \
Install package jasmine-node to run unit tests on backend
```bash
>> npm install jasmine-node -g # if error, do not install globally or use sudo
>> mkdir spec
>> cd spec

# USE THIS: test each spec.js
>> jasmine-node articles.spec.js --verbose

# DO NOT USE THIS: test all spec.js; Error: .F.
>> cd ..
>> jasmine-node spec # this 

# If still not working, use the provided package.json and node_modules
```

Use Jasmine to test the server
- open two terminals: one to run the server (node index.js), one to run the tests like above

Isomorphic Fetch
- Unlike frontend/client where fetch is native to browser, backend/server needs isomorphic-fetch
- Need Promise implementation for Node.js
- Install isomorphic-fetch and promise
```bash
>> npm install isomorphic-fetch es6-promise --save

# import in the file
require('es6-promise').polyfill();
require('isomorphic-fetch');
```
- POST fetch options
  - method: REST call
  - headers: content type
  - body: payload (string format)
- recall, fetch returns a Promis
  - use `.then()` when the promise is resolved
  - e.g.: `then(res => res.json())`
```bash
let post = {author: 'Scott', body: 'A post'};

fetch(url('/article'), {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(post)
})
```


----

### Authorization in Express

**Cookies / Cookies Parser**

Check `src > auth.js` for implementation.
```bash
# install cookie-parser
>> npm install cookie-parser --save
# import in index.js
const cookieParser = require('cookie-parser');
# use cookieParser as middleware
app.use(cookieParser());
```

How cookies work in authentication
- POST /login {username, password}
- server returns a cookie
- browser 'eats' cookie, return it with subsequent requests
- PUT /logout, server returns empty cookie for browser to 'eat'

When we pass express app to auth so isLoggedIn is middleware for all endpoints below it, 
we will receive an unauthorized error when test those endpoints.
```bash
auth(app);
```

Basic Auth Node Module (we do not need this)
```bash
>> npm install basic-auth --save
```

**Hashing, Salting, and Peppering**
```bash
# install md5
>> npm install md5 --save
# import in auth.js
const md5 = require('md5');
```
Check `auth.js`: `function login` and `function register` for implementation.

----

### MongoDB

MongoDB is a document-oriented, schema-less (extensible and no error checking), 
JSON oriented, documents within documents database.
- MongoDB in Node: Query documents
- MongooseJS: an Object Document Model
- get connected to MongoDB Atlas [here](https://www.mongodb.com/atlas/database)
```bash
# install mongoose
>> npm install mongoose --save
# import in file index.js
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
# download schema to src directory
const User = mongoose.model('user', userSchema);
# the string comes from Atlas > Database > connect > connect your application
# sss is username, replace <password> with actual password, cluster0 is cluster name
const connectionString = 'mongodb+srv://sss:<password>@cluster0.bome7rd.mongodb.net/?retryWrites=true&w=majority';
```

----

### Backend Testing with Redis
