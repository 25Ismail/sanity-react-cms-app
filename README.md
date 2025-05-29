# Husdjursgalleri

**Husdjursgalleri** är en webbapplikation byggd med **React** och **Sanity** (Headless CMS). Applikationen visar ett galleri över husdjur där användare kan läsa om, och lägga till egna djur via ett formulär.

---

## 🚀 Teknisk översikt

- **Frontend:** React + React Router
- **CMS (backend):** Sanity (v3)
- **Stil:** CSS
- **Routing:** `react-router-dom`
- **Testning:** Vitest (enhetstester) & Cypress (end-to-end)

---

## 📦 Installation & körning

### 1. Klona projektet

```bash
git clone https://github.com/25Ismail/sanity-react-cms-app.git
cd sanity-react-cms-app
```

### 2. Installera frontend och starta Vite

```bash
cd frontend
npm install
npm run dev
```

Frontend körs på: `http://localhost:5174/sanity-react-cms-app/`

### 3. Installera och starta Sanity CMS

```bash
cd ../husdjursgalleri
npm install
npx sanity dev
```

Sanity-studion körs på: `http://localhost:3333`
Om du behöver bygga för produktion:

```bash
npx sanity build
npx sanity start
```

---

## 🧭 React-struktur och routing

```jsx
<Routes>
  <Route path="/" element={<PetList />} />
  <Route path="/lagg-till" element={<PetForm />} />
  <Route path="/om-oss" element={<About />} />
</Routes>
```

---

## 🧪 Testning

### 🔹 Enhetstester (Vitest)

```bash
npm run test
```

Exempel:

```js
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
describe("App", () => {
  it('visar rubriken "Alla husdjur"', () => {
    render(<App />);
    expect(screen.getByText(/Alla husdjur/i)).toBeInTheDocument();
  });
});
```

### 🔹 End-to-End-tester (Cypress)

```bash
npx cypress run
npx cypress open
```

Exempel:

```js
describe("PetForm", () => {
  it("fyller i och skickar formuläret", () => {
    cy.visit("/lagg-till");
    cy.get('input[name="name"]').type("Fluffy");
    cy.get("form").submit();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Husdjur inskickat!");
    });
  });
});
```

För att även testa About och PetList, se till att du mockar API-respons eller har testdata i Sanity.

---

## 🗂️ Sanity-schemas

### about.js

```js
export default {
  name: "about",
  title: "Om oss",
  type: "document",
  fields: [
    { name: "title", title: "Titel", type: "string" },
    { name: "content", title: "Innehåll", type: "text" },
  ],
};
```

### pet.js

```js
export default {
  name: "pet",
  title: "Husdjur",
  type: "document",
  fields: [
    { name: "name", title: "Namn", type: "string" },
    { name: "species", title: "Art", type: "string" },
    { name: "image", title: "Bild", type: "image", options: { hotspot: true } },
    { name: "description", title: "Beskrivning", type: "text" },
    { name: "livesWith", title: "Bor med", type: "string" },
    {
      name: "personality",
      title: "Personlighet",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "hobbies",
      title: "Favoritsysslor",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "talent", title: "Talang", type: "string" },
  ],
};
```

---
📝 Om oss-sidan – React + useState
Om oss-sidan (About.jsx) är en enkel och dynamisk informationssida som presenterar vad Husdjursgalleri är. Innehållet hämtas från Sanity via en query, och visas automatiskt på sidan tack vare Reacts useState och useEffect.

Syfte:
Att ge besökaren en tydlig introduktion till vad Husdjursgalleri handlar om – en gemenskap för alla djurälskare, med möjlighet att läsa och dela historier om sina husdjur.

Så fungerar det:

jsx
Kopiera
Redigera
const [aboutData, setAboutData] = useState(null);

useEffect(() => {
  client
    .fetch(`*[_type == "about"][0]`)
    .then((data) => setAboutData(data))
    .catch(console.error);
}, []);
useState skapar ett tillstånd (aboutData) där innehållet från Sanity lagras.

useEffect körs när komponenten laddas, hämtar datan och uppdaterar tillståndet.

När aboutData har ett värde, renderas innehållet direkt i gränssnittet.

Exempel på rendering:

jsx
Kopiera
Redigera
{aboutData && (
  <section className="about">
    <h1>{aboutData.title}</h1>
    <p>{aboutData.description}</p>
  </section>
)}
🧠 Fördelar:
Det här gör sidan lätt att uppdatera via Sanity – inga kodändringar krävs för att justera texten.

## ✅ Sammanfattning

| Funktion     | Verktyg      |
| ------------ | ------------ |
| UI           | React        |
| Routing      | React Router |
| CMS          | Sanity       |
| Enhetstester | Vitest       |
| E2E-tester   | Cypress      |

🔧 Om du stöter på problem, kontrollera att:

- Sanity-studion kör på port 3333
- Din frontend är igång
- Du har testdata i Sanity (t.ex. minst ett dokument för `about` och `pet`)
- Starta om Vite/Sanity vid behov
