let users = JSON.parse(localStorage.getItem("users")??"[]")
function handleSignup(event){
    event.preventDefault()
    let firstname = document.getElementById("firstname").value
    let lastname = document.getElementById("lastname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let password2 = document.getElementById("confirmpassword").value
    let pTag = document.getElementById("pTag")

    if(!firstname || !lastname || !email || !password || !password2){
        let pTag = document.getElementById("pTag")
        pTag.textContent = "All fields are required*"
        pTag.style.display = "block"
    }
    else{
        if(password !== password2){
            pTag.textContent = "Passwords do not match*"
            pTag.style.display = "block"
            return
        }
        else{
            let filteredArr = users.filter((ele)=>ele.email == email)
            if(filteredArr.length>0){
                pTag.textContent = "User already exists!!"
                pTag.style.display = "block"
                return
            }
            else{
                let user = {firstname:firstname,lastname:lastname,email:email,password:password}
                users.push(user)
                localStorage.setItem("users",JSON.stringify(users))
                pTag.textContent = ""
                pTag.style.display="none"
                firstname=""
                lastname=""
                email=""
                password=""
                password2=""
                window.location.href ="../login/index.html"
            }
        }
    }

}