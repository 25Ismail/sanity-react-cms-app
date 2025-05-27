// Testar formulärsidan för att fylla i och skicka data
describe("PetForm", () => {
  it("fyller i och skickar formuläret", () => {
    // Besök formulärsidan för att lägga till ett husdjur
    cy.visit("http://localhost:5174/sanity-react-cms-app/lagg-till");

    // Fyll i formulärfält med testdata
    cy.get('input[name="name"]').type("Fluffy");
    cy.get('input[name="species"]').type("Katt");
    cy.get('textarea[name="description"]').type("En söt katt");
    cy.get('input[name="livesWith"]').type("Familjen Johansson");
    cy.get('input[name="personality"]').type("Snäll, Lekfull");
    cy.get('input[name="hobbies"]').type("Jaga möss, Sova");
    cy.get('input[name="talent"]').type("Kurrar högt");

    // Skicka formuläret
    cy.get("form").submit();

    // Kontrollera att rätt alert visas efter inskick
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Husdjur inskickat!");
    });
  });
});

// Testar Om oss-sidan och mockar Sanity-responsen
describe("Om oss-sidan", () => {
  it("laddar och visar innehållet från Sanity", () => {
    // Mocka GET-förfrågan till Sanity om 'about'-dokumentet och svara med testdata
    cy.intercept("GET", "**/data/query/**about**", {
      statusCode: 200,
      body: {
        result: {
          title: "Test Om oss",
          content: "Detta är testinnehåll från mock.",
        },
      },
    }).as("getAbout");

    // Besök Om oss-sidan
    cy.visit("http://localhost:5174/sanity-react-cms-app/om-oss");

    // Vänta tills mock-förfrågan fångas upp
    cy.wait("@getAbout");

    // Kontrollera att rätt titel och innehåll visas från mock-data
    cy.get(".about-title").should("contain", "Test Om oss");
    cy.get(".about-content").should(
      "contain",
      "Detta är testinnehåll från mock."
    );
  });
});

// Testar Startsidan (PetList) och mockar Sanity-responsen
describe("Startsidan - PetList", () => {
  it("laddar startsidan och visar husdjurslistan", () => {
    // Mocka GET-förfrågan till Sanity om 'pet'-dokument och svara med test-husdjur
    cy.intercept("GET", "**/data/query/**pet**", {
      statusCode: 200,
      body: {
        result: [
          {
            _id: "1",
            name: "TestDjur",
            species: "Katt",
            imageUrl: "https://via.placeholder.com/150",
            description: "Testbeskrivning",
            livesWith: "TestFamilj",
            personality: ["Snäll", "Lugn"],
            hobbies: ["Sova", "Äta"],
            talent: "Snarka",
          },
        ],
      },
    }).as("getPets");

    // Besök startsidan
    cy.visit("http://localhost:5174/sanity-react-cms-app/");

    // Vänta tills mock-förfrågan fångas upp
    cy.wait("@getPets");

    // Kontrollera att rubriken och minst ett husdjur visas
    cy.contains("Alla husdjur").should("exist");
    cy.get(".pet-card").should("have.length.at.least", 1);
  });
});
