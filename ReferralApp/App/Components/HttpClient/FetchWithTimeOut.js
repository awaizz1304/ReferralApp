export default function (url,header, timeout = 7000) {
    return Promise.race([
        fetch(url,{
            method : 'Get',
            headers : header,
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}