const find = () => {
    // DOM Declarations
    const profilePic = document.getElementById('userProfile');
    const link = document.getElementById('url');
    const user = document.getElementById('user');
    const userID = document.getElementById('userId');
    const userLocation = document.getElementById('userLocation');
    const userBio = document.getElementById('userBio');
    const followers = document.getElementById('userFollowers');
    const following = document.getElementById('userFollowing');
    const userData = document.getElementById('userData');
    const loading = document.getElementById('loading');
    const username = document.querySelector('.usrname');
    const searchBox = document.querySelector('.searchBox');
    const heading = document.querySelector('.heading');

let xhttp = new XMLHttpRequest();
let key = 'https://api.github.com/users/' +''+username.value;
let loadingDots;
username.value = ''

new Promise((res, rej) => 
{
    loading.style.display = 'block';
    searchBox.style.display = 'none'
    loadingDots = setInterval(()=>
    {
        loading.innerHTML += '.';
        if(loading.innerHTML.length > 10)
            loading.innerHTML = 'Loading';
    },220);
    res(xhttp.open('GET',key));
    
}).then(() => {
xhttp.onload = function() 
{
    let data = JSON.parse(this.response);
    
    let promise = new Promise((res, rej) => 
    {
        if(xhttp.status >= 200 && xhttp.status < 400)
       {
            res();
       }
        else
            rej();
});

promise.then(()=> 
{
    
    profilePic.src =`${data.avatar_url}`;
        profilePic.onload = () => 
    {
        clearInterval(loadingDots);
        searchBox.style.display = 'inline'
        heading.style.display = 'none'
        loading.style.display = 'none';
        userData.style.display = 'block';
        profilePic.src =`${data.avatar_url}`;
        
        profilePic.style.display = 'block';
        
        link.href =`${data.html_url}`;
        
        if(data.name !== null)
        user.innerHTML =`${data.name} <br />`;
        else
        user.innerHTML =` N/A <br />`;
        
        userID.innerHTML =`${data.id} <br />`;
        
        if(data.location !== null)
            userLocation.innerHTML =`${data.location} <br />`;
        else
            userLocation.innerHTML =` N/A <br />`;
        if(data.bio !== null)
            userBio.innerHTML =` &#10077; ${data.bio} &#10078; <br />`;
        else
            userBio.innerHTML =` N/A <br />`;
        
        followers.innerHTML =`${data.followers} <br />`;
        
        following.innerHTML =`${data.following} <br />`;
        }
}).catch(() => {
    loading.innerHTML = 'Not Found!';
    clearInterval(loadingDots);
    });

};

}).catch(() => {
    clearInterval(loadingDots);
    loading.innerHTMML = 'Some Error Occurred';
    });

xhttp.send();
}
