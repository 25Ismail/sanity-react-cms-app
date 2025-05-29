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
### 📝 Om oss-sidan – React + useState
Om oss-sidan (About.jsx) är en enkel och dynamisk informationssida som presenterar vad Husdjursgalleri är. Innehållet hämtas från Sanity via en query, och visas automatiskt på sidan tack vare Reacts useState och useEffect.

## Syfte:
Att ge besökaren en tydlig introduktion till vad Husdjursgalleri handlar om – en gemenskap för alla djurälskare, med möjlighet att läsa och dela historier om sina husdjur.

## Så fungerar det:

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

### Exempel på rendering:

{aboutData && (
  <section className="about">
    <h1>{aboutData.title}</h1>
    <p>{aboutData.description}</p>
  </section>
)}

---




# 🐶 Lägg till husdjur – PetForm-komponenten med useState
🔹PetForm.jsx är det formulär där användaren kan lägga till ett nytt husdjur i galleriet. Formuläret använder Reacts useState-hook för att hantera innehållet i alla fält, samt skicka datan till Sanity när formuläret skickas in.





## Syfte:
🔹Att möjliggöra användarinteraktion där man själv kan bidra till husdjursgalleriet genom att fylla i och skicka in information om sitt eget husdjur.





## Så fungerar det:

```js const [formData, setFormData] = useState({
name: '',
species: '',
  description: '',
  livesWith: '',
  personality: '',
  hobbies: '',
  talent: ''
})
```
🔹Här skapas ett tillståndsobjekt formData med alla fält i formuläret. Varje gång användaren skriver något i ett fält uppdateras tillståndet med hjälp av setFormData.

```const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}
```
🔹Vid inskickning konverteras fält som personality och hobbies till arrayer innan datan skickas till Sanity:

```const doc = {
  _type: 'pet',
  name: formData.name,
  species: formData.species,
  description: formData.description,
  livesWith: formData.livesWith,
  personality: formData.personality.split(',').map(s => s.trim()),
  hobbies: formData.hobbies.split(',').map(s => s.trim()),
  talent: formData.talent
}

await client.create(doc)
```
## 🧠 Fördelar:
-Alla formulärfält är kopplade till useState, vilket ger full kontroll över innehållet.

-Formuläret återställs automatiskt efter att husdjuret skickats in.

-Dataformatering (t.ex. konvertering till arrayer) sker innan lagring i Sanity.

---

# 🐾 Visa husdjur – PetList-komponenten med useState och useEffect

🔹`PetList.jsx` är komponenten som hämtar och visar alla husdjur från Sanity. Den använder Reacts `useState` för att lagra listan av husdjur och `useEffect` för att hämta datan när komponenten laddas.

## Syfte:
🔹Att visa ett dynamiskt galleri med alla husdjur som finns i databasen.

## Så fungerar det:

```js
const [pets, setPets] = useState([]);

useEffect(() => {
  client.fetch(query).then((data) => setPets(data));
}, []);
```
🔹Här skapas ett tillstånd `pets` som innehåller alla husdjur. När komponenten laddas hämtas datan från Sanity och lagras i `pets`.

### Rendering av galleriet:

```jsx
<section className="pets-container">
  <h2>Alla husdjur</h2>
  <div className="pets-grid">
    {pets.map((pet) => (
      <div key={pet._id} className="pet-card">
        {pet.imageUrl && (
          <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
        )}
        <div className="pet-info">
          <h3>
            {pet.name} ({pet.species})
          </h3>
          <p>
            <strong>Beskrivning:</strong> {pet.description}
          </p>
          <p>
            <strong>Bor med:</strong> {pet.livesWith}
          </p>
          <p>
            <strong>Personlighet:</strong> {pet.personality?.join(", ")}
          </p>
          <p>
            <strong>Favoritsysslor:</strong> {pet.hobbies?.join(", ")}
          </p>
          <p>
            <strong>Talang:</strong> {pet.talent}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
```

🔹Varje husdjur renderas som ett kort med bild och information, och all styling hanteras i `galleri.css`.

---

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
