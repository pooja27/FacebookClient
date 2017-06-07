# FacebookClient

## Introduction:
As a part of this Lab, I have built a Facebook prototype using Rest API. 

## Goals:
The goal was to build Facebook prototype using Nodejs, Angular Js, Express js and MySQL as the database.

Following are the important modules of the application:
#### Nodejs Server: The server handles all the requests send by the client, process and handles them and send the response back to the client.
#### Express JS: Express JS is used to route the requests to the desired API’s.
#### MySQL: MySQL is used as the database to store the data of the application.
#### Angular JS: Angular JS has been used for the front end development. This has been used along with the bootstrap for UI enhancements.
#### Connection Pooling: To enforce connection pooling following steps have been implemented:
*1.	Create a connection pool of n connection objects.
*2.	Enqueue them to an array.
*3.	Whenever a request comes, dequeue a request from the pool and perform the db operation.
*4.	When done, release the connection to connection pool.
#### Session management:
	Npm’s client session has been used to enable session management.
  
  
## Modules:
### User Registration
![Signup](https://github.com/pooja27/FacebookClient/blob/master/images/Signup.png?raw=true "Signup")

### User Signin
![Signin](https://github.com/pooja27/FacebookClient/blob/master/images/Login.png?raw=true "Signin")

### Home Page
![Home Page](https://github.com/pooja27/FacebookClient/blob/master/images/Profile.png?raw=true "Home Page")

#### Editing Profile
![Edit Profile](https://github.com/pooja27/FacebookClient/blob/master/images/Edit%20Profile.png?raw=true "Edit Profile" ) 

### Friend List - Add/Delete
![Friends List](https://github.com/pooja27/FacebookClient/blob/master/images/Friends.png?raw=true "Friend")

### Friend - Search And Add
![Friends Search](https://github.com/pooja27/FacebookClient/blob/master/images/Search%20Friends.png?raw=true)

### Post On timeline
![Posts on time line](https://github.com/pooja27/FacebookClient/blob/master/images/Timeline-Posts.png?raw=true)

### Groups - Create/Delete/Search
#### Create Groups
![Groups](https://github.com/pooja27/FacebookClient/blob/master/images/Groups1.png?raw=true)

#### View Group Members
![ViewGroupMembers](https://github.com/pooja27/FacebookClient/blob/master/images/GroupAndMembers.png?raw=true)
