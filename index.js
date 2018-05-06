'use strict';
const Alexa = require('alexa-sdk');

// Main function to call other functions to perform the task.
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const APP_ID = 'amzn1.ask.skill.53bd6ab6-3e82-40e5-9411-7b5f714d135d';

const SKILL_NAME = 'eco pal';
//Message outputted by Alexa when user utters help
const HELP_MESSAGE_RECYCLE = 'You can ask me a question about how to recycle certain materials. I can provide information about one material at a time.';
//Message outputted by Alexa to reprompt user about recycling information
const HELP_REPROMPT_RECYCLE = 'Can I help you with another material?';
const GET_LOCATION_FACT_MESSAGE = "Here is a sustainability tip based on location type: ";
const GET_FACT_MESSAGE = "Here's your eco-friendly tip: ";
const HELP_MESSAGE = 'You can say give me a sustainability tip, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with? You can say things like give me a random eco tip.';
const STOP_MESSAGE = 'Thank you for trying Eco Pal!';
const WELCOME_MESSAGE = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, give me a random eco tip?... Now, what can I help you with?';
const WELCOME_REPROMPT= "For instructions on what you can say, please say help me.";
const HELP_MESSAGE_LOCATION = 'You can say give me a sustainability tip for the home, work or school, or, you can say exit... What can I help you with?';


 //Array to store recycling information about different types of materials
 //Material entries are case sensitive even though we convert with toLowerCase()
 //TODO: need to find out why multiple word materials are not being recognized
 const RECYCLE_DATA = {
    "paper": "paper is recyclable includes craft paper, mixed paper, newspapers, newspapers inserts, cleaner office paper, packing paper wrapping paper",
    "book" :"Text books and other books can be donated if they are current. Otherwise, hardcover and paperback books are both recycleable.",
    "card board":"Flatten all cardboard before placing it in your recycling bin. If it is too large, flatten it and place it beside your bin.",
    "cereal boxes" : "Cereal Boxes go in the recycling bin or the compost bin if it is soiled. Be sure to remove and throw away the inner lining in the garbage.",
    "eggcartons" : "Clean egg cartons may go in the recycling bin or the compost bin. Soiled egg cartons must be composted.",
    "envelopes": "Envelopes are recyclable. Envelopes lined with bubble wrap or other plastic linings must go in the garbage.",
    "filefolder": "File folders that are in good condition can be donated. Old file folders may be recycled. Metal tabbed folders may be recycled, but be sure to dispose of any plastic tabs in the garbage.",
    "glossy paper" : "Glossy Paper is recyclable",
    "junkmail" : "JunkMail is recyclable",
    "magazines": "Magazines are recyclable.",
    "mailer envelopes":"Mailer Envelopes are recycable that are made without plastic.",
    "pendaflex hanging folder": "Pendaflex Hanging Folders are recycable.",
    "phonebooks" : "Phone books are recyclable. How are phonebooks still a thing?",
    "post-it" : "post-its go in to the recycling bin.",
    "sticky notes": "Sticky Notes are recycable.",
    "animalcages": "Animal Cages made of different materials should be thrown in the garbage. The amount of energy required to separate them makes recycling impractical. 100 percent plastic cages are recyclable, but please make sure they are clean.",
    "bottle plastic" : "Plastic bottles are recycable.",
    "plastic bottle": "Plastic Bottle is recycable.",
    "dvd cases" : "DVD's Cases are recycable. Make sure they don't contain any confidential information!",
    "cd rom cases" : "CDROM Cases are recycable",
    "plexiglass": "Plexi-glass items in good condition may be donated. Otherwise, they should go in the recycling bin.",
    "pipette" : "Pipettes go in the garbage.",
    "pipettes": "Pipettes go in the garbage.",
    "bricks": "Bricks are a heavy and bulky landfill material, so reuse them whenever possible. Bricks are made from clay and cannot be placed in any of the traditional three stream containers. Call your local recycling center to see if they can recycle bricks.",
    "floss": "Dental floss goes in the garbage.",
    "battery": "Single-use batteries contain a number of materials that are recyclable. You can recycle them by dropping them off at a local facility or by participating in the many mail-in or take back programs that are available.",
    "batteries": "Single-use batteries contain a number of materials that are recyclable. You can recycle them by dropping them off at a local facility or by participating in the many mail-in or take back programs that are available.",
    "pens": "Pens go in the garbage",
    "pencils": "Pencils go in the garbage",
    "hair": "Human hair is a rich source of nitrogen and can be placed in a Compost Bin. Pet fur can also be placed in the compost bin. Dye-treated hair is acceptable in Compost but do NOT compost synthetic hair extensions or wigs, even if made with real hai. These go into the garbage.",
    "styrofoam": "Very few recycling programs accept styrofoam because it is very costly and inefficient to recycle. It is non-biodegradable and can sit in a landfill for centuries. If possible, try to limit your use of styrofoam.",
    "wood": "Small pieces of lumber or sawdust from clean wood can go in the compost bin. If there are nails or paint in the wood, it belongs in the garbage.",
    "chopsticks": "Wooden chopsticks go in the compost bin while plastic chopsticks go in the recycling bin.",
    "hangers": "Clothes hangers are reusable or can be donated. It can be difficult to determine what plastics different hangers are made of so they cannot be donated. Metal hangers can be collected for scrap metal, but cannot be recycled because they cause problems with recycling sorting equiptment. ",
    "mirrors": "Unlike glass bottles, mirrors melt at a different temperature and are not accepted in traditional recycling bins. Broken mirrors go in the garbage.",
    "mirror": "Unlike glass bottles, mirrors melt at a different temperature and are not accepted in traditional recycling bins. Broken mirrors go in the garbage.",
    "pyrex": "Pyrex glassware is a low-thermal expansion glass that liquidates at a different temperature than regular glass bottles. Broken pyrex should go out in the garbage in a taped up box. Pyrex in good condition may be donated.",
    "window": "Windows go in the garbage. They melt at a different temperature than glass bottles and cannot be recycled.",
    "kleenex": "Soiled kleenex should be composted. Unsoiled kleenex should be disposed of in the recycling bin.",
    "tissue" : "Regardless if it contains mucus, blood, lipstick, et cetera, used tissues go in the compost bin. Unused tissues go in the recycling bin.",
    "cutlery" : "Cutlery is recyclable. Cutlery that are labeled compostable may go in the compost bin, but bio-degradable cutlery cannot."
    
    //TODO: add remaining materials to data array
    /**
    "Plastics" : "Dirty Plastics and Hard Plastics are recyclable",
    "Laundry Detergent Bottles" : "Laundry Detergent Bottles is recyclable",
    "Molded Plastic Packaging" : "Molded Plastic Packaging is recyclable",
    "Pipette Tip Boxes" : "Pipette Tip Boxes is recyclable",
    "Plastic Buckets" : "Plastic Buckets is recyclable",
    "Plastic Coffee Cups Lids" : "Plastic Coffee Cups Lids is recyclable",
    "Plastic Containers" : "Plastic Containers is recyclable",
    "Plastic Clamshells" : "Plastic Clamshells is recyclable",
    "Plastic Corks" : "Plastic Corks is recyclable",
    "Plastic Cups" : "Plastic Cups is recyclable",
    "Plastic Flower Pots and Trays" : "Plastic Flower is recyclable",
    "Plastic Pots" : "Plastic Pots is recyclable",
    "Plastic Trays" : "Plastic Trays is recyclable",
    "Plastic Fork" : "Plastic Fork is recyclable",
    "Plastic Knife" : "Plastic Knife is recyclable",
    "Plastic Knives" : "Plastic Knives is recyclable",
    "Plastic Lids" : "Plastic Lids is recyclable",
    "Plastic Plates" : "Plastic Plates is recyclable",
    "Plastic Spoon" : "Plastic Spoon is recyclable",
    "Plastic To - Go Container" : "Plastic To - Go Container is recyclable",
    "Plastic Toys" : "Plastic Toys is recyclable",
    "Plastic Utensils" : "Plastic Utensils is recyclable",
    "Plastic Cutlery" : "Plastic Cutlery is recyclable",
    "Plexi - Glass" : "Plexi - Glass is recyclable",
    "Solied Plastic" : "Solied Plastic is recyclable",
    "Tubs" : "Tubs is recyclable",
    "Lids" : "Lids is recyclable",
    "Bottles Glass" : "Bottles Glass is recyclable",
    "Chopsticks Plastic" : "Chopsticks Plastic is recyclable",
    "Plastic Chopsticks" : "Plastic Chopsticks is recyclable",
    "Aerosol Cans" : "Aerosol Cans is recyclable",
    "Aluminum Baking Trays" : "Aluminum Baking Trays is recyclable",
    "Aluminum Foil" : "Aluminum Foil is recyclable",
    "Aluminum Pie Plates" : "Aluminum Pie Plates is recyclable",
    "Metal Caps" : "Metal Caps is recyclable",
    "Metal Wire" : "Metal Wire is recyclable",
    "Spary Cans" : "Spary Cans is recyclable",
    "Cans" : "steel Cans and Tin cans  are recyclable"*/
};

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
    /**
	LaunchRequest: User has made a request to the Alexa skill without invoking a specific intent.
	*/
    'LaunchRequest': function () {
        //this.response.speak(HELP_MESSAGE).listen();
        //this.emit(':responseReady');

       this.emit(':ask', WELCOME_MESSAGE, WELCOME_REPROMPT);
       
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
    'TipLocationRecommendationIntent': function ()
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
    
    /**
	RecycleRecIntent: Custom intent for user to request information about how to recycle certain materials.
	*/
    'RecycleRecommendationIntent' : function(){
        //Alexa listens for voice input in order to process the user's request
        this.response.speak(HELP_MESSAGE_RECYCLE).listen();
        //Convert the value of the material passed in from an utterance to lower case
        var fMaterial = this.event.request.intent.slots.material.value.toLowerCase();
        var fValue =  `${data[fMaterial]}`;
        
        //If the material requested by user is not contained in data array, prompt user to ask again
        if (fValue === 'undefined'){
            this.emit(':ask', "The material information is not contain in our database. " + HELP_REPROMPT_RECYCLE).listen();
        }
        //Reprompt user to ask about how to recycle another material
        else{
            this.emit(':ask',fValue + ". " + HELP_REPROMPT_RECYCLE).listen();//.listen('Say yes if you wish to continue, or cancel to quit.');
        }
    }, 
  /*
	  AMAZON.HelpIntent: Output help message and listen to user's voice to continue
	*/
    'AMAZON.HelpIntent': function () {
       const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    /**
	AMAZON.CancelIntent: Output stop message and exit
	*/
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE)
        this.emit(':responseReady');
    },
    	/**
	AMAZON.StopIntent: - Output stop message and exit.
	*/
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit('SessionEndedRequest');
    },
    /**
	AMAZON.YesIntent: - Output help message and listen to user's voice to continue
	*/
     'AMAZON.YesIntent': function () {
        this.response.speak(HELP_MESSAGE).listen();
        this.emit(':responseReady');
    },
    /**
	AMAZON.NoIntent: - Output stop message and exit.
	*/
    'AMAZON.NoIntent': function () {
        this.response.speak(STOP_MESSAGE);
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

