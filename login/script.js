function generateToken(){
    return Math.random().toString()
}
function handleLogin(event){
    event.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let pTag = document.getElementById("loginpage-error")
    console.log(email,password)
    if(!email || !password){
        pTag.style.display = "block"
        pTag.textContent = "Fields should not be empty"
        console.log("true")
        return
    }
    else{
        let users = JSON.parse(localStorage.getItem("users")??"[]")
        if(users.length >0){
            let user = users.filter((ele)=>ele.email == email)
            if(user.length>0){
                let obj = user[0]
                if(obj.password == password){
                    localStorage.setItem("currUser",JSON.stringify({
                        ...obj,
                        token:generateToken()
                    }))
                    localStorage.setItem("isloggedin","true")
                    email.value = ""
                    password =""
                    pTag.textContent =""
                    pTag.style.display = "none"
                    window.location.href = "../profile/index.html"
                }
                else{
                    pTag.style.display = "block"
                    pTag.textContent = "Wrong Password"
                }
            }
            else{
                pTag.style.display = "block"
                pTag.textContent = "User Not found. Please Sign Up"
                return
            }
        }
        else{
            pTag.style.display = "block"
            pTag.textContent = "User Not found. Please Sign Up"
            return
        }
    }
}