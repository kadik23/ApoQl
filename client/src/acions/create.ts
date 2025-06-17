import { client } from "../lib/db"

export async function createBook(formData: Book) {
  const {title, rating, author} = Object.fromEntries(formData)

  const id = Math.floor(Math.random() * 100000)
  
  await client.hSet(`books:${id}`, {
    title,
    rating,
    author,
  })

}