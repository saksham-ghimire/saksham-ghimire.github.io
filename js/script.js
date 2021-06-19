function sendMail(params){
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        to_name:"Saksham Ghimire",
        contactEmail: document.getElementById("Email").value,
        message: document.getElementById("Message").value,
        subject: document.getElementById("Subject").value
    }
    console.log(tempParams)

    emailjs.send("gmail","template_7q3hlbd",tempParams)
    .then(function(res){
        document.getElementById("fromName").value = ""
        document.getElementById("Message").value = ""
        document.getElementById("Email").value = ""
        document.getElementById("Subject").value = ""
    })
}