function login(userName, password){
    return fetch('http://localhost:2023/api/session', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userName, password})
        })
        .then(async response => {
            if(!response.ok) throw await response.json();
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return data
        })
}
function logout(){
    fetch('http://localhost:2023/api/session', {
        method: 'DELETE',
        headers: {
            'auth-token':localStorage.getItem('token')
        }
    }).then(async response =>{
        if(!response.ok) {
            if(response.status = 401) localStorage.removeItem('token')
            throw await response.json();
        }
    })
    .catch(err => {
        throw err.json();
    })
    localStorage.removeItem('token');
}

function getUser(){
    return fetch('http://localhost:2023/api/account', {
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

function register({userName, password, email}){
    return fetch('http://localhost:2023/api/account', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userName, password, email})
        })
        .then(async response => {
            if(!response.ok) throw await response.json();
            const data = await response.json();
            return data
        })
}

async function updateUser(usuario){
    const response = await fetch('http://localhost:2023/api/account', {
        method: 'PATCH',
        headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data;
}

export {
    login,
    logout,
    getUser,
    register,
    updateUser
}