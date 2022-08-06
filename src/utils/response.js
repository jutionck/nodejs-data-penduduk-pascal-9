const Response = () => {
    const success = (code,msg,data) => ({ code: code, message: msg, data: data })

    const error = (code,msg) => ({ code: code, message: msg })

    return { success, error }
}

module.exports = Response;
