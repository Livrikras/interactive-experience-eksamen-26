# README

## 1. Validering

Vi har brugt "W3C CSS Validation Service" og "W3C Markup Validation Service"

- Vi har ingen Warnings og ingen Errors

#### HTML:

> index.html
> ![html-validation](img/html-validator-index.png)

> projection.html
> ![html-validation](img/html-validator-projection.png)

#### CSS:

> style.css
> ![css-validation](img/css-validator.png)

## 2. Collaborations

- Projektet er udviklet i fællesskab gennem GitHub med i alt ca. -- commits
- Vi har arbejdet med push og pull for at sikre en struktureret udviklingsproces
- Vi har løbende testet og gennemgået koden
- Vi har delt opgaver ud på baggrund af interesse og kompetencer. Men alle medlemmer har bidraget til idéudvikling, design og udførslen

### eksempler på commits

- if else betingelser som tilføjer klasser til kortene
- ny css fil oprettet for at ændre baggrund på projection.html
- styling af tilbage knap

![list over medlemmer](img/contributors.png)

## 3. Web konventioner

når man udvikler webprojekter, er det vigtigt at navngive filer og mapper korrekt samt organisere projektet på en overskuelig måde. Det gør at projektet er lettere at vedligeholde. I vores projekt har vi navngivet alle filer og mapper med små bogstaver. Derudover har ikke mellemrum eller danske specialtegn som æ, ø og å. Vi har anvendt en konsekvent navngivningsstruktur, for at gøre det lettere for os at samarbejde. Det giver også ensartethed.

## 4. Navne på mapper og filer

Vi har anvendt beskrivende og unikke navne på mapper og filer, så deres funktion fremgår tydeligt. Vi har brugt kebab case til navngivning af billeder og videofiler, for at undgå mellemrum og store bogstaver.

eksempler:

- `frits-albert-florentinus-strand.png`
- `projection.html`

## 5. Fil- og mappestruktur

for at skabe overblik over projektet har vi organiseret filerne i mapper efter deres funktion

```
interactive-experience
│
├── css
│   ├── projection.css
│   └── style.css
│
├── img
│
├── js
│   ├── screen.js
│   └── script.js
│
├── video
│
├── index.html
├── projection.html
├── README.md
└── .gitattributes
```

Mapperne indeholder:

