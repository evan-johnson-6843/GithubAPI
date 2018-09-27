This is a simple node/express API that allows a user to enter a username or as github calls it 
'login' of someone on github and will return Follower GitHub logins (up to
5 Followers total) associated with the passed in GitHub ID. Retrieve data up to 3 levels
deep, repeating the process of retrieving Followers (up to 5 Followers total) for each
Follower found. Data is returned in JSON format in the browser.

To get started, install dependencies by running "npm i" in a terminal while in the root direcotry of this project.

To boot up the application, run npm start in the command line. Go to localhost:3000/username where username is the name of the user you wish to begin at.