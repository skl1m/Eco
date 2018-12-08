const Alexa = require('ask-sdk');
const dbHelper = require('dbhelper');
const dynamoDBTableName = 'user';

const skillBuilder = Alexa.SkillBuilders.standard();

// Load the SDK for JavaScript
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-east-1'});

/*
* Create DynamoDB service object 
* To access DynamoDB
*/
var dynamodb = new AWS.DynamoDB();

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const challenges=[
    'Be water wise challenge! For the next two weeks take a 5-minute shower or less up to 1x a day.',
    'Drive less, drive green challenge! If you have a far commute during the week, then try to take the bus or ride a bike or carpool anywhere you go all weekend. Otherwise, try taking public transportation all week or ride a bike to wherever your destination may be. ',
    'Take extinction of your plate! Maintain a vegetarian lifestyle for a week and a half. A vegetarian is someone who lives on a diet of grains, pulses, legumes, nuts, seeds, vegetables, fruits, fungi, algae, yeast and/or some other non-animal-based foods'+
    '(e.g. salt) with, or without, dairy products, honey and/or eggs.',
    'Go plastic free! Do not buy any items that have plastic, or get plastic bags when shopping for two weeks. Remember plastic never goes away.',
    'Go paperless! Opt to receive digital letters or notices for all your bills!',
    'Say bye to the tube challenge! Any time you reach for the laptop in the evening or want to watch tv, go outside instead for a whole two weeks.',
    'Plant a tree! Plant a tree within the next week with someone!',
    'Get locally grown! Instead of going to the grocery store for all groceries, go to the farmers market instead. Try this out for a month.',
    'Reduce your waste! Try reducing the amount of waste you produce by collecting all the waste (non-recyclable/non-reusable) in a cloth bag that you’ll carry around. By the end of the month weigh it. ',
    ];

const SKILL_NAME = "eco pal"; 

const languageStrings = {
    en : { 
        translation:{
            //Message outputted by Alexa in the beginning when the skill is first invoked
            WELCOME_MESSAGE: [
                'Welcome to ' + SKILL_NAME + ' a place for friends of our environment.',
                'Hi, you\'ve opened ' + SKILL_NAME + ', a place for environmentalists!',
                'Hello, thanks for starting ' + SKILL_NAME + '!'
            ],
            //Message outputted by Alexa when the skill ends or is requested to stop
            EXIT_MESSAGE: [
                'Goodbye!',
                'Thanks for stopping by!',
                'Farewell!',
                'Thank you for trying ' + SKILL_NAME + '!'
            ],
            //Message outputted when user wants to understand the skill's purpose
            PURPOSE_MESSAGE: [
                SKILL_NAME + ' is all about teaching people to be more environmentally concious.',
                SKILL_NAME + '\'s purpose is to encourage a sustainable lifestyle.'
            ],
            QUIZ_INTRO_MESSAGE: [
                'You found eco quiz! I will ask you 3 questions about how to properly dispose of everyday materials! Say whether the item is recyclable, compostable, or trash.', 
                'This is eco quiz! Say recycle, compost, or trash for an everyday item. ',
                'Welcome to eco quiz! Tell me whether this item goes in the recycle, compost, or trash.',
                'Tell us the best way to dispose certain items. Say trash it, recycle it, or compost it.'
            ],
            //Message outputted to let the user know they can say help during skill's session
            HELP: [
                'You can say help to learn how to use eco pal.',
                'Say help to find out how to use eco pal.',
                'To learn about sustainable living, you say help.'
            ],
            //Message outputted when user needs help during skill's session
            HELP_MESSAGE: [
                'What can I help you with? You can say give me a random eco tip, give me a work, school, or home tip, or say give me a challenge',
                'Need help? You can say give me a random tip, give me a work, home, or school eco tip, ask how to recycle an item, or say go to my challenge',
                'Say give me a sustainability tip, a home tip, ask how to recycle a specific item, or go to my challenge'
            ],
            //Message outputted by Alexa when the user needs help in the random eco tip intent
            HELP_MESSAGE_TIP: [
                'Need help? You can ask can I have a random tip?',
                'Do you need help? You can say give me a tip.',
                'Having trouble? Say something like give me a sustainability tip.'
            ],
            //Message outputted by Alexa when the user needs help in the location-specific eco tip intent
            HELP_MESSAGE_LOC_TIP: [
                'You can say give me a sustainability tip for the home, work or school, or, you can say exit... What can I help you with?',
                'Having difficulty? You can ask can I have a work tip?',
                'Do you need help? You can say give me a home tip.',
                'Having trouble? Say something like give me a eco-friendly school tip.'
            ],
            //Message outputted by Alexa when the user needs help in the recycle intent
            HELP_MESSAGE_RECYCLE: [
                'You can ask me how to recycle a certain items.',
                'Do you need help? You can ask how to recycle pyrex.',
                'Having trouble? Say something like how do I recycle cutlery?'
            ],
            //Message outputted by Alexa when the user ask for a fact
            START_FACT: [
                "Did you know that ",
                "Did you know "
            ], 
            //Message outputted by Alexa when user takes awhile to interact with the skill to reprompt the user
            HELP_REPROMPT_RECYCLE: [
                'Can I help you? You can say something like: how do I recycle ',
                'You can say something like: how do I trash ',
                'Need any help? You can ask how to dispose ',
            ],
            //Message outputted when user ask for a random eco-friendly tip
            GET_RANDOM_TIP_MESSAGE : 'Here\'s your eco-friendly tip: ',
            //Message outputted when user ask for tip based on location
            GET_LOCATION_FACT_MESSAGE : 'Here is a ',
            //Message outputted by Alexa to reprompt the users if the skill has been idle
            WELCOME_REPROMPT : 'For instructions on what you can say, please say help me.',
            START_QUESTION : 'Would you like to learn about sustainability?',
            //Message outputted by Alexa to help users on what they say at the start of the skill
            INSTRUCTION_MESSAGE : 'To learn how you can help, you can ask a question like, give me a random eco tip?... Is a book recyclable? Now, what can I help you with?',
        }
    }
}

