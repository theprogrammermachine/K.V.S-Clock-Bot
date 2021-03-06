
const {login} = require('./kasper-toolbox/auth');
const {getWorkerships} = require('./kasper-toolbox/room');
const {createTextMessage} = require('./kasper-toolbox/chat');
const {setBotId, setAuthToken} = require('./kasper-toolbox/data/auth');
const {connectSocket, registerEvent} = require('./kasper-toolbox/realtime');
const {
    clockWidgetInitGui,
    timeSecMirror,
    timeMinMirror,
    timeHourMirror,
    onClockBoxClick,
    weatherTempUpdate,
    weatherHumidityUpdate,
    clockTypeMemory
} = require('./gui');
const {gui} = require('./kasper-toolbox/gui');
const fetch = require('node-fetch');
const {
    OPEN_WEATHER_MAP_API_KEY,
    OPEN_WEATHER_MAP_CITY_NAME
} = require('./constants');

setBotId('d5282372-6387-45e2-9fe0-ea2df113b4fc-1649003288861');
setAuthToken('wuRjzHIuo7iixVvaR2se0VIMbS10EOjeWYrU1XV1FfVgxA6EkvuzU5YVEAcz9H5q');

let temperature, humidity;
let checkWeather = async () => {
    let rawResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${OPEN_WEATHER_MAP_CITY_NAME}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`);
    let response = await rawResponse.json();
    temperature = response.main.temp;
    humidity = response.main.humidity;
};

(async () => {

    await checkWeather();
    setInterval(checkWeather, 120000);

    console.log('starting bot...');
    let {bot, botSecret, session, status} = await login();
    if (status === 'error') throw new Error('Could not login.');
    console.log('logged in succesfully');

    connectSocket(async user => {
        
        let {workerships, status0} = await getWorkerships();
        if (status0 === 'error') throw new Error('Could not get workerships.');
        console.log('fetched workerships succesfully');
        if (workerships.length > 0) {
            let {message, status1} = await createTextMessage(workerships[0].roomId, 'hello keyhan !');
            if (status1 === 'error') throw new Error('Could not create message.');
            console.log('created message succesfully');
        }

        registerEvent('request_initial_gui', async ({widgetId, userId, roomId, preview, widgetWorkerId}) => {
            console.log('user::' + userId + ' requested init-gui of widget::' + widgetId + (preview ? ' in preview mode.' : '.'));
            let {status2} = await gui('init', clockWidgetInitGui, userId, widgetId, widgetWorkerId, preview, roomId);
            if (status2 === 'error') throw new Error('Could not init gui.');
            console.log('initialized gui succesfully');
        });
        registerEvent('gui_initialized', async ({widgetId, userId, roomId, widgetWorkerId, preview}) => {
            console.log('user::' + userId + ' notified init-gui of widget::' + widgetId + ' activated.');
            console.log('resuscitated widget-worker succesfully');
            
            let weatherUpdateCopy = JSON.parse(JSON.stringify(weatherTempUpdate));
            weatherUpdateCopy.newValue = '<b>' + temperature + '</b>' + '<br/><div style="font-size: 16px;">' + ' ???????? ?? ?????????? ????????' + '</div>';
            let humidityUpdateCopy = JSON.parse(JSON.stringify(weatherHumidityUpdate));
            humidityUpdateCopy.newValue = '<b>' + humidity + '%</b>' + '<div style="font-size: 18px;">' + ' ??????????' + '</div>';
            
            await gui('update', [weatherUpdateCopy, humidityUpdateCopy], userId, widgetId, widgetWorkerId, preview, roomId);
            await gui('mirror', [timeSecMirror, timeMinMirror, timeHourMirror], userId, widgetId, widgetWorkerId, preview, roomId);
            await gui('memorize', clockTypeMemory, userId, widgetId, widgetWorkerId, preview, roomId);
            await gui('attachClick', onClockBoxClick, userId, widgetId, widgetWorkerId, preview, roomId);
        });
        registerEvent('user_joined', async ({user, room}) => {
            console.log(user.firstName + ' joined room.');
            let {message, status4} = await createTextMessage(room.id, '???????? ' + user.firstName + ' ' + user.lastName + ' . ???? ?????? ???? ?????? ?????????? .');
            if (status4 === 'error') throw new Error('Could not create message.');
            console.log('created message succesfully');
        });
    });
})();
