/**
 * Webapp with Pagination
 */

/**
 * Deklaration der Variablen
 */
let index;
let member = undefined;

/**
 * Ausgabe zeigen
 */
function showUI(){
    //Member
    let htmlObj = document.getElementById("members");
    htmlObj.innerHTML =
        `Stage Name: ${member.stagename}<br>`+
        `Last Name: ${member.lastname}<br>`+
        `First Name: ${member.firstname}<br>`+
        `Birthday: ${member.birthdate}<br>`+
        `Current Age: ${member.currentage}<br>`;

//Position
    htmlObj = document.getElementById("position");
    htmlObj.innerHTML =
        `${member.position}<br>`;






    //Training
    htmlObj = document.getElementById("training");
    //clear
    htmlObj.innerHTML = "";
    //set
    member.generalinfo.training.forEach(traininginfoid => {
        htmlObj.innerHTML += `${traininginfoid}<br>`;
    });




    //Funfacts
    htmlObj = document.getElementById("funfacts");
    //clear
    htmlObj.innerHTML = "";
    //set
    let faecherListe = member.generalinfo.funfacts;
    for (let i=0;i<faecherListe.length; i++){
        htmlObj.innerHTML += `${faecherListe[i]}<br>`;
    };

    //Index im Pagination-Element zeigen
    htmlObj = document.getElementById("showIndex");
    //clear
    htmlObj.innerHTML = "";
    //set
    htmlObj.innerHTML = index;
}




/**
 * Nächster Eintrag (Record) zeigen
 */
function showNext() {
    //Index aus dem Browser-Speicher lesen
    index = localStorage.getItem("index");
    //Testausgabe auf der Console
    console.log(index);
    //Falls der index nicht definiert ist ...
    if (index == undefined){
        //... dann setze den index auf 0 (Anfang)
        index = 0;
    } else {
        //... sonst falls der index eins kleiner als das Maximum ist
        if (memberListe.length-1 > index){
            //... erhöhe den index um 1
            index++;
        }
    }
    //speichere wieder den index im Browser-Speicher
    localStorage.setItem("index", index);
    //hole den nächst höheren Eintrag
    member = memberListe[index];
    //zeige den Eintrag
    showUI();
}

/**
 *  Vorhergehender Eintrag (Record) zeigen
 */
function showPrevious() {
    //Index aus dem Browser-Speicher lesen
    index = localStorage.getItem("index");
    //Testausgabe auf der Console
    console.log(index);
    //Falls der index nicht definiert ist ...
    if (index == undefined){
        //... dann setze den index auf 0 (Anfang)
        index = 0;
    } else {
        //... sonst falls der index grösser als das Minimum ist
        if (index > 0){
            //... vermindere den index um 1
            index--;
        }
    }
    //speichere wieder den index im Browser-Speicher
    localStorage.setItem("index", index);
    //hole den nächst höheren Eintrag
    member = memberListe[index];
    //zeige den Eintrag
    showUI();
}

//start app
//Falls der index nicht definiert ist ...
if (member === undefined){
    //... dann setze den index auf 0 (Anfang)
    index = 0;
    //speichere wieder den index im Browser-Speicher
    localStorage.setItem("index", index);
    //hole den nächst höheren Eintrag
    member = memberListe[index];
    //zeige den Eintrag
    showUI();
}
