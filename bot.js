
const {login} = require('./kasper-toolbox/auth');
const {getWorkerships} = require('./kasper-toolbox/room');
const {createTextMessage} = require('./kasper-toolbox/chat');
const {setBotId, setAuthToken} = require('./kasper-toolbox/data/auth');
const {connectSocket, registerEvent, unregisterEvent} = require('./kasper-toolbox/realtime');
const {initGui} = require('./kasper-toolbox/gui');
const {clockWidgetInitGui} = require('./gui');

setBotId('e8a41f79-a3de-4c86-8c32-417374a5bff8-1641104273950');
setAuthToken('kqjbkL7zTMpTIuFGTViQPRDIRHt1HjRx8NAhaf6ECLsp0a71yMOqKS7qLLGsGzR9');

(async () => {

    console.log('starting bot...');
    let {bot, botSecret, session, status} = await login();
    if (status === 'error') throw new Error('Could not login.');
    console.log('logged in succesfully');

    connectSocket(async user => {

        registerEvent('user_joined', async ({user, room}) => {
            console.log(user.firstName + ' joined room.');
            let {message, status0} = await createTextMessage(room.id, 'سلام ' + user.firstName + ' ' + user.lastName + ' . به روم ما خوش آمدید .');
            if (status0 === 'error') throw new Error('Could not create message.');
            console.log('created message succesfully');
        });
        registerEvent('request_initial_gui', async ({widgetId, userId, roomId, preview}) => {
            console.log('user::' + userId + ' requested init-gui of widget::' + widgetId + ' in ' + (preview ? 'preview mode.' : ''));
            let {status1} = await initGui(clockWidgetInitGui, userId, widgetId, preview);
            if (status1 === 'error') throw new Error('Could not init gui.');
            console.log('initialized gui succesfully');
        });
        
        let {workerships, status2} = await getWorkerships();
        if (status2 === 'error') throw new Error('Could not get workerships.');
        console.log('fetched workerships succesfully');
        if (workerships.length > 0) {
            let {message, status3} = await createTextMessage(workerships[0].roomId, 'hello keyhan !');
            if (status3 === 'error') throw new Error('Could not create message.');
            console.log('created message succesfully');
        }
    });
})();
