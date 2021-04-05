import { Auth } from 'aws-amplify'

const getJwt = () => {
    return new Promise(async (resolve, reject) => {
        try
        {
            const jwt = (await Auth.currentSession()).getIdToken().getJwtToken()
            console.log('jwt => ', jwt)
            resolve(jwt)
        }
        catch(e) {
            console.log('getJwt | error', e)
        }
    })
}


const baseUrl = 'https://w1oui3s1ck.execute-api.us-east-1.amazonaws.com/dev/'


export const bms_getShows = async (city) => {
    try {

        const response = await fetch(`${baseUrl}/api/shows?city=${encodeURI(city)}`, {
            headers: {
                'Authorization': `${await getJwt()}`
            }
        })
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getShows | error', e)
    }
}

export const bms_getShowById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/api/shows/${id}`, {
            headers: {
                'Authorization': `${await getJwt()}`
            }
        })
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getShows | error', e)
    }
}

export const bms_getCities = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/cities`, {
            headers: {
                'Authorization': `${await getJwt()}`
            }
        })
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getCities | error', e)
    }
}