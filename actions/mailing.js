'use strict';

module.exports = function mailing(options) {

    const mailer = options.mailer;

    this.add({
            role: 'mail',
            cmd: 'send'
        },
        function(args, respond) {

            let mail = {
                from: args.from,
                to: args.to,
                text: args.content
            };

            mailer.send(mail)
                .then(res => respond(null, {
                    result: 'sent'
                }))
                .catch(respond);


        });

    return {
        name: 'sendmail'
    };
};