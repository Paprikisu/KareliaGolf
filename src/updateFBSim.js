import { db } from "./firebase"

// Tämä funktio päivittää firestoren simulaatiotaulukon täysin vapaaksi varauksista -- Kutsutaan accountmngpg:lla

const weeklySimUpdate = () => {
    let collection = db.collection("Simulaatiotaulukko")

    collection.doc("Varausrivi 1").set({
        Aika: "6:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 11").set({
        Aika: "6:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 12").set({
        Aika: "7:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 13").set({
        Aika: "7:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 14").set({
        Aika: "8:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 15").set({
        Aika: "8:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 16").set({
        Aika: "9:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 17").set({
        Aika: "9:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 18").set({
        Aika: "10:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 19").set({
        Aika: "10:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 2").set({
        Aika: "11:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 21").set({
        Aika: "11:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 22").set({
        Aika: "12:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 23").set({
        Aika: "12:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 24").set({
        Aika: "13:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 25").set({
        Aika: "13:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 26").set({
        Aika: "14:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 27").set({
        Aika: "14:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 28").set({
        Aika: "15:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 29").set({
        Aika: "15:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 3").set({
        Aika: "16:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 31").set({
        Aika: "16:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 32").set({
        Aika: "17:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 33").set({
        Aika: "17:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 34").set({
        Aika: "18:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 35").set({
        Aika: "18:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 36").set({
        Aika: "19:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 37").set({
        Aika: "19:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 38").set({
        Aika: "20:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 39").set({
        Aika: "20:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 4").set({
        Aika: "21:00",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })
    collection.doc("Varausrivi 41").set({
        Aika: "21:30",
        Maanantai: "Vapaa",
        Tiistai: "Vapaa",
        Keskiviikko: "Vapaa",
        Torstai: "Vapaa",
        Perjantai: "Vapaa"
    })


}
export {weeklySimUpdate};