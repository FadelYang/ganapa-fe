interface LoginResponse {
    access_token: string,
    role: string
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        const errorResponse = await response.json()
        
        throw new Error(errorResponse.message)
    }

    const data = await response.json()

    return { 
        access_token: data.access_token,
        role: data.role
    }
}