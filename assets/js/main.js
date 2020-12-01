// get data from github endpoint
window.onload = function(event) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://my-github-profile.000webhostapp.com/access.php";

    let repositoryUi = "";
    let repositoryUiTag = document.querySelector('.repositories-list');
    let userImgs = document.querySelectorAll('.user-img');
    let userNames = document.querySelectorAll('.user-name');
    let userBio = document.querySelector('.user-bio');
    let userStatus = document.querySelector('.user-status-text');
    let repoCount = document.querySelector('.repo-count');

//     fetch(proxyurl+url)
    fetch(url)
    .then(response => response.json())
    .then(res => {
        userImgs.forEach((userImg) => {
            userImg.src = res.data.viewer.avatarUrl;
            userImg.alt = res.data.viewer.name;
        });
        userNames.forEach((userName) => {
            userName.innerHTML = res.data.viewer.name;
        });
        userBio.innerHTML =  res.data.viewer.bio;
        // userStatus.innerHTML = res.data.viewer.status.message;
        repoCount.innerHTML = res.data.viewer.repositories.nodes.length;
        // loop through repositories
        res.data.viewer.repositories.nodes.forEach((repository)=>{
            let repoLangs = "";
            repository.languages.nodes.forEach((language)=>{
                repoLangs += `
                    <span class="ml-0 mr-2">
                        <span class="repo-language-color" style="background-color: ${language.color}"></span>
                        <span class="repo-programming-language">${language.name}</span>
                    </span>
                `;
            });

            // single repo
            repositoryUi += `
            <li class="w-100 d-flex py-4 border-bottom flex-justify-between flex-align-center repo-list">
                <div class="flex-grow-1">
                    <div class="d-inline-block mb-1">
                        <h3 class="">
                            <a href="${repository.projectsUrl}" class="repo-name">${repository.name}</a>
                            <span class="label label--outline ml-1 mb-1">Private</span>
                        </h3>
                    </div>
                    <div class="">
                        <p class="w-75 d-inline-block app-text-light mb-2 pr-4 repo-description">
                            ${repository.description}
                        </p>
                    </div>
                    <div class="f6 text-gray mt-2">
                        ${repoLangs}
                        <span class="mr-3">
                            <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                                </path>
                            </svg>
                            <span class="stared-repo-count">${repository.stargazers.totalCount}</span>
                        </span>
                        <span class="mr-3">
                            <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                                <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                                </path>
                            </svg>
                            <span class="forked-repo-count">${repository.forks.totalCount}</span>
                        </span>
                        <span class="">
                            Updated 
                            <span class="relative-time">${repository.updatedAt}</span>
                        </span>
                    </div>
                </div>
                <div class="">
                    <form class="">
                        <button class="btn btn-default btn-sm">
                            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                                </path>
                            </svg>
                            Star
                        </button>
                    </form>
                </div>
            </li>`;
            // console.log(repository);
        });
        repositoryUiTag.innerHTML = repositoryUi;

    });
};

// sticky nav style implementation
(function applyNavbarSticky() {
    let stickyContainer = document.querySelector('.sticky-container');
    let navbar = document.querySelector('.sticky-top-nav');
    stickyContainer.style.position = 'sticky';

    function setTop() {
        let stickyContainerHeight = stickyContainer.clientHeight;
        let navbarHeight = navbar.clientHeight;
        let styleTop = navbarHeight - stickyContainerHeight;
        
        stickyContainer.style.top = `${styleTop}px`;
    }

    setTop()

    window.onresize = function () {
        setTop();
    }
})();

// hide extra-profile when user profile picture is on viewport 
document.body.onscroll = function(event) {
    var profileAvatar = document.getElementById('profileAvatar');
    var extraProfile = document.getElementById('extraProfile');
      // check if is in view port
    var checkProfileAvatarVisibility = isVisible(profileAvatar);
    if (checkProfileAvatarVisibility) {
        extraProfile.style.opacity = 0;
    } else {
        extraProfile.style.opacity = 1;
    }
}

// toggle mobile dropdown menu
var mobileMenuToggler = document.querySelector("#mobileMenuToggler");

mobileMenuToggler.onclick = function(){
    document.querySelector("#mobileMenu").classList.toggle('d-none');
}