**css/**
indeholder projektets stylesheets

**img/**
indeholder billeder, kunstværker og grafiske elementer

**js/**
indeholder JavaScript filerne, som styrer funktionaliteten i oplevelsen

**video/**
indeholder videofiler til de forskellige kunstværker

## 6. Navne på variable og funktioner

Vi har navngivet variablerne og funktionerne ud fra deres formål i programmet. Dette gør koden mere læsbar og lettere at forstå for os, som en gruppe. 

Eksempel:


```js 
const artScreen;
```
indeholder data om kunstværkerne i installationen. 

```js
let projectionWindow;
```
referer til projektvinduet, hvor videoerne afspilles.
Vi har konsekvent anvendt camelCase til JavaScript-variabler og funktioner, hvor det første ord skrives med lille begyndelsesbogstav og efterfølgende ord starter med stort bogstav

Eksempler:

```js
currentLanguage
selectedVideo
openProjectionWindow()
showStopProjectionButton()
```
Det gør koden lettere at læse og forstå

- Vi har dog brugt kebab case til classes i html og css

## 7. Fremhævet kode

### Kodeeksempel 1
```js 

// Åbn eller genåbn projektionsvinduet hvis det er lukket
function openProjectionWindow() {
  if (!projectionWindow || projectionWindow.closed) {
    projectionWindow = window.open(
      "projection.html",
      "_blank",
      "width=1000, height=700",
    );
  }

  return projectionWindow;
}
```
Denne funktion åbner projektionsvinduet, hvis det ikke allerede er åbent. Hvis vinduet allerede eksisterer, genbruges det i stedet for at åbne et nyt. Funktionen er central for løsningen, da den skaber forbindelsen mellem brugergrænsefladen og projektionen. På den måde sikrer vi, at brugeren altid sender indhold til det samme projektionsvindue


### Kodeeksempel 2

```js 

// Åbn og afspil video når kunstnerportrættet klikkes
  wrapper.addEventListener("click", () => {
    const selectedVideo =
      currentLanguage === "en" ? item.videoEN : item.videoDK;

    localStorage.setItem("selectedPortrait", selectedVideo);

    const win = openProjectionWindow();

    if (win && !win.closed) {
      win.postMessage(
        {
          video: selectedVideo,
        },
        "*",
      );

      showStopProjectionButton();
    }
  });
  // tilføjer wrapper til næste i rækken
  gallery.appendChild(wrapper);
  });
```
Denne kode registrerer når brugeren klikker på et kunstværk i carouselen. Først undersøger programmet, hvilket sprog brugeren har valgt. Derefter vælges den korrekte videofil og gemmes i localstorage. Til sidst sendes videofilen til projektionsvinduet ved hjælp af `postMessage()`. Koden er også en af de vigtigste dele af løsningen, da den forbinder brugerens valg på skærmen med den video, der afspilles på projektionen. Dermed skabes den interaktive oplevelse, hvor brugeren aktivt påvirker installationens indhold

## 8. ORCA-model

I vores ORCA-model har vi haft fokus på at skrive objekter der spiller en central rolle i vores museumsinstallation.
Hvert objekt har en række attributter, der beskriver dets egenskaber.

de centrale objekter:

- Portræt
- Lys
- Skærm
- Projektor
- Rum
- Brugeren
- Lyd
- Sprog
- Beskrivelse

Vi har brugt ORCA-modellen til at definere portrætterne i projektet. Hvert portræt er som et objekt i vores JavaScript, som er blevet lavet i et array. Attributterne bliver til egenskaber såsom kunstner, årstal, materiale, img, videofil og beskrivelse.

### Mapping mellem ORCA og JavaScript

ORCA-modellen fungerede som grundlag for vores JavaScript datastruktur. Objektet **Portræt** blev omsat til JavaScript objekter i arrayet `artScreen`, mens attributterne blev omsat til properties.

Eksempelvis blev attributter som kunstner, årstal, materiale, beskrivelse og videofiler omsat til:

- `name`
- `year`
- `medium`
- `description`
- `descriptionEN`
- `videoDK`
- `videoEN`

Denne mapping gjorde det muligt at skabe en tydelig sammenhæng mellem konceptudviklingen, informationsarkitekturen og den tekniske implementering.
```
js
"use strict";

const artScreen = [
  {
    id: 1,
    image: "img/frits-albert-florentinus-strand.png",
    name: "Frits A. F. Strand",
    year: "1853-1936",
    medium: "Olie på lærred",
    mediumEN: "Oil on canvas",
    size: "56x49 cm",
    description: "Frits A. F. Strands Motiver fremstår spontane og livlige, og kunstneren placerer ofte sig selv i centrum af sine billeder. Portrættet viser et enkelt og højtideligt udtryk, hvor fortællingen er vigtigere end den teknisk korrekte gengivelse.",
    descriptionEN: "Frits A. F. Strand's motifs appear spontaneous and lively, and the artist often places himself at the center of his paintings. The portrait shows a simple and solemn expression, where the narrative is more important than the technically correct representation.",
    videoDK: "video/frits-dansk.test.mp4",
    videoEN: "video/frits-engelsk.test.mp4",
  }
];
```

## 9. JavaScript datastruktur

For at organisere indholdet i installationen har vi valgt at anvende et array af JavaScript-objekter.

Hvert objekt repræsenterer ét kunstværk og indeholder alle de oplysninger, som bruges i brugergrænsefladen og på projektionen. Datastrukturen fungerer derfor som projektets centrale datakilde.

Ved at samle alle oplysninger ét sted bliver det lettere at vedligeholde og udvide løsningen. Hvis et nyt kunstværk skal tilføjes, kan dette gøres ved blot at oprette et nyt objekt i arrayet.

### Datatyper

Vi anvender flere forskellige datatyper i projektet:

**Array**  
Anvendes til at samle alle kunstværker i datastrukturen.

**Object**  
Hvert kunstværk repræsenteres som et objekt med tilhørende egenskaber.

**String**  
Anvendes til kunstnernavne, beskrivelser, materialer, billedstier og videostier.

**Number**  
Anvendes til ID-numre, så hvert kunstværk kan identificeres entydigt.

**Boolean**  
Anvendes ved logiske kontroller og betingelser i programmet.

**Function**  
Anvendes til at udføre handlinger såsom afspilning af video, opdatering af carousel og sprogskift.

**Null**  
Anvendes som standardværdi, når en værdi endnu ikke er defineret.


## 10. Kommentare

Kommentare kan ikke ses på webbrowseren, vi har brugt kommentare til at forstærke læsbarheden af selve koden for andre. Hvilket også har gjort det lettere at samarbejde i gruppen, så alle forstår hvad koden bliver brugt til. De er allesammen på Dansk

Eksempel: 

```
js

// læser værdi ved localstorage i karrusel

let currentIndex = Number(localStorage.getItem("carouselIndex"));

if (!Number.isFinite(currentIndex)) {
  currentIndex = 0;
}
```
## 11. localStorage

For at skabe en mere dynamisk brugeroplevelse har vi anvendt browserens `localStorage`. localStorage gør det muligt at gemme data lokalt i browseren, så information kan bevares mellem forskellige dele af løsningen.

I vores projekt anvendes localStorage blandt andet til at gemme brugerens valg af portræt og position i carouselen. Dette gør det muligt at videreføre information mellem brugergrænsefladen og projektionsvinduet.

Når brugeren vælger et portræt, gemmes den tilhørende videofil i localStorage:

```js
localStorage.setItem("selectedPortrait", selectedVideo);
```

Den gemte værdi kan efterfølgende hentes og bruges til at vise det korrekte indhold:

```js
let currentIndex = Number(
  localStorage.getItem("carouselIndex")
);
```

Ved at anvende localStorage opfylder løsningen kravet om persistens, da brugerens valg kan gemmes og genanvendes under oplevelsen. Dette bidrager til en mere sammenhængende og personlig interaktion med installationen.

### Anvendte localStorage-værdier

- `selectedPortrait` – gemmer den valgte videofil.
- `carouselIndex` – gemmer brugerens position i carouselen.
- `currentLanguage` – gemmer det valgte sprog (hvis I bruger dette).

localStorage fungerer derfor som et vigtigt bindeled mellem brugerens handlinger og den dynamiske tilpasning af indholdet i installationen.

## 12. JavaScript bibliotek

Projektet er udviklet ved hjælp af HTML, CSS og Vanilla JavaScript.

Vi har valgt ikke at anvende tredjeparts JavaScript biblioteker, da projektets funktionalitet kunne implementeres ved hjælp af standard JavaScript. Dette har givet os større kontrol over funktionaliteten i løsningen.

Vi har blandt andet arbejdet med:

- EventListeners
- localStorage
- postMessage()
- DOM Manipulation
- Dynamisk rendering

Disse har gjort det muligt at skabe en interaktiv installation, hvor brugerens valg påvirker det indhold, der vises på projektionen.

> Link til GitHub Repository:
> https://github.com/Livrikras/interactive-experience-eksamen-26.git

> Link til GitHub pages:

    https://livrikras.github.io/interactive-experience-eksamen-26/

![Github](img/github.png)
