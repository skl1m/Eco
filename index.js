/*
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask eco pal for a tip"
 *  Alexa: "Here's your eco-friendly tip: ..."
 */
 
'use strict';
const Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
const APP_ID = 'amzn1.ask.skill.53bd6ab6-3e82-40e5-9411-7b5f714d135d';

const SKILL_NAME = 'eco';
const GET_FACT_MESSAGE = "Here's your eco-friendly tip: ";
const HELP_MESSAGE = 'You can say give me a sustainability tip, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with? You can say things like give me a random eco tip.';
const STOP_MESSAGE = 'Thank you for trying Eco Pal!';
const WELCOME_MESSAGE = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, give me a random eco tip?... Now, what can I help you with?';
const WELCOME_REPROMPT= "For instructions on what you can say, please say help me.";

/*
 * Array containing random eco friendly tips.
*/
const ECO_TIPS = [
    'Landscape your own yard with native plants.',
    'Take shorter showers.',
    'Don’t eat foods or drink from BPA-lined containers.',
    'Open windows to let in fresh air.',
    'Start or contribute to a community garden.',
    'Limit your meat intake: The manufacturing of meat products has a significant drain on our environment and economy.',
    'Shop at the farmers market and/or locally owned shops: Support the local economy by purchasing your food products from local merchants.',
    'According to the EPA, 21% of all waste in the landfill is food waste, so limit the amount of food that goes bad by eating what you have first before buying more.',
    'Don\'t shop on an empty stomach, shopping on an empty stomach leads to excess purchases that you may not be able to eat in time.',
    'Wash and reuse plastic storage bags or containers whenever possible',
    'Invest in a single reusable travel mug and fill with your favorite beverages rather than using a disposable cup',
    'Bring your own bags with you when you shop',
    'Take a proactive approach to your health, which can reduce your dependency on medication.  The production and distribution of medication has negative impacts on the environment and the medicine in our systems can find its way into local waterways, contaminating the water we ingest and leading to other health issues.',
    'Buy used rather than new.',
    'Opt for paperless billing.',
    'Pay your bills electronically.',
    'Try to walk, bike, carpool or use public transportation whenever possible.',
    'LED holiday lights use up to 80 percent less energy than incandescent lights, and they’ll last longer, so they’re worth the splurge.',
    'If you can, send e-cards to save resources and shipping impacts. Otherwise, send cards made from 100-percent post-consumer recycled content.',
    'Ditch plastic. Plastic never goes away. Today billions of pounds of it can be found in swirling convergences making up about 40 percent of the world’s ocean surfaces.',
    'Choose Fair Trade certified goods when possible to support companies dedicated to sustainable production and paying laborers a fair wage.',
    'Skip the bottled water. Bottled water companies try to give tap water a bad name, even though the water from your faucet is practically free and most city water has won quality and tests against name-brand water.',
    'Choose to have a smaller family. More people in the world = more demands for resources.',
    'Growing herbs on a windowsill can save you hundreds in the long run.',
    'Boycott products that endager wildlife. Products made from animals on the endangered species list are illegal to buy, sell, import or trade in the United States, but if a plant or animal hasn’t been listed yet, they can still be harmed for someone’s profit.',
    'Walk, bike, carpool or use public transportation whenever possible. Combine errands to make fewer trips.',
    'Just as keeping your car in shape improves your fuel efficiency, keeping your home in shape improves your energy efficiency.',
    'If you\'re not using an electronic device, unplug it -- that\'s the blanket approach to fighting vampire power. You can make this step even easier with a surge protector or power strip.',
    'Use waterless car wash to wash your car or bike.',
    'Read magazines, newspapers and other publications online.',
    'Unplug at least once a day so that you can enjoy nature and the environment around'
];

const ECO_QUOTES = [
    'Remember we do not inherit the earth from our ancestors, we borrow it from our children',
    'The marks humans leave are too often scars',
    'The earth has music for those who listen',
    'Be the change you wish to see in this world'
];

const handlers = {
    'LaunchRequest': function () {
     
        //this.emit('RandomEcoTip');
        /*If the user either does not reply to the welcome message or says
        something that is not understood, they will be prompted again with
        this text
        */
        this.emit(':ask', WELCOME_MESSAGE, WELCOME_REPROMPT)
    },
    'RandomEcoTip': function () {
        //Declares the factArray
        const factArr = ECO_TIPS;
        //Gets a random index to use on the data set of random facts
        const factIndex = Math.floor(Math.random() * factArr.length);
        //Gets a random fact
        const randomFact = factArr[factIndex];
        //Sets the speech output to have the 
        //set message concatenated with the random fact
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        //this.response.cardRenderer(SKILL_NAME, randomFact);
        //this.response.speak(speechOutput);
        this.emit(':ask', speechOutput, HELP_REPROMPT)
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE)
        this.emit(':responseReady');
    },
    'SessionEndedRequest':function () {
        //Declares the factArray
        const quotesArr = ECO_QUOTES;
        //Gets a random index to use on the data set of random facts
        const quoteIndex = Math.floor(Math.random() * quotesArr.length);
        //Gets a random fact
        const randomQuote = quotesArr[quoteIndex];
        const speechOutput = STOP_MESSAGE + randomQuote + "..... Goodbye!";
        this.emit(':tell', speechOutput);
    }
};


