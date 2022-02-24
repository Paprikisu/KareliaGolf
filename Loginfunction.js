function validate()
{
    var UserId=document.getElementsByName("Jäsennumero").nodeValue;
    var password=document.getElementsByName("Salasana").nodeValue;

    if(UserId=="1234" && password=="salasana")
    {
        alert("Sisään Kirjautuminen Onnistui")
        return false;
    }

    else
    {
        alert("Sisään Kirjautuminen Epäonnistui");
    }

}