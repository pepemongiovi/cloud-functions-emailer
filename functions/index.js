const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.httpEmail = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 

        const toName  = req.body.toName;
        const toEmail = req.body.toEmail;

        const msg = {
            to: toEmail,
            from: 'victorrocha@attus.me',
            subject:  'ATTUS - Investimento',
            text: `Olá, ${toName}.  `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

            // custom templates
            templateId: 'd-051b7c8f5aec4d158cbd1c2c40230b3a',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              name: toName
              // and other custom properties here
            }
        };

        return sgMail.send(msg)
                
            .then(() => res.status(200).send('email sent!') )
            .catch(err => res.status(400).send(err) )

        });

});

