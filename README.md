# LedgerTec Internship Test - [ 2º Profile ]
> Answer to ledger full-stack node developer challenge, the pdf with the test is inside the Challenge description folder. The first part of the challenge consists in making a RESTFul application using NodeJS and SQLite to store the data. The second part includes adding a ReactJS front-end to the previous Node project
---
## Installation ⚙️
```
git clone https://github.com/lucasmsa/Ledger-Challenge.git
```

* #### On the project folder run ``npm install`` then ``cd client`` to go to the react app folder, and run ``npm install`` again.
<br>

## Running Tests with Jest 🧪
* Go to the main project and run:
```
npm run test
```
![Jest results](http://g.recordit.co/xVS6ze6RFi.gif)
<br>
![Jest results](http://g.recordit.co/pP1L8gXe7q.gif)
##### *Don't run tests while the app is on*

---

## Migrations 
* If the ``products.db`` file inside the ``database/`` folder gets deleted it is possible to populate a new database through the use of the command: 
```
./node_modules/db-migrate/bin/db-migrate up
```
![Migrations results](http://g.recordit.co/QAbgSCaxhF.gif)

---

## How to run 🎯

* Open 2 terminals 
* First run ``nodemon index.js`` on the main folder and in the other terminal go to the client folder and run ``npm start`` 

## CRUD Operations
* ### Create
 ![Create results](http://g.recordit.co/oKt1DPDPPJ.gif)

---
* ### Read
   * The number close to the product corresponds to its category ID. The number close to the category is its ID, when adding    new products just put the same number as the one displayed in the category you want to insert it
   <br>
 ![Read results](https://i.imgur.com/WI4cHy0.png)
 ![Read results](https://i.imgur.com/z9ZXRix.png)
 
---
* ### Update
 ![Update results](http://g.recordit.co/r1GCIpZQZO.gif)
 
---
* ### Delete
 ![Delete results](http://g.recordit.co/QHhoXdvPHE.gif)
 
---
#### *Those behaviours can also be seen in the categories section*


