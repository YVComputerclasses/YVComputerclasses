
function check()
{
    var use = document.getElementById("login").value;
    var pwd = document.getElementById("password").value;

    if(use == "Dipesh" && pwd == "DK123")
    {
        alert("Login Successfully");
        window.open("dipeshh.html");
        
    }
    else if(use == "Riya" && pwd == "RPA123")
    {
        alert("Login Successfully");
        window.open("riyaph.html");
    }
    else if(use == "Parth" && pwd == "PP123")
    {
        alert("Login Successfully");
        window.open("parthph.html");
    }
    else if(use == "Vraj" && pwd == "VPA123")
    {
        alert("Login Successfully");
        window.open("vrajh.html");
    }
    else if(use == "Man" && pwd =="MP123")
    {
        alert("Login Successfully");
        window.open("manh.html");
    }
    else
    {
        alert("Pless Enter Velid Id Our Password !");
        window.open("Home.html");
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
