import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import "../style/galleri.css";

// Komponent som hämtar alla husdjur från Sanity
const query = `*[_type == "pet"]{
  _id,
  name,
  species,
  "imageUrl": image.asset->url,
  description,
  livesWith,
  personality,
  hobbies,
  talent
}`;

export default function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    client.fetch(query).then((data) => setPets(data));
  }, []);

  return (
    <>
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
    </>
  );
}
