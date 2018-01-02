const net = require('net');
const ircMsg = require('irc-message');
const client = net.Socket();

let login = {
    server: 'irc.chat.twitch.tv',
    port: 6667,
    pass: 'oauth:***', //https://twitchapps.com/tmi/ get it here
    nick: 'twitch',
    channel: 'twitch'
}

client.connect(login.port, login.server, () => {
    client.write('PASS ' + login.pass + '\r\n');
    client.write('NICK ' + login.nick + '\r\n');
    client.write('JOIN #' + login.channel + '\r\n');
    
    console.log('listening to channel . . .')
    client.on('data', (data) => {
        console.log(ircMsg.parse('' + data));
        write('snoggstream', 'hi im gosu');
    });
});

function write(channel, message) {
    client.write('PRIVMSG #' + channel + ' : ' + message + '\r\n');
}
