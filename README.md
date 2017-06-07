# FacebookClient

##Introduction:
As a part of this Lab, I have built a Facebook prototype using Rest API. 

##Goals:
The goal was to build Facebook prototype using Nodejs, Angular Js, Express js and MySQL as the database.

Following are the important modules of the application:
####Nodejs Server: The server handles all the requests send by the client, process and handles them and send the response back to the client.
####Express JS: Express JS is used to route the requests to the desired API’s.
####MySQL: MySQL is used as the database to store the data of the application.
####Angular JS: Angular JS has been used for the front end development. This has been used along with the bootstrap for UI enhancements.
####Connection Pooling: To enforce connection pooling following steps have been implemented:
*1.	Create a connection pool of n connection objects.
*2.	Enqueue them to an array.
*3.	Whenever a request comes, dequeue a request from the pool and perform the db operation.
*4.	When done, release the connection to connection pool.
####Session management:
	Npm’s client session has been used to enable session management.
  
  
##Modules:
*User Registration
*User Signin
*Home Page
*View Timeline
*Post On timeline
*Add Friends - Search-Add/ View Profile
*Groups - Create/Delete/Search