/* POSSIBLE ITEMS
Recyclable:
Paper cups (ex. coffee cup)
Paper milk & juice cartons
Aseptics (soymilk & soup cartons, juice boxes)
Aluminum Cans & Foil
Paper (staples + paper clips okay)
Plastic & Glass Bottles / Jars
Plastic Tubs + Lids
Cardboard
CDs and Diskettes
Pipette Tip Boxes (clean)
Reagent bottles (dry)
Rigid plastics

Compostable:
Food scraps
Paper towels & napkins
Paper plates, takeout boxes & wrappers
Coffee grounds/filters & tea bags
“Compostable” labeled utensils & foodware
Bamboo chopsticks
Pizza & doughnut boxes
Waxed cardboard
Flowers & plants

Garbage:
Chip Bags & Candy Wrappers
Plastic Bags & Film
Chewing Gum
Latex Gloves
Incandescent Light Bulbs
Ceramic Dishware & glassware (broken)
Pyrex Glass (broken)
Rubber Bands
Styrofoam
*/
const questions = [
  {
    name: 'paper with staples or paper clips',
    disposal: 'recycle',
  },
  {
    name: 'banana',
    disposal: 'compost',
  },
  {
    name: 'plastic bottle',
    disposal: 'recycle',
  },
  {
    name: 'light bulbs',
    disposal: 'trash'
  },
  {
    name: 'bamboo chopsticks',
    disposal: 'compost'
  },
  {
    name: 'styrofoam',
    disposal: 'trash'
  },
  {
    name: 'coffee grounds',
    disposal: 'compost'
  },
  {
    name: 'chewing gum',
    disposal: 'trash'
  },
  {
    name: 'donut boxes',
    disposal: 'compost'
  },
  {
    name: 'plastic tubs and lids',
    disposal: 'recycle'
  },
  {
    name: 'flowers and plants',
    disposal: 'compost'
  },
  {
    name: 'latex gloves',
    disposal: 'trash'
  }
];
    
const GENERAL_REPROMPT = "What would you like to do?";

const LaunchRequestHandler = {
  canHandle(requestInput) {
    return requestInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(requestInput) {
    const { responseBuilder, attributesManager } = requestInput;
    const requestAttributes = attributesManager.getRequestAttributes();

    const attributes = attributesManager.getSessionAttributes();
    attributes.mode = 'NOT_IN_QUIZ';
    attributes.quizRound = 0;
    attributes.quizTotalQuestions = 0;
    attributes.quizTotalScore = 0;
    
    const welcomeMessageArray = requestAttributes.t('WELCOME_MESSAGE');
    var welMsg = getRandomPhrase(welcomeMessageArray);
    var welReprompt = getRandomPhrase(requestAttributes.t('WELCOME_REPROMPT'));

    const helpMessageArray = requestAttributes.t('HELP');
    const helpMsg = getRandomPhrase(helpMessageArray);

    welMsg = `${welMsg} ${helpMsg}`;
    
    //const repromptText = 'What is your name?'; 

    //console.log("----------Speech Output: ----------" + speechText);

    return requestInput.responseBuilder
      .speak(welMsg) //.speak(speechText)
      .reprompt(welReprompt)
      .getResponse();
  },
};

const QuizIntroductionHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    return requestInput.requestEnvelope.request.type === 'IntentRequest' &&
      requestInput.requestEnvelope.request.intent.name === 'QuizIntroductionIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  async handle(requestInput) {
    const {responseBuilder, attributesManager } = requestInput;
    const attributes = attributesManager.getSessionAttributes();
    const requestAttributes = attributesManager.getRequestAttributes();
     
    attributes.quizQuestionCounter = 0;
    attributes.quizScore = 0;

    if(attributes.quizRound > 3) {
      return responseBuilder // Used to build a response 
          .speak(`Quiz master, you've played enough quizzes today! Thanks for being such an eco friend.`)
          .reprompt(GENERAL_REPROMPT)
          .getResponse();
    } else {
      attributes.mode = 'IN_QUIZ'; 
    }

    const quizIntroArray = requestAttributes.t('QUIZ_INTRO_MESSAGE');
    const quizIntro = getRandomPhrase(quizIntroArray);

    const item = questions[attributes.quizTotalQuestions];

    const question = `How do you dispose of ${item.name} properly?`;
    const speechOutput = quizIntro + ' ' + question;

    attributes.lastQuestion = question;
    attributes.lastQuestionItem = item;

    return responseBuilder // Used to build a response 
          .speak(speechOutput)
          .reprompt(speechOutput)
          .getResponse();
  }
}

const QuizPlayHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    return requestInput.requestEnvelope.request.type === 'IntentRequest' &&
      requestInput.requestEnvelope.request.intent.name === 'QuizPlayIntent' &&
      attributes.mode === 'IN_QUIZ';
  },
  async handle(requestInput) {
    const {responseBuilder, attributesManager } = requestInput;
    const attributes = attributesManager.getSessionAttributes();
    attributes.quizQuestionCounter++;
    attributes.quizTotalQuestions++;
    
    const possibleAnswers = {
      recycle: [
        "recycle",
        "recycle it",
        "recyclable",
        "recycling",
        "recycles",
        "in recycle"
      ],
      compost: [
        "compost",
        "compost it",
        "compostable",
        "compositng",
        "composts",
        "in compost"
      ],
      trash: [
        "trash",
        "trash it",
        "trashable",
        "throwable",
        "toss",
        "throw away",
        "throw it away",
        "garbage",
        "bin",
        "in the bin",
        "toss it",
        "trashes",
        "garbage"
      ],
      funny: [
        "litter"
      ]
    }

    const correctConfirms = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
    const wrongConfirms = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];

    const { lastQuestion, lastQuestionItem } = attributes;
    var speechText = " ";
    const usersAnswer = requestInput.requestEnvelope.request.intent.slots.disposalMethod.value; 
    console.log("JSON in QuizPlayHandler: " + JSON.stringify(requestInput.requestEnvelope.request.intent));
    console.log(" -------User's Answer -------" + usersAnswer); 

    const disposal = attributes.lastQuestionItem.disposal;

    if ( possibleAnswers[disposal].includes(usersAnswer) ) {
      const correctMessage = correctConfirms[Math.floor(Math.random() * correctConfirms.length)];
      speechText = `${correctMessage}, you are correct! To properly dispose of ${attributes.lastQuestionItem.name}` +
        ` it is best to ${disposal}!`;  
      attributes.quizScore++;
      attributes.quizTotalScore++;
    } else if (possibleAnswers.funny.includes(usersAnswer)) {
      const wrongMessage = wrongConfirms[Math.floor(Math.random() * wrongConfirms.length)];
      speechText = `${wrongMessage}, have you learned anything here? Don't be a litter bug! To properly dispose of ${attributes.lastQuestionItem.name}` +
        ` it is best to ${disposal}!`;
    } else {
      const wrongMessage = wrongConfirms[Math.floor(Math.random() * wrongConfirms.length)];
      speechText = `${wrongMessage}, actually the proper way to dispose of ${attributes.lastQuestionItem.name}` +
        ` is to ${disposal}!`; 
    }

    let speechOutput, reprompt;
    if(attributes.quizQuestionCounter < 3) {
      const item = questions[attributes.quizTotalQuestions];

      const question = `how do you dispose of ${item.name} properly?`;
      speechOutput = speechText + ' Now, ' + question;
      reprompt = `Sorry, the question is ${question} You can say recycle, compost, or trash`;

      attributes.lastQuestion = question;
      attributes.lastQuestionItem = item;
    } else {
      pointPhrase = attributes.quizScore === 1 ? 'point' : 'points';
      speechOutput = speechText + ` Thank you for playing! You finished the quiz. You have ${attributes.quizScore} ${pointPhrase} this round. Your total score is ${attributes.quizTotalScore}. What is your name?`;
      reprompt = `You finished the quiz. I need to update your score. What is your name?`;

      attributes.quizRound++;

      const name = attributes.name;

      if(name) {
        attributes.mode = 'NOT_IN_QUIZ';
        console.log('Attributes mode ' + attributes.mode)
        const userID = requestInput.requestEnvelope.context.System.user.userId;
        const score = attributes.quizTotalScore;

        console.log('Your name is' + name);

        return dbHelper.updateScore(name, userID, score)
        .then((data) => {// If adding the user is successful then we let them know
          const speechText = speechText + ` You have ${attributes.quizScore} ${pointPhrase} this round. Hold on, ${name}, let me update your points. one... two ... three ... Yay! What would you like to do?`;
          return responseBuilder // Used to build a response 
            .speak(speechText)
            .reprompt(reprompt)
            .getResponse();
        })
        .catch((err) => { // If adding the user is unsuccessful then 
          console.log("Error occured while saving user", err);
          const speechText = "Hi " + name + " we cannot update your points right now."
          return responseBuilder //Used to build a response
            .speak(speechText)
            .getResponse();
        })
      }
    }

    return responseBuilder // Used to build a response 
          .speak(speechOutput)
          .reprompt(speechOutput)
          .getResponse(reprompt);
  }
}

const GetRandomEcoFactHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    console.log("Request Input: -----------------", requestInput);
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'RandomEcoFactIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  async handle(requestInput) {
    // {responseBuilder} = property of the object (on the right of =)
    // requestInput is the object
    const {responseBuilder, attributesManager } = requestInput; // same as const responseBuilder = requestInput.responseBuilder;
    console.log("Request Input: -----------------", requestInput);
    const requestAttributes = attributesManager.getRequestAttributes();
    var reprompt = requestAttributes.t('INSTRUCTION_MESSAGE');

    return dbHelper.getRandomEcoFact()
      .then((data) => {// If getting random eco tip is successful then we let them know
        // const randEcoFact = data.fact;
        // const randEcoSupport = data.support;
        return responseBuilder // Used to build a response 
          .speak(data.fact)
          .reprompt(GENERAL_REPROMPT)
          .getResponse();
      })
      .catch((err) => { // If getting random eco tip is unsuccessful then 
        console.log("Error occured while getting random eco fact", err);
        const speechText = "Trouble getting random eco fact. Try again!"
        return responseBuilder //Used to build a response
          .speak(speechText)
          .getResponse();
      })
  },
};


const GetRandomEcoTipHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    console.log("Request Input: -----------------", requestInput);
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'RandomEcoTipIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  async handle(requestInput) {
    // {responseBuilder} = property of the object (on the right of =)
    // requestInput is the object
    const {responseBuilder, attributesManager } = requestInput; // same as const responseBuilder = requestInput.responseBuilder;
    console.log("Request Input: -----------------", requestInput);
    const requestAttributes = attributesManager.getRequestAttributes();
    var reprompt = requestAttributes.t('INSTRUCTION_MESSAGE');

    return dbHelper.getRandomEcoTip()
      .then((data) => {// If getting random eco tip is successful then we let them know
        return responseBuilder // Used to build a response 
          .speak(data.tip)
          .reprompt(reprompt)
          .getResponse();
      })
      .catch((err) => { // If getting random eco tip is unsuccessful then 
        console.log("Error occured while getting random eco tip", err);
        const speechText = "Trouble getting random eco tip. Try again!"
        return responseBuilder //Used to build a response
          .speak(speechText)
          .getResponse();
      })
  },
};


const ChallengesHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'ChallengesIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  handle(requestInput) {
    const responseBuilder = requestInput.responseBuilder;
    const challenge = getRandomPhrase(challenges);

    return requestInput.responseBuilder
      .speak(challenge)
      .reprompt('What would you like to do?')
      .getResponse();
  },
};

const UpdateUserIntentHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'UpdateUserIntent' &&
      attributes.mode === 'IN_QUIZ' ;
  },
  async handle(requestInput) {
    // {responseBuilder} = property of the object (on the right of =)
    // requestInput is the object
    const {responseBuilder, attributesManager } = requestInput;
    const attributes = attributesManager.getSessionAttributes();
    attributes.mode = 'NOT_IN_QUIZ';

    const userID = requestInput.requestEnvelope.context.System.user.userId; 
    const slots = requestInput.requestEnvelope.request.intent.slots;
    const name = slots.name.value;

    const score = attributes.quizTotalScore;
    attributes.name = name;

    const requestAttributes = attributesManager.getRequestAttributes();
    var reprompt = requestAttributes.t('INSTRUCTION_MESSAGE');

    return dbHelper.updateScore(name, userID, score)
      .then((data) => {// If adding the user is successful then we let them know
        const speechText = `Hold on, ${name}, let me update your points. one... two ... three ... Yay! What would you like to do?`;
        return responseBuilder // Used to build a response 
          .speak(speechText)
          .reprompt(reprompt)
          .getResponse();
      })
      .catch((err) => { // If adding the user is unsuccessful then 
        console.log("Error occured while saving user", err);
        const speechText = "Hi " + name + " we cannot update your points right now."
        return responseBuilder //Used to build a response
          .speak(speechText)
          .getResponse();
      })
  },
};

const GetTipLocationHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    console.log("Request Input: -----------------", requestInput);
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'TipLocationRecommendationIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  async handle(requestInput) {
    // {responseBuilder} = property of the object (on the right of =)
    // requestInput is the object
    const {responseBuilder, attributesManager } = requestInput; // same as const responseBuilder = requestInput.responseBuilder;
    const place = requestInput.requestEnvelope.request.intent.slots.place.value;

    const requestAttributes = attributesManager.getRequestAttributes();
    var reprompt = requestAttributes.t('INSTRUCTION_MESSAGE');

    //TODO: Delete after done using for testing purposes
    console.log("Variable place in GetTipLocationHandler: " + JSON.stringify(place,null,2));
    
    //TODO: Delete after done using for testing purposes
    //console.log("Request Input: -----------------"+ requestInput);
    
    return dbHelper.getTipLocation(place.toLowerCase())
      .then((data) => {// If getting random eco tip is successful then we let them know
        // const randTipLoc = data.tip;
        // const randTipLocSupport = data.support;

        //TODO: Delete after done using for testing purposes
        console.log("Data.Tip: -----------------"+ JSON.stringify(data, null, 2));

        return responseBuilder // Used to build a response 
        
          .speak(data.tip)
          .reprompt(reprompt)
          .getResponse();
      })
      .catch((err) => { // If getting random eco tip is unsuccessful then 
        console.log("Error occured while getting random eco tip", err);
        const speechText = "Trouble getting random eco tip. Try again!"
        return responseBuilder //Used to build a response
          .speak(speechText)
          .getResponse();
      })
  },
};

const GetRecycleTipHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    console.log("Request Input: -----------------", requestInput);
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'RecycleRecommendationIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  async handle(requestInput) {
    const attributesManager = requestInput.attributesManager;
    const responseBuilder = requestInput.responseBuilder;
    const requestAttributes = attributesManager.getRequestAttributes();
    
    const  helpRepromptMsgArray = requestAttributes.t('HELP_REPROMPT_RECYCLE');
    var recycleRepromptMsg = getRandomPhrase(helpRepromptMsgArray);
    const materialName = requestInput.requestEnvelope.request.intent.slots.material.value;

    //TODO: Delete after done using for testing purposes
    console.log("Variable materialName in GetRecycleTipHandler: " + JSON.stringify(materialName,null,2));
    
    //TODO: Delete after done using for testing purposes
    //console.log("Request Input: -----------------"+ requestInput);
    
    return dbHelper.getRecycleTip(materialName.toLowerCase())
      .then((data) => {// If getting random eco tip is successful then we let them know

        return dbHelper.getRecycleMaterial()
          .then((material) =>{
              recycleRepromptMsg = recycleRepromptMsg + material + "."; 

              //TODO: Delete after done using for testing purposes
              console.log("recycleRepromptMsg: -----------------"+ recycleRepromptMsg);

              //TODO: Delete after done using for testing purposes
              console.log("materialName: -----------------"+ JSON.stringify(material, null, 2));

              return responseBuilder // Used to build a response 
                .speak(data)
                .reprompt(recycleRepromptMsg)
                .getResponse();
              })
          .catch((err) => {
            var materialArray = ['paper', 'hair', 'mirrors', 'pencils', 'pens'];
            recycleRepromptMsg = recycleRepromptMsg + getRandomPhrase(materialArray) + "."; 
            return responseBuilder // Used to build a response 
                .speak(data)
                .reprompt(recycleRepromptMsg)
                .getResponse();
          })
      })
      .catch((err) => { // If getting random eco tip is unsuccessful then 
        console.log("Error occured while getting instruction for that recycle material", err);
        const speechText = "Sorry that item is not in our database. Try again!"
        return responseBuilder //Used to build a response
          .speak(speechText)
          .getResponse();
      })
    },
};

const HelpIntentHandler = {
  canHandle(requestInput) {
    const attributes = requestInput.attributesManager.getSessionAttributes();
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && requestInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent' &&
      attributes.mode === 'NOT_IN_QUIZ';
  },
  handle(requestInput) {
    const attributesManager = requestInput.attributesManager;
    const responseBuilder = requestInput.responseBuilder;

    const requestAttributes = attributesManager.getRequestAttributes();
    const helpMsg = requestAttributes.t('INSTRUCTION_MESSAGE');

    return requestInput.responseBuilder
      .speak(helpMsg)
      .reprompt(helpMsg)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(requestInput) {
    return requestInput.requestEnvelope.request.type === 'IntentRequest'
      && (requestInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || requestInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(requestInput) {
    const attributesManager = requestInput.attributesManager;
    const responseBuilder = requestInput.responseBuilder;

    const requestAttributes = attributesManager.getRequestAttributes();
    const exitMsgArray = requestAttributes.t('EXIT_MESSAGE');
    const exitMsg = getRandomPhrase(exitMsgArray);

    return requestInput.responseBuilder
      .speak(exitMsg)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(requestInput) {
    return requestInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(requestInput) {
    console.log(`Session ended with reason: ${requestInput.requestEnvelope.request.reason}`);

    return requestInput.responseBuilder
      .speak('Bye')
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(requestInput, error) {
    console.log(`Error handled: ${error.message}`);

    return requestInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say it again.')
      .reprompt('Sorry, I can\'t understand the command. Please say it again.')
      .getResponse();
  },
};


/*
* Used to enable multiple language strings, if you want to add more lanauages for the skill
* add them to the languageStrings variable
*
* Reference: https://developer.amazon.com/blogs/alexa/post/0e2015e1-8be3-4513-94cb-da000c2c9db0/what-s-new-with-request-and-response-interceptors-in-the-alexa-skills-kit-sdk-for-node-js
*/
const LocalizationInterceptor = {
    process(requestInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: requestInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = requestInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    },
};

/*************************** Helper functions /***************************/
function getRandomPhrase(phraseArray) {
    return (phraseArray[Math.floor(Math.random() * phraseArray.length)]);
}

/*
* Letting the skill know that these are all
* the handlers
* List of all intent handlers placed here
*/
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    QuizIntroductionHandler,
    QuizPlayHandler,
    UpdateUserIntentHandler,
    ChallengesHandler,
    GetRandomEcoTipHandler,
    GetRandomEcoFactHandler,
    GetTipLocationHandler,
    GetRecycleTipHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withTableName(dynamoDBTableName)
  .withAutoCreateTable(true)

  .lambda();