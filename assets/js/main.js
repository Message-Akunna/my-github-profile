// get data from github endpoint
window.onload = function(event) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://my-github-profile.000webhostapp.com/access.php";

    fetch(proxyurl+url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
