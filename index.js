'use strict';


function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;  
    const options = {
      headers: new Headers({
        Accept: "application/vnd.github.v3+json"
      })
    };
  
    
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, username))
      .catch(error => alert("username not found"));
  }

console.log(`Finding repos for ${username}`);

function displayResults (responseJson, username) {
    $("#results-list").empty();
    responseJson.forEach(obj =>
        $("#results-list").append(
          `<li><a href='${obj.url}'>${obj.name}</a></li>`
        )
      );
    $("#username").text(`${username}`);
    $('#results').removeClass("hidden");
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
        const username = $('#gh-username').val();
        getRepos(username);
    });
  }

  $(watchForm);