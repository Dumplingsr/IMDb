const superagent = require('superagent');
const log = require('./log.js');

const e = module.exports = {};
e.post = {};

e.post.all = async (bot) => {
    const count = bot.guilds.size;

    try {
        await e.post.dbl(count);
        await e.post.dbots(count);
        // await e.post.carbon(count);
    } catch (err) {
        log.error(err);
    }

    console.log(`Finished posting new server count (${count}).`);
};

e.post.dbl = async (count) => {
    const post = await superagent.post('https://discordbots.org/api/bots/412006490132447249/stats').set({
        'Authorization': config.token.botlist.dbl,
        'Content-Type': 'application/json'
    }).send({
        'server_count': count
    }).catch((err) => { log.error(err, `Cannot post new server count to dbl. (${post.statusCode})`) });
}

e.post.dbots = async (count) => {
    const post = await superagent.post('https://bots.discord.pw/api/bots/412006490132447249/stats').set({
        'Authorization': config.token.botlist.dbots,
        'Content-Type': 'application/json'
    }).send({
        'server_count': count
    }).catch((err) => { log.error(`Cannot post new server count to dbots. (${post.statusCode})`) });
}

e.post.carbon = async (count) => {
    const post = await superagent.post(`https://www.carbonitex.net/discord/data/botdata.php`).set({
        'Content-Type': 'application/json'
    }).send({
        'key': config.token.botlist.carbon,
        'servercount': count
    }).catch((err) => { log.error(err, `Cannot post new server count to carbon. (${post.statusCode})`) });
}