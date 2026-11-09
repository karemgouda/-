document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Dummy authentication (replace with your actual authentication logic)
    if (email === "email" && password === "password") {
        // Redirect to another page
        window.location.href = "welcome.html";
    } else {
        document.getElementById("error-msg").textContent = "Invalid email or password";
    }
});
