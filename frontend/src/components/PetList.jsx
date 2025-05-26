import { useEffect, useState } from 'react'
import { client } from '../sanity/client'
import "../style/galleri.css"

// Komponent som visar alla husdjur från Sanity
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
}`

export default function PetList() {
  const [pets, setPets] = useState([])

  // useEffect körs när komponenten laddas
  useEffect(() => {
    client.fetch(query).then((data) => setPets(data))
  }, [])

  // Returnerar all information om varje husdjur
  return (
    <section>
      <h2>Alla husdjur</h2>
      {pets.map((pet) => (
        <div key={pet._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{pet.name} ({pet.species})</h3>
          {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} style={{ width: '200px', height: 'auto' }} />}
          <p><strong>Beskrivning:</strong> {pet.description}</p>
          <p><strong>Bor med:</strong> {pet.livesWith}</p>
          <p><strong>Personlighet:</strong> {pet.personality?.join(', ')}</p>
          <p><strong>Favoritsysslor:</strong> {pet.hobbies?.join(', ')}</p>
          <p><strong>Talang:</strong> {pet.talent}</p>
        </div>
      ))}
    </section>
  )
}
