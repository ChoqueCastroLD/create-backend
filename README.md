# create-backend
A CLI built in Node.js, to automate the process of creating a rest api / sockets backend basics

## Install (Optional)

Install using NPM:
```sh
npm install create-backend -g
```

## Usage

Use directly with npx (no install needed)
```sh
npx create-backend
```
Then you just answer some prompts and *boom!* you got a backend.

## Advanced Usage

###### Command Arguments
Argument | Values | Default | Description
--- | --- | --- | ---
**-y** | *none* | *none* | Skip all prompts
**--name** | :String | 'generated_backend' | Project Name
**--db** | `mysql | mariadb | sqlite | mssql | postgres` | Database engine to be used
**--example** | `true | false` | false | Adds an example endpoint
**-ts** | *none* | *none* | Use Typescript instead on Vanilla Javascript
**--license** | see licenses.js | 'UNLICENSED' | Which license will be used
**--port** | :Number | 3000 | Which license will be used

## Examples

Create project named naza_backend
> $ npx create-backend naza_backend -y

using typescript
> $ npx create-backend naza_backend -y -ts

using typescript and postgressql
> $ npx create-backend naza_backend -y -ts --db=postgres

using javascript and mariadb
> $ npx create-backend naza_backend -y --db=mariadb


## TODO
1. Testing (Jest, Mocha)
2. M0r3 databases
3. Microservices
4. Generate backend based on .sql script

---
Screenshot:

![Alt text](/ss.png?raw=true "screen")
