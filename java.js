
function check()
{
    var use = document.getElementById("login").value;
    var pwd = document.getElementById("password").value;

    if(use == "0" && pwd == "0")
    {
        alert("Admin Login Successfully");
        window.open("#");
    }
    else if(use == "Dipesh" && pwd == "DK123")
    {
        alert("Student Login Successfully");
        window.open("dipeshh.html");
        
    }
    else if(use == "Riya" && pwd == "Raa123")
    {
        alert("Student Login Successfully");
        window.open("riyaph.html");
    }
    else if(use == "Parth" && pwd == "PP123")
    {
        alert("Student Login Successfully");
        window.open("parthph.html");
    }
    else if(use == "Vraj" && pwd == "VPA123")
    {
        alert("Student Login Successfully");
        window.open("vrajh.html");
    }
    else if(use == "Man" && pwd =="MP123")
    {
        alert("Student Login Successfully");
        window.open("manh.html");
    }
    else if(use == "Dhruv" && pwd =="DM123")
    {
        alert("Student Login Successfully");
        window.open("Dhruvh.html");
    }
    else if(use == "Shubh" && pwd =="SPA123")
    {
        alert("Student Login Successfully");
        window.open("Shubhh.html");
    }
    else if(use == "Sagar" && pwd =="SB123")
    {
        alert("Student Login Successfully");
        window.open("Sagarh.html");
    }
    else if(use == "Aksh" && pwd =="APA123")
    {
        alert("Student Login Successfully");
        window.open("Akshh.html");
    }
    else if(use == "Raj" && pwd =="RB123")
    {
        alert("Student Login Successfully");
        window.open("Rajh.html");
    }
    else if(use == "Rudhra" && pwd =="RPA123")
    {
        alert("Student Login Successfully");
        window.open("Rudhrah.html");
    }
    else
    {
        alert("Pless Enter Velid Id Our Password !");
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
        alert("Pless Enter Velid register Our Certificate No !");
    }
}
function wait()
{
    alert("આ પેજ પર કામ ચાલુ છે થોડા સમય પછી પ્રયાસ કરો. || This page is a work in progress Try after some time.");
} 
