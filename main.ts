input.onPinPressed(TouchPin.P0, function () {
    antwortliste.push(1)
    basic.setLedColor(0xff0000)
    basic.pause(1000)
    basic.turnRgbLedOff()
})
input.onPinPressed(TouchPin.P3, function () {
    antwortliste.push(4)
    basic.setLedColor(0xffff00)
    basic.pause(1000)
    basic.turnRgbLedOff()
})
function pruefe_Eingabe () {
    for (let Index = 0; Index <= level; Index++) {
        if (farbliste[Index] != antwortliste[Index]) {
            return false
        }
    }
    return true
}
/**
 * Pin 0 - Pin 3:  Antwort-Farbkombination eingeben
 */
input.onButtonPressed(Button.A, function () {
    for (let Index = 0; Index <= level; Index++) {
        if (farbliste[Index] == 1) {
            basic.setLedColor(0xff0000)
        } else if (farbliste[Index] == 2) {
            basic.setLedColor(0x0000ff)
        } else if (farbliste[Index] == 3) {
            basic.setLedColor(0x00ff00)
        } else if (farbliste[Index] == 4) {
            basic.setLedColor(0xffff00)
        }
        basic.pause(1000)
        basic.turnRgbLedOff()
        basic.pause(1000)
    }
    basic.turnRgbLedOff()
})
input.onPinPressed(TouchPin.P2, function () {
    antwortliste.push(3)
    basic.setLedColor(0x00ff00)
    basic.pause(1000)
    basic.turnRgbLedOff()
})
input.onPinPressed(TouchPin.P1, function () {
    antwortliste.push(2)
    basic.setLedColor(0x0000ff)
    basic.pause(1000)
    basic.turnRgbLedOff()
})
/**
 * Spiel "Farbenraten": Startbedingungen
 * 
 * maximal 8 Level = Die Farben werden nacheinander angezeigt. Level 1 = eine Farbe bis Level 8 = acht Farben
 * 
 * (rot = 1 -> Pin 0, blau = 2 -> Pin 1, grün = 3 -> Pin 2, gelb = 4 -> Pin 3)
 * 
 * Die Farben werden über die Zahlen zufällig bestimmt und in einem Feld (engl.: array) 'farbliste' gespeichert.
 */
/**
 * Die Farben werden nacheinander mit der RGB-LED angezeigt.
 */
let antwortliste: number[] = []
let farbliste: number[] = []
let level = 0
level = 0
let alles_richtig = true
farbliste = []
antwortliste = []
for (let index = 0; index < 8; index++) {
    farbliste.push(randint(1, 4))
}
/**
 * Spielablauf:
 * 
 * Wenn Level = Anzahl eingegebener Farben ist, dann wird die Farbliste mit der Antwortliste Element für Element verglichen (-> Funktionsaufruf: 'prufe_Eingabe').
 * 
 * Wenn alles richtig war, wird der Level erhöht und die Antwortliste gelöscht. Wenn ein Fehler gemacht wurde, wird das Spiel beendet.
 */
basic.forever(function () {
    if (level + 1 == antwortliste.length) {
        if (pruefe_Eingabe()) {
            basic.showIcon(IconNames.Yes)
            level += 1
            if (level > 7) {
                basic.showString("Spiel gewonnen!")
                control.reset()
            }
            antwortliste = []
            basic.pause(1000)
            basic.showString("" + (level + 1))
            basic.pause(1000)
            basic.clearScreen()
        } else {
            basic.showIcon(IconNames.No)
            basic.showString("verloren Spielende!")
            control.reset()
        }
    }
})
