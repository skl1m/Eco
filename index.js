/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.32b6b356-3e3b-4816-8d2f-cfee6645bb93';

const SKILL_NAME = 'Eco';
const GET_FACT_MESSAGE = "Here is a sustainability tip based on your location: ";
const WelcomMsg='Welcom to Eco, choose one of the following commands, find sustainability tip for the home, find sustainability tip for work or find sustainability tip for school.';
const WELCOME_REPROMPT= "For instructions on what you can say, please say help me.";
const HELP_MESSAGE = 'You can say give me a sustainability tip for the home, work or school, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'Can you repeat that?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const Homedata = [
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
const workData = [
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
 const schoolData = [
     'Bring your food and drink in reusable containers, and don \'t pack excess food that you will throw away. Avoid pre-packaged items.',
     ' According to LEED  buildings in the United States consume more than 30 percent of total energy and 60 percent of electricity usage. For this reason, reduce using light in the classroom. If there is enough natural light comming in through the window keep the lights turnd off \. Also, make sure to turn the lights off when leaving the classroom.',
     'Water conservation helps ensure adequate water resources for the future and also reduces wastewater treatment by Install low-flow water aerators in washrooms',
     'Replace paper communications to parents, students, and employees with electronic methods. School mailing and paper costs will drop significantly.',
     'Purchase paper with the highest percentage of recycled materials that copier performance allows.',
     
     ];
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
       this.emit(':ask', WelcomMsg, WELCOME_REPROMPT);
       
    },
    
    'recommendation': function ()
    {
       
          //gets slots in intent 
            var slotValue  = this.event.request.intent.slots.location.value;
            if(slotValue.toLowerCase()==="home")
            {
                const factArr = Homedata;
                const factIndex = Math.floor(Math.random() * factArr.length);
                const randomFact = factArr[factIndex];
                const speechOutput = GET_FACT_MESSAGE + randomFact;
        
                this.response.cardRenderer(SKILL_NAME, randomFact);
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            }
            else if(slotValue.toLowerCase()==="work")
            {
                    const factArr = workData;
                    const factIndex = Math.floor(Math.random() * factArr.length);
                    const randomFact = factArr[factIndex];
                    const speechOutput = GET_FACT_MESSAGE + randomFact;
            
                    this.response.cardRenderer(SKILL_NAME, randomFact);
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');
            }
            else if(slotValue.toLowerCase()==='school')
            {
             const factArr = schoolData;
                    const factIndex = Math.floor(Math.random() * factArr.length);
                    const randomFact = factArr[factIndex];
                    const speechOutput = GET_FACT_MESSAGE + randomFact;
            
                    this.response.cardRenderer(SKILL_NAME, randomFact);
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');   
            }
            else{
                this.emit(':ask', WELCOME_REPROMPT);
            }   
       
    },
    
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
        
    },
    
   
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
