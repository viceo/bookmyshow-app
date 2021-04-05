export class BookmyshowApi {
    #baseUrl = 'https://w1oui3s1ck.execute-api.us-east-1.amazonaws.com/dev/'

    async getShows(city) {
        try {
            const response = await fetch(`${this.#baseUrl}/api/shows?city=${encodeURI(city)}`)
            if (response.status !== 200) throw response
            return await response.json()
        }
        catch (e) {
            console.log('BookmyshowApi.getShows | error', e)
        }
    }

    async getCities() {
        try{
            const response = await fetch(`${this.#baseUrl}/api/cities`)
            if(response.status !== 200) throw response
            return await response.json()
        }
        catch(e) {
            console.log('BookmyshowApi.getCities | error', e)
        }
    }
}