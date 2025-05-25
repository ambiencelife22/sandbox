/* utils/channel.ts */
const API_URL = '/api/general/GetAppChannel'

export const CheckUserChannel = async () => {
    try {
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('session'))
        const token = user.uuid
        const channel = user.channel

        let rsp = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ token, channel, user }),
        headers: {
            'Content-Type': 'application/json',
        },
        })

        if (rsp.ok) {
        // Successful response, you can process the data here
        const data = await rsp.json()
        if (data.status !== 200) {
            let domain = window.location.origin
            return window.location.href = `${domain}/logout-access`
        }
        return data
        }

        if (!rsp.ok) {
        // Handle non-200 HTTP status codes here
        throw new Error(`HTTP Error: ${rsp.status}`)
        }
    }
    
    catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export const FetchLocalStorage = async () => {
    const rsp = await CheckUserChannel()
    return rsp
}
