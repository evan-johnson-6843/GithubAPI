const express = require('express');
const chalk = require('chalk');
const rp = require('request-promise');
const PORT = require('./port');

const app = express();


app.get('/:username', (req, res) => {
    const { username } = req.params;
    getFollowersAtDepth(2, username)
        .then(followerTree => res.send(followerTree));
});

function getFollowersAtDepth(depth, username) {
    // for each username, return their first 5 friends' data
    //base case is zero depth
   if (!depth) {
       return {
           [username]: 'Depth Reached'
       };
   }
    
    return getFollowersForUser(username)
        .then(logins => Promise.all(
            logins.map(login => getFollowersAtDepth(depth - 1, login))
        ).then(values => ({ 
            [username]: values
         })));

}

function getFollowersForUser(username) {
    const options = {
        url: `https://api.github.com/users/${username}/followers`,
        headers: {
            'User-Agent': 'request'
        }
    };

    return rp(options)
        .then(response => 
            JSON.parse(response)
            .slice(0, 5)
            .map(u => u.login)
            );
}


function makeRequest(username) {
    // return JSON.stringify(simpleObject);

    

    
}

app.listen(PORT, () => {
    const message = chalk.green(`Listening on port ${PORT}`);
    console.log(message);
});


// makeRequest(username)
// .then (body => { 
//     const parsed = JSON.parse(body);
//     const firstFive = parsed.slice(0, 5);
//     firstFive
//         .map(user => user.login)
//         .map(login => makeRequest(login));


// });
// res.send('whatever');