'use strict'

const seneca = require('seneca')();
const config = require('./config');
const logger = require('./lib/logger');
const mailer = require('./lib/mailer');
const RabbitMQTransport = require('seneca-rabbitmq-transport');
//const act = Promise.promisify(seneca.act);

logger.debug('loading actions');
const MailingPlugin = require("./actions/mailing");

logger.debug('registering plugins');
seneca
    .use('mesh', {
        bash: true
    })
    .use(RabbitMQTransport)
    .use(MailingPlugin, {
        mailer: mailer.create({
            apiKey: config.apiKey,
            domain: config.domain
        })
    });

seneca.ready(err => {
    if (err) {
        logger.log('error', 'Seneca failed to get ready!');
        return;
    }

    logger.log('info', 'Seneca listening on port: %s', config.port);
    seneca.listen({
        port: config.port
    })
});