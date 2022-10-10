const APIurl = "https://api.github.com/users/";
const main = document.querySelector(".mainContent");
const search = document.querySelector(".search");

const getUser = async (username) => {
  const res = await fetch(APIurl + username);
  console.log(res);
  const data = await res.json();
  console.log(data);

  const card = `
    <div class = "card">
        <div>
            <img class = "avatar" src = "${data.avatar_url}" alt = "User Image">
        </div>

        <div class = "user-info">
            <h1> ${data.login} </h1>
            <p>${data.bio}</p>

            <ul class = "info">
                <li>Followed by ${data.followers}</li>
                <li> ${data.following} Following </li>
                <li> ${data.public_repos} Repositories</li>
            </ul>
        </div>

        <div id = "repos">
        </div>

    </div>
    `
    main.innerHTML = card;
    getRepositories(username)
};


const getRepositories = async (username) => {
    const res = await fetch(APIurl + username + "/repos");
    const data = await res.json();
    console.log(data);

    const repos = document.querySelector("#repos");

    data.forEach((repo) => {
        console.log(repo);
        const elem = document.createElement("a");
        const linebreak = document.createElement("br");
        elem.classList.add("repo");
        elem.href = repo.url;
        elem.innerText = repo.name;
        elem.target = "_blank";
        repos.appendChild(elem);
        repos.appendChild(linebreak);
    })
};


getUser("Suhani97")

const formSubmit = () => {

    if(search.value != ""){
        getUser(search.value);
    }
    else{
        alert("You cannot find a user with a blank name :)");
    }


    return false; 
}




