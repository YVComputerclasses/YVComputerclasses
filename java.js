
function check()
{
    var use = document.getElementById("login").value;
    var pwd = document.getElementById("password").value;

    if(use == "Dipesh" && pwd == "D123")
    {
        alert("Login Successfully");
        window.open("dipeshh.html");
        
    }
    else if(use == "Riya" && pwd == "R123")
    {
        alert("Login Successfully");
        window.open("riyaph.html");
    }
    else if(use == "Parth" && pwd == "P123")
    {
        alert("Login Successfully");
        window.open("parthph.html");
    }
    else if(use == "Vraj" && pwd == "V123")
    {
        alert("Login Successfully");
        window.open("vrajh.html");
    }
    else
    {
        alert("Invalid Password !");
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
        alert("Chek Your Number");
    }
}
