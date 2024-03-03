function getCurrent(){
    return fetch('http://localhost:2023/api/profile', {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token')
            },
        })
        .then(async response => {
            if(!response.ok) throw await response.json();
            const data = await response.json();
            return data
        })
}

function updateProfile(profile){
    return fetch('http://localhost:2023/api/profile', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(profile)
        })
        .then(async response => {
            if(!response.ok) throw await response.json();
            const data = await response.json();
            return data
        })
}

function register(userName, password){
    return fetch('http://localhost:2023/api/profile', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userName, password})
        })
        .then(async response => {
            if(!response.ok) throw await response.json();
            const data = await response.json();
            return data
        })
}
export {
    getCurrent,
    updateProfile,
    register,
}