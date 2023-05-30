export const checkProfileIsAuthorize = async (
    instance: string,
    token: string
) => {
    // const result = await fetch(
    //     `https://api.green-api.com/waInstance${instance}/getStateInstance/${token}`
    // )
    // return result

    return instance + token
}
