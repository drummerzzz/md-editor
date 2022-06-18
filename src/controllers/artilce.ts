
import axios from "axios"
import Article from "../models/article"

const baseUrl = process.env.NODE_ENV == 'production' ?
    'https://dontpad-backend-production.up.railway.app':
    'http://localhost:5000'
  
export async function onLoad (articleUrl: string): Promise<Article | null> {
    const response = await axios.get<Article>(`${baseUrl}/articles/MD-${articleUrl}`)
    if (response.status == 200) return response.data
    return null
}

export async function onSave (articleUrl: string, text: string) : Promise<Article | null>  {
    const response = await axios.post<Article>(`${baseUrl}/articles/MD-${articleUrl}`, {
        url: `MD-${articleUrl}`,
        text: text
    })
    if (response.status == 200) return response.data
    return null
}