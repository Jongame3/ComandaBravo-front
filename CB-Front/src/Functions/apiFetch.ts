const API_URL = "https://localhost:7061/api"

export async function apiFetch(endpoint : string, options: RequestInit = {}){
    const token = localStorage.getItem("token");

    return fetch(`${API_URL}${endpoint}` , {
        ...options,
        headers: {
            "Content-type" : "application/json",
            ...(token && {Authorization : `Bearer ${token}` }),
            ...options.headers,
        },
    });
}