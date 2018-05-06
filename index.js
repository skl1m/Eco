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
//TODO: add Alexa app ID after merging functions
const APP_ID = undefined;

//Skill name for user to call when starting the Alexa skill
const SKILL_NAME = 'eco pal';
//Message outputted by Alexa when user utters help
const HELP_MESSAGE = 'You can ask me a question about how to recycle certain materials. I can provide information about one material at a time.';
//Message outputted by Alexa to reprompt user about recycling information
const HELP_REPROMPT = 'Can I help you with another material?';
//Message outputted by Alexa after exiting Eco Pal
const STOP_MESSAGE = 'Goodbye!';
//let speechOutput;

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
 //Array to store recycling information about different types of materials
 //Material entries are case sensitive even though we convert with toLowerCase()
 //TODO: need to find out why multiple word materials are not being recognized
 var data = {
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
    "cd rom Cases" : "CDROM Cases are recycable",
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

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    /**
	LaunchRequest: - User has made a request to the Alexa skill without invoking a specific intent.
	*/
    'LaunchRequest': function () {
        this.response.speak(HELP_MESSAGE).listen();
        this.emit(':responseReady');
    },
    
    /**
	RecycleRecIntent: - Custom intent for user to request information about how to recycle certain materials.
	*/
    'RecycleRecIntent' : function(){
        //Alexa listens for voice input in order to process the user's request
        this.response.speak(HELP_MESSAGE).listen();
        //Convert the value of the material passed in from an utterance to lower case
        var fMaterial = this.event.request.intent.slots.material.value.toLowerCase();
        var fValue =  `${data[fMaterial]}`;
        
        //If the material requested by user is not contained in data array, prompt user to ask again
        if (fValue === 'undefined'){
            this.emit(':ask', "The material information is not contain in our database. " + HELP_REPROMPT).listen();
        }
        //Reprompt user to ask about how to recycle another material
        else{
            this.emit(':ask',fValue + ". " + HELP_REPROMPT).listen();//.listen('Say yes if you wish to continue, or cancel to quit.');
        }
    },
    
    /**
	AMAZON.HelpIntent: - Output help message and listen to user's voice to continue
	*/
    'AMAZON.HelpIntent': function () {

        this.response.speak(HELP_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    /**
	AMAZON.CancelIntent: - Output stop message and exit
	*/
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    	/**
	AMAZON.StopIntent: - Output stop message and exit.
	*/
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
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
};

// Main function to call other functions to perform the task.
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
