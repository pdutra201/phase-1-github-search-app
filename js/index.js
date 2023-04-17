document.addEventListener("DOMContentLoaded", () => {
    let formBtn = document.querySelector("form")
    let users = document.querySelector("#user-list")
    formBtn.addEventListener("submit", (e) => {
        e.preventDefault()
        users.innerHTML = ""
        console.log(e.target[0].value)
        fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(resp => resp.json())
        .then(obj => obj.items.forEach(item => printUsers(item)))
        formBtn.reset()
       
    })

    function printUsers(obj){
        let newUser = document.createElement("li")
        let avatar = document.createElement("img")
        let url = document.createElement("a")
        let userId = document.createElement("h2")
        let spacer =  document.createElement("hr")
        avatar.src = `${obj.avatar_url}`
        avatar.style.height = 40
        url.href = `${obj.url}`
        url.textContent = obj.url
        userId.textContent = obj.login
        newUser.appendChild(avatar)
        newUser.appendChild(userId)
        newUser.appendChild(url) 
        newUser.appendChild(spacer)  
        users.appendChild(newUser)
        newUser.addEventListener("click", (e) =>{
            let repoList = document.querySelector("#repos-list")
            let title = document.createElement('h3')
            repoList.appendChild(title)
            title.textContent = "Repos:"           
            users.innerHTML = ""
            avatar.src = `${obj.avatar_url}`
            avatar.style.height = 40
            url.href = `${obj.url}`
            url.textContent = obj.url
            userId.textContent = obj.login
            newUser.appendChild(avatar)
            newUser.appendChild(userId)
            newUser.appendChild(url) 
            newUser.appendChild(spacer)  
            users.appendChild(newUser)
            fetch(`https://api.github.com/users/${e.target.textContent}/repos`)
            .then(resp => resp.json())
            .then(obj => obj.forEach(obj => {
                    
                    
                    let repoName =  document.createElement("li")
                    repoName.textContent = obj.name
                    repoList.appendChild(repoName)
    
                }))
            })
            
        }

    })


