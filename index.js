
'use strict';
const Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const APP_ID = 'amzn1.ask.skill.53bd6ab6-3e82-40e5-9411-7b5f714d135d';


const SKILL_NAME = 'eco pal';
const GET_LOCATION_FACT_MESSAGE = "Here is a sustainability tip based on location type: ";
const GET_FACT_MESSAGE = "Here's your eco-friendly tip: ";
const HELP_MESSAGE = 'You can say give me a sustainability tip, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with? You can say things like give me a random eco tip.';
const STOP_MESSAGE = 'Thank you for trying Eco Pal!';
const WELCOME_MESSAGE = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, give me a random eco tip?... Now, what can I help you with?';
const WELCOME_REPROMPT= "For instructions on what you can say, please say help me.";
const HELP_MESSAGE_LOCATION = 'You can say give me a sustainability tip for the home, work or school, or, you can say exit... What can I help you with?';

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


const HOME_TIPS= [
    'Swap all CFL bulbs for LED in house because LEDs are 90 percent efficient, contain no harmful gases, and can last up to 20 years.',
    'Wait until you have full load for laundry. Also, do laundry on cold wash.It not only extends the lifespan and vibrancy of her clothing it also saves 90% of the energy that would have been used to heat the water.',
    'If temperature doesn’t get as much as set up while Air condition on, we should move furniture around. The air could circulate more freely and improve its heating system efficiency by 25 percent.',
    'You should check in routine to make sure that your chargers, adapters, and small appliances are unplugged before you went out or go to sleep.',
    'Phantom energy is the electricity that electronics pull from the outlet while plugged in, even when the device is off it can waste as much as 10% of your home’s energy.',
    'You should set thermostat to temperature  that you want, so fan setting will be low to maintain temperature when its reach set temperature. This creates a space of optimal comfort, health, and productivity.',
    'Turn off Everything before heading out the door. LIghts,Bathroom vents. Computer tv',
    'Plugs all you computer and electronic equipment into a central power strip and then just hits the switch.',
    'Make sure your computer isn’t wasting any unnecessary energy. Set power management setting to energy saver mode and get rid of screen saver.',
    'This cuts energy consumption and prolongs the computer’s battery life.',
    'use daylight wisely, by keeping drapes open during the day to let in the warm rays and closed at night to keep out drafts.',
    'take the stairs if its possible instead of the elevator. Good for his health and a good way to save some kWh!'
  ];

const WORK_TIPS = [
     'Recycle all of your used printer and/or toner cartridges and keep a log of the numbers and dates sent.',
    'Establish a stationery reuse system or collection point which can be accessed by staff in order to avoid throwing functioning stationery, such as ring binders, away.',
    'Have at least one paper recycling bin per office',
    'Place paper recycling bins by each photocopier and printer.',
    'Double-check your copy paper to make sure that it has recycled content, or better yet, that it has post-consumer waste',
    'Disabling screensaver on your computers',
    'If you are not using an application or programme then close it down. Having multiple applications or programs open slow down your computer and uses more power. You could also manually put your device to sleep when you leave your desk if you won\'t be using it for a period of time',
    'Ensure that the doors and windows in all air conditioned rooms are kept closed when the air conditioning is on.',
    'Replace all T12 fluorescent lights with energy efficient lights such as T8s or LEDs',
    'Install occupancy sensors to automatically turn lights off and on in areas where lights do not need to remain on all the time',
    'Replace older toilets with low-flow toilets. Water scarcity is one of the biggest challenges in global sustainability, and toilets are generally the biggest source of water consumption in a typical office environment.',
    'Install low flow faucet aerators on your bathroom and kitchen sinks to save reduce your water usage'
    ];

 const SCHOOL_TIPS = [
     'Bring your food and drink in reusable containers, and don \'t pack excess food that you will throw away. Avoid pre-packaged items.',
     ' According to LEED  buildings in the United States consume more than 30 percent of total energy and 60 percent of electricity usage. For this reason, reduce using light in the classroom. If there is enough natural light comming in through the window keep the lights turnd off \. Also, make sure to turn the lights off when leaving the classroom.',
     'Water conservation helps ensure adequate water resources for the future and also reduces wastewater treatment by Install low-flow water aerators in washrooms',
     'Replace paper communications to parents, students, and employees with electronic methods. School mailing and paper costs will drop significantly.',
     'Purchase paper with the highest percentage of recycled materials that copier performance allows.'
     ];


const handlers = {
    'LaunchRequest': function () {
       this.emit(':ask', WELCOME_MESSAGE, WELCOME_REPROMPT);
       
    },
    
    'RandomEcoTipLocation': function ()
    {
       
          //gets slots in intent 
            var slotValue  = this.event.request.intent.slots.location.value;
            if(slotValue.toLowerCase()==="home")
            {
                const factArr = HOME_TIPS;
                const factIndex = Math.floor(Math.random() * factArr.length);
                const randomFact = factArr[factIndex];
                const speechOutput = GET_LOCATION_FACT_MESSAGE + randomFact;
        
                this.response.cardRenderer(SKILL_NAME, randomFact);
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            }
            else if(slotValue.toLowerCase()==="work")
            {
                    const factArr = WORK_TIPS;
                    const factIndex = Math.floor(Math.random() * factArr.length);
                    const randomFact = factArr[factIndex];
                    const speechOutput = GET_LOCATION_FACT_MESSAGE + randomFact;
            
                    this.response.cardRenderer(SKILL_NAME, randomFact);
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');
            }
            else if(slotValue.toLowerCase()==='school')
            {
             const factArr = SCHOOL_TIPS;
                    const factIndex = Math.floor(Math.random() * factArr.length);
                    const randomFact = factArr[factIndex];
                    const speechOutput = GET_LOCATION_FACT_MESSAGE + randomFact;
            
                    this.response.cardRenderer(SKILL_NAME, randomFact);
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');   
            }
            else{
                this.emit(':ask', WELCOME_REPROMPT);
            }   
       
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
        //Declares the quotes array
        const quotesArr = ECO_QUOTES;
        //Gets a random index to use on the data set of random quotes
        const quoteIndex = Math.floor(Math.random() * quotesArr.length);
        //Gets a random quote
        const randomQuote = quotesArr[quoteIndex];
        const speechOutput = STOP_MESSAGE + randomQuote + "..... Goodbye!";
        this.emit(':tell', speechOutput);
    }
};


