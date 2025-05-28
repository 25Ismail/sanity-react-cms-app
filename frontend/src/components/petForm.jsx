import '../style/PetForm.css';
// Importerar Reacts useState-hook för att hantera formulärets tillstånd
import { useState } from 'react'

// Importerar Sanity-klienten – används för att skicka data till Sanity
import { client } from '../sanity/client'

// Komponent för formuläret
export default function PetForm() {
  // useState skapar ett state-objekt för att lagra formulärets fält
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    description: '',
    livesWith: '',
    personality: '',
    hobbies: '',
    talent: ''
  })

  // Hanterar när användaren skriver i ett input-fält
  const handleChange = (e) => {
    const { name, value } = e.target
    // Uppdaterar rätt fält i state baserat på input:ens "name"
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Hanterar formulärets inskickning
  const handleSubmit = async (e) => {
    e.preventDefault() // Förhindrar sidomladdning

    // Förbereder dokumentet som ska skickas till Sanity
    const doc = {
      _type: 'pet', // Viktigt! Måste matcha dokumenttypen i ditt Sanity-schema
      name: formData.name,
      species: formData.species,
      description: formData.description,
      livesWith: formData.livesWith,
      talent: formData.talent,
      // personality och hobbies är arrays i Sanity – vi konverterar från sträng
      personality: formData.personality.split(',').map(s => s.trim()),
      hobbies: formData.hobbies.split(',').map(s => s.trim())
    }

    try {
      // Skickar dokumentet till Sanity med create()
      await client.create(doc)
      alert('Husdjur inskickat!')

      // Tömmer formuläret efter inskickning
      setFormData({
        name: '',
        species: '',
        description: '',
        livesWith: '',
        personality: '',
        hobbies: '',
        talent: ''
      })
    } catch (error) {
      console.error(error)
      alert('Något gick fel vid inskickning.')
    }
  }

  // JSX för själva formuläret
  return (
    <form onSubmit={handleSubmit} className="pet-form">
      {/* Enskilda fält kopplade till state med value + onChange */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Namn"
        required
      />

      <input
        name="species"
        value={formData.species}
        onChange={handleChange}
        placeholder="Art (t.ex. katt)"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Beskrivning"
        required
      />

      <input
        name="livesWith"
        value={formData.livesWith}
        onChange={handleChange}
        placeholder="Bor med"
      />

      <input
        name="personality"
        value={formData.personality}
        onChange={handleChange}
        placeholder="Personlighet (komma-separerat)"
      />

      <input
        name="hobbies"
        value={formData.hobbies}
        onChange={handleChange}
        placeholder="Favoritsysslor (komma-separerat)"
      />

      <input
        name="talent"
        value={formData.talent}
        onChange={handleChange}
        placeholder="Talang"
      />

      <button type="submit">Skicka in husdjur</button>
    </form>
  )
}
