# <%= name %>

## Setup

1. Go to project folder

> cd <%= name %>

2. Install Dependencies

> npm run setup

3. Create .env with following content

````<% if(database == 'mongodb') { %>
DB_URL=
<% } else { %>
DB_HOST=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
<% } %>
PORT=3000
SECRET_KEY=AAA
````

## Run

1. Start Server

> npm start

2. Open in url or using an Endpoint tester (postman)

> http://127.0.0.1:<%= port %>/