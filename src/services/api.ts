/* local bağlantı
export const API_URL = "http://localhost:3000"
*/

const BASE_URL = "https://hr-backend-demo.onrender.com";

export async function getCandidates() {
    const response = await fetch(`${BASE_URL}/candidates`);
    if(!response.ok) {
        throw new Error("Adaylar alınamadı.")
    }
    return response.json();
}