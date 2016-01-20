'use strict';

const Mailgun = require('mailgun-js');
const Promise = require('bluebird');
const logger = require('./logger');






module.exports.create = function create(options) {

    const mailgun = new Mailgun({
        apiKey: options.apiKey,
        domain: options.domain
    });

    return {
        send: function(data) {

            if (!data.from) {
                throw new Error("from field is missing in the mail message")
            }

            if (!data.to) {
                throw new Error("to field is missing in the mail message")
            }



            var data = {
                from: data.from,
                to: data.to,
                subject: data.subject,
                text: data.text,
                attachment: data.attachment
            };



            return new Promise((resolve, reject) => {
                mailgun.messages.send(data, (err, body) => {

                    if (err) {
                        logger.log('error', 'Failed to send mail %s, mail data %j', err, data);
                        reject(err);
                        return;
                    }

                    resolve(body);
                });
            });

        }
    };
};