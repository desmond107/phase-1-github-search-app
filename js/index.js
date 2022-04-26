document.addEventListener('DOMContentLoaded', ()=>
    document.querySelector('form').addEventListener('submit', (e)=>{
        e.preventDefault()
        let username = e.target.search.value

        fetch(`https://api.github.com/search/users?q=${username}`)
            .then(res=>res.json())
            .then(data =>renderResults(data))
        })
    )


function renderResults(users){
    let result = users.items[0].login
    let avatar = users.items[0].avatar_url

    let usernameLink  = document.createElement('a')
    let clickableName =document.createTextNode(result)
        usernameLink.appendChild(clickableName)

       usernameLink.addEventListener('click', ()=>{
            fetch(`https://api.github.com/users/${result}/repos`)
                .then(res=>res.json())
                .then(userRepos=>renderUserRepos(userRepos))
        })
    
    let avatarImage = document.createElement('img')
        avatarImage.src = avatar

    let userUrl = document.createElement('a')
    let link = document.createTextNode("Link to Profile")
        userUrl.appendChild(link)
        userUrl.href = `https://github.com/${result}`

        document.getElementById('github-container').append(usernameLink, avatarImage, userUrl)
    }

function renderUserRepos(repos){
    repos.forEach(repo => {
        let repoList = document.getElementById('repos-list')
        let repoItem = document.createElement('li')
            repoItem.innerText=repo.name
            repoList.appendChild(repoItem)
})
}