## Projekt: Husdjursgalleri

Husdjursgalleri är en webbapplikation byggd med React och Sanity (Headless CMS). Applikationen presenterar ett galleri över olika husdjur där användare kan se, läsa om och lägga till nya djur.

## Installation och körning

För att köra projektet lokalt krävs Node.js och npm installerat.

### 1. Klona projektet

```bash
git clone https://github.com/25Ismail/sanity-react-cms-app.git
```
```bash
cd santiy-react-cms-app/frontend
```
```bash
npm install
```
```bash
npm run dev
```

## För att köra enhetstester med Vitest:

```bash
npm run test
```
Om ni även kör Sanity-studion lokalt, gå in i CMS-mappen och starta den:

```bash
cd ../husdjursgalleri
sanity dev
```
---

## React-struktur

Projektet är uppbyggt i React med `react-router-dom` för routing. Applikationen består av flera sidokomponenter: `PetList`, `PetForm` och `About`. Routing mellan sidorna sker utan omladdning av sidan via följande struktur i `App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<PetList />} />
  <Route path="/lagg-till" element={<PetForm />} />
  <Route path="/om-oss" element={<About />} />
</Routes>
```
---


## Testning

Projektet innehåller enhetstestning med hjälp av `Vitest` och `@testing-library/react`. 
Vi testar att startsidan renderas korrekt, inklusive rubriken ”Alla husdjur”, och att data hämtas och visas. Sanity-klienten mockas för att möjliggöra isolerad testning. Syftet är att säkerställa att grundläggande rendering och dataladdning fungerar som förväntat.

Testerna körs med kommandot:

```bash
npm run test
```
Ett grundläggande test är implementerat för att kontrollera att startsidan (`App.jsx`) renderar rubriken "Alla husdjur".

```js
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('visar rubriken "Alla husdjur"', () => {
    render(<App />);
    const heading = screen.getByText(/Alla husdjur/i);
    expect(heading).toBeInTheDocument();
  });
});
```
---
