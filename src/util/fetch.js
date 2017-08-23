export function post(url, data) {
    return fetch(
        url,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed: HTTP ${response.status}: ${response.statusText}`);
            }

            return Promise.resolve(response);
        })
        .catch(error => {
            // TODO
            console.error(error);
        });
}
