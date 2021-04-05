const baseUrl = 'https://w1oui3s1ck.execute-api.us-east-1.amazonaws.com/dev/'

export const bms_getShows = async (city) => {
    try {
        const response = await fetch(`${baseUrl}/api/shows?city=${encodeURI(city)}`)
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getShows | error', e)
    }
}

export const bms_getShowById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/api/shows/${id}`)
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getShows | error', e)
    }
}

export const bms_getCities = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/cities`)
        if (response.status !== 200) throw response
        return await response.json()
    }
    catch (e) {
        console.log('BookmyshowApi.getCities | error', e)
    }
}