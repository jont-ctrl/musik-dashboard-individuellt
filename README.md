# Musiklyssnarstatistik-app

Den här applikationen gör det möjligt att visa statistik över en individs musiklyssning. Användare kan se data som exempelvis månatliga lyssnare, topplåtar, och andra relevanta musiklyssnarstatistik. Applikationen är utformad för att ge en översiktlig och interaktiv presentation av användarens musiklyssning.

## Förbättringar Individuellt Projekt

- **Dark Mode**: Lagt till en inställning för mörkt/ljust tema läge som nu sparas i `localStorage` för att behålla användarens preferenser vid nästa besök.
- **Designförbättringar**: Designen har gjorts mer konsekvent och användarvänlig, vilket ger en bättre användarupplevelse.
- **Top Track Chart**: Lagt till en lista med de 25 mest populära låtarna via LastFM API, inklusive musikens omslagsbilder.
- **Artistinformation**: Nu kan användare klicka på artistens namn för att läsa mer om deras biografi och även upptäcka liknande artister.
- **Förbättrad tillgänglighet**: Tillgängligheten för användare som navigerar med tab-tangenten har förbättrats, och det är nu tydligare när ett element är i fokus. Dessutom har ARIA-labels och roller lagts till för att ge bättre skärmläsarstöd.

## Teknologier

- **React**: Ett populärt JavaScript-bibliotek för att bygga användargränssnitt, vilket gör applikationen dynamisk och interaktiv.
- **Vite**: Ett modernt byggverktyg och utvecklingsserver som gör utvecklingsprocessen snabbare och mer effektiv.
- **Tailwind CSS**: Ett utility-first CSS-ramverk som används för att skapa responsiva och anpassade användargränssnitt.
- **Recharts**: Ett bibliotek för att skapa interaktiva och anpassningsbara diagram, som används för att visualisera användarens musikstatistik.
- **React Router**: Ett bibliotek för att hantera routing i applikationen och navigera mellan olika sidor utan att behöva ladda om sidan.

## Installation

För att komma igång med projektet, följ dessa steg:

1. **Klona detta repo**:

2. **Installera beroenden**:
   Se till att du har [Node.js](https://nodejs.org/) installerat på din dator.
   npm install

3. **Skaffa en LastFM API-nyckel**
   Gå till LastFM API och skapa ett konto.
   Skapa en applikation för att få din API-nyckel.

Skapa en fil i projektet, t.ex. src/data/keys.js.
Lägg till följande kod i filen:

const lastFMKey = 'DIN_API_NYCKEL_HÄR';
export default lastFMKey;

4. **Starta utvecklingsservern**:
   När installationen är klar kan du starta utvecklingsservern genom att köra:
   npm run dev
   Öppna sedan localhost länken i webbläsaren.
