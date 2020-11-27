// authentication token
const github_data = {
    "token": "d3bb1d48573c99e0e8318298e8b5c53e7a3f046e",
    "username": "Message-Akunna"
};

// Create the client, specify the endpoint URL
client = GraphQL.makeClient("https://api.github.com/graphql"); 

// Set headers to be passed with each request
// The GitHub API specifies authentication via the Authorization header
client.setHeader("Authorization", "bearer " +github_data.token);  

var query = `
query {
  user(login: "${github_data.username}") {
    avatarUrl
    name
    email
    bio
    repositories(last: 20) {
      nodes {
        name
        description
        languages(first: 4) {
          nodes {
            color
            name
          }
        }
        forks {
          totalCount
        }
        stargazers {
          totalCount
        }
        homepageUrl
        projectsUrl
        updatedAt
      }
    }
  }
}`;

// Pass the query and a callback to handle the response
client.query(query, function(response){ 
    console.log(response); // {"data":{"user":{"login":"nwoodthorpe"}}}
});
