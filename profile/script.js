let currUser = localStorage.getItem("currUser")?JSON.parse(localStorage.getItem("currUser")):""
if(!currUser){
    window.location.href = "../login/index.html"
}
function handleSaveInfo(){
    let users = JSON.parse(localStorage.getItem("users"))
    let firstname = document.getElementById("firstname")
    let lastname = document.getElementById("lastname")
    let message = document.getElementById("message")
    users.map((ele)=>{
        if(ele.email == currUser.email){
            ele.firstname = firstname.value
            currUser.firstname = firstname.value
            ele.lastname = lastname.value
            currUser.lastname = lastname.value
        }
    })
    firstname.value = ""
    lastname.value =""
    localStorage.setItem("users",JSON.stringify(users))
    localStorage.setItem("currUser",JSON.stringify(currUser))
    message.style.display = "block"
    message.style.color = "green"
    message.textContent = "Save successfully"
}
function handleChangePassword(event){
    event.preventDefault()
    let users = JSON.parse(localStorage.getItem("users"))
    let oldpassword = document.getElementById("oldpassword")
    let newpassword1 = document.getElementById("newpassword1")
    let newpassword2 = document.getElementById("newpassword2")
    let message = document.getElementById("message2")
    if(oldpassword.value !== currUser.password){
        message.style.display = "block"
        message.style.color = "red"
        message.textContent = "Old password is incorrect"

    }else if(newpassword1.value !== newpassword2.value){
        message.style.display = "block"
        message.style.color = "red"
        message.textContent = "Both new passwords are not equal"
    }
    else{
        users.map((ele)=>{
            if(ele.email == currUser.email){
                ele.password = newpassword1.value
                currUser.password = newpassword1.value
            }
        })
        oldpassword.value = ""
        newpassword1.value =""
        newpassword2.value=""
        localStorage.setItem("users",JSON.stringify(users))
        localStorage.setItem("currUser",JSON.stringify(currUser))
        message.style.display = "block"
        message.style.color = "green"
        message.textContent = "Password changed successfully"
    }
 
}
function handleLogout(){
    localStorage.removeItem("currUser")
    window.location.href = "../login/index.html"
}

