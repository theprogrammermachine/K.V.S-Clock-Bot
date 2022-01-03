
const fetch = require('node-fetch');

module.exports = {
    initGui: async (gui, userId, widgetId, preview, roomId) => {
        const { SESSION_TOKEN } = require('./data/auth');
        const { SERVER_ROOT } = require('./data/constants');
        let requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token: SESSION_TOKEN
            },
            body: JSON.stringify({
                userId: userId,
                widgetId: widgetId,
                roomId: roomId,
                preview: preview,
                gui: gui
            }),
            redirect: 'follow'
        }
        let response = await fetch(SERVER_ROOT + '/bot/gui', requestOptions);
        result = await response.json();
        console.log(result);
        if (result.status === 'success') {
            return {
                status: 'success'
            };
        }
        return {
            status: 'error'
        };
    }
};
