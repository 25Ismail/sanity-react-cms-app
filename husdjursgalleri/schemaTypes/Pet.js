export default {
  name: 'pet',
  title: 'Husdjur',
  type: 'document',
  fields: [
    {name: 'name', title: 'Namn', type: 'string'},
    {name: 'species', title: 'Art', type: 'string'},
    {name: 'image', title: 'Bild', type: 'image', options: {hotspot: true}},
    {name: 'description', title: 'Beskrivning', type: 'text'},
    {name: 'livesWith', title: 'Bor med', type: 'string'},
    {
      name: 'personality',
      title: 'Personlighet',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'hobbies',
      title: 'Favoritsysslor',
      type: 'array',
      of: [{type: 'string'}],
    },
    {name: 'talent', title: 'Talang', type: 'string'},
  ],
}
