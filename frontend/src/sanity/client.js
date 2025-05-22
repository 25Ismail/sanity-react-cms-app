import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '9eyz7ht7', // t.ex. 'abc123'
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})
