function validateLoginTime() {
    let now = new Date();
    let hours = now.getHours();

    if (hours < 8 || hours >= 9) {
        alert("Login allowed only between 8 AM and 9 AM.");
        return false; // Prevents login action
    }
    return true; // Allows login action
}

function validateLoginDateTime1() {
    let now = new Date();
    let allowedDateTime = new Date("2025-05-11T11:32:15");

    if (now < allowedDateTime) {
        alert("Login is only allowed after 11th May 2025, 11:32:15 AM.");
        return false; // Prevent login action
    }
    return true; // Allows login action
}

function isUnderMaintenance() {
    let now = new Date();
    let hours = now.getHours();

    if (hours >= 8 && hours < 11) {
        alert("Website is under maintenance from 8 AM to 11 AM. Please try again later.");
        return false; // Maintenance mode active
    }
    return true; // Login allowed
}

function isUnderMaintenance1() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Maintenance from 12:10 AM to 12:35 AM
    if (hours === 0 && minutes >= 10 && minutes < 35) {
        alert("Website is under maintenance from 12:10 AM to 12:35 AM. Please try again later.");
        return true; // Maintenance mode active
    }
    return false; // Login allowed
}

function isUnderMaintenance2() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Maintenance period: 12:10 AM to 1:35 AM
    if (hours === 0 && minutes >= 10 || (hours === 1 && minutes < 35)) {
        alert("Website is under maintenance from 12:10 AM to 1:35 AM. Please try again later.");
        return true; // Maintenance mode active
    }
    return false; // Login allowed
}

function isUnderMaintenance3() {
    let now = new Date();
    let maintenanceStart = new Date("2025-05-11T00:00:00");
    let maintenanceEnd = new Date("2025-05-11T23:00:00");

    if (now >= maintenanceStart && now < maintenanceEnd) {
        alert("Website is under maintenance from May 11, 2025, 12:00 AM to 11:00 PM. Please try again later.");
        return true; // Maintenance mode active
    }
    return false; // Login allowed
}
function isUnderMaintenance4() {
    let now = new Date();
    let maintenanceStart = new Date("2025-05-11T08:00:00");
    let maintenanceEnd = new Date("2025-05-12T08:00:00");

    if (now >= maintenanceStart && now < maintenanceEnd) {
        alert("Website is under maintenance from May 11, 2025, 8:00 AM to May 12, 2025, 8:00 AM. Please try again later.");
        return true; // Maintenance mode active
    }
    return false; // Login allowed
}

function isLoginAllowed() {
    let now = new Date();
    let loginStart = new Date("2025-05-11T08:00:00");
    let loginEnd = new Date("2025-05-12T08:00:00");

    if (now < loginStart || now >= loginEnd) {
        alert("Login is allowed only from May 11, 2025, 8 AM to May 12, 2025, 8 AM.");
        return false; // Prevent login action
    }
    return true; // Allows login action
}

function isLoginAllowed1() {
    let now = new Date();
    let loginStart = new Date("2025-05-11T08:00:00");
    let loginEnd = new Date("2025-05-11T20:00:00"); // 8 PM is 20:00 in 24-hour format

    if (now < loginStart || now >= loginEnd) {
        alert("Login is only allowed on May 11, 2025, from 8 AM to 8 PM.");
        return false; // Prevents login
    }
    return true; // Allows login
}
function or()
{
    if (!isUnderMaintenance()) {
        return; // Exit function if login time is invalid
    }
    var us = document.getElementById("log").value;
    var pw = document.getElementById("pas").value;

    if(us == "YV" && pw == "Y@V")
    {
        alert("Admin Login Successfully");
        window.open("adminh.html");
    }
    else if(us == "20250323" && pw == "arpan@2008")
        {
            alert("Operator Login Successfully");
            window.open("arpan/");
        }
    else if(us == "20250414" && pw == "ankit@2004")
        {
            alert("Operator Login Successfully");
            window.open("ankit/");
        }
        else if(us == "20250510" && pw == "anil@2003")
            {
    //             if (!validateLoginTime()) {
    //     return; // Exit function if login time is invalid
    // }
                alert("Operator Login Successfully");
                window.open("anil/");
            }
    else
    {
        alert("Admin/Operator Pless Enter Valid Id Our Password !");
    }
}
function check()
{
    var use = document.getElementById("login").value;
    var pwd = document.getElementById("password").value;

    if(use == "Dipesh" && pwd == "DK123")
    {
        alert("Student Login Successfully");
        window.open("dipeshp.html");
        // alert("પહેલા બાકી રહેલી ફી ભરો પછીજ તમે તમરી આઈડી વાપરી સકશો.");  
    }

    else if(use == "Parth" && pwd == "PP123")
    {
        alert("Student Login Successfully");
         window.open("parthpp.html");
        // alert("પહેલા બાકી રહેલી ફી ભરો પછીજ તમે તમરી આઈડી વાપરી સકશો.");
    }

    else if(use == "Kundan" && pwd =="KR123")
    {
        alert("Student Login Successfully");
        window.open("kundanp.html");
        // alert("પહેલા બાકી રહેલી ફી ભરો પછીજ તમે તમરી આઈડી વાપરી સકશો.");
    }
    else if(use == "Vikash" && pwd == "VR123")
    {
        alert("Student Login Successfully");
        window.open("vikashp.html");
        // alert("પહેલા બાકી રહેલી ફી ભરો પછીજ તમે તમરી આઈડી વાપરી સકશો.");
    }
    else
    {
        alert("Student Pless Enter Valid Id Our Password !");
    }
}

function check1()
{
    var rn1 = document.getElementById("rno").value;
    var cn1 = document.getElementById("cno").value;

    if(rn1 == "442831" && cn1 == "164873")
    {
        alert("Certificate Is Verfy");
    }
    else if(rn1 == "442831" && cn1 == "190516")
    {
        alert("Certificate Is Verfy");
    }
    else    
    {
        alert("Student Pless Enter Velid register Our Certificate No !");
    }
}
function wait()
{
    alert("પરીક્ષા ની તારીખ ના દિવસ થી તમે સર્ટિફિકેટ & માર્કશીટ ડાઉનલોડ કરી સકો છો");
} 
function logout()
{
        let text = "Are You Sourse";
        if (confirm(text) == true) {
          window.close();
        } 
}
function let()
{
    alert("The competition is over, try next time");
}