export const checkProfileIsAuthorize = async (
    idInstance: string,
    apiTokenInstance: string
) => {

    try {
        const response = await fetch(
            `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
        )

        const data = await response.json()
        return data.stateInstance
    } catch (error) {
        if (error instanceof Error) {
            return error.name
        }
    }
}

export const checkNumberIsCorrect = async (idInstance: string,
    apiTokenInstance: string, phoneNumber: string) => {
    const body = {phoneNumber: +phoneNumber};
    try {
        const response = await fetch(
            `https://api.green-api.com/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        const data = await response.json()
        return data.existsWhatsapp
    } catch (error) {
        return false
    }
}

export const sendMessage = async (idInstance: string,
    apiTokenInstance: string, phoneNumber: string, textMessage: string) => {

    const body = {
        chatId: `${+phoneNumber}@c.us`,
        message: textMessage
    }

    try {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        return response.ok
    } catch (error) {
        return false
    }
}

export const setSettings = async (idInstance: string, apiTokenInstance: string) => {

    const body = {
        webhookUrl: "",
        outgoingWebhook: "yes",
        stateWebhook: "yes",
        incomingWebhook: "yes"
    }

    try {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/setSettings/${apiTokenInstance}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        )

        return response.ok
    } catch (error) {
        return false
    }
}




export const receiveNotification = async (idInstance: string, apiTokenInstance: string) => {

    try {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
        const {receiptId, body} = await response.json()

        return {receiptId, body}
    } catch (error) {
        return {}
    }
}

export const deleteNotification = async (idInstance: string, apiTokenInstance: string, receiptId: number) => {

    try {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        {
            method: "DELETE"
        }
        )
        
        return await response.json()
    } catch (error) {
        return false
    }
}