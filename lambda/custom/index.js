// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const EXERCISES_LENGTH = 10;
const TOPICS_COUNT = 18;
const TWISTER_COUNT = 12;
const impromptuPlace = 4;

//Default launch function with custom phrase
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome! Right now SpeechMe can give you a random exercise, speech topic, or tongue twister. If you need help, just say: help.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
//Randomizes the exercises specified by EXERCISES
//If needs a topic, randomizes topic
//If needs a twister, randomizes twister
const RandomExerciseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RandomExerciseIntent';
    },
    handle(handlerInput) {
        var topicsText = '';
        const randomExercises = EXERCISES;
        const randomTopics = TOPICS;
        const randomTwisters = TONGUE_TWISTERS;
        const randEx = Math.floor(Math.random() * EXERCISES_LENGTH);
        if(randEx === 3){
            const randTop = Math.floor(Math.random()*TOPICS_COUNT);
            topicsText = ' Your topic is: ' + randomTopics[randTop];
        }
        if(randEx === 4){
            const randTwist = Math.floor(Math.random()*TWISTER_COUNT);
            topicsText = ' Your tongue twister is: ' + randomTwisters[randTwist];
        }
        const speechText = 'Your random exercise is to ' + randomExercises[randEx] + '.';
        return handlerInput.responseBuilder
            .speak(speechText + topicsText)
            //.reprompt(speechText)
            .getResponse();
    }
};
//Randomizes the topics
//That were specified by TOPICS
const RandomTopicIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RandomTopicIntent';
    },
    handle(handlerInput) {
        const randomTopics = TOPICS;
        const randTop = Math.floor(Math.random()*TOPICS_COUNT);
        const speechText = 'Your topic is: ' + randomTopics[randTop];
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
//Randomizes the tongue twisters
//That were specified by TONGUE_TWISTERS
const RandomTongueTwisterIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RandomTongueTwisterIntent';
    },
    handle(handlerInput) {
        const randomTopics = TONGUE_TWISTERS;
        const randTwist = Math.floor(Math.random()*TWISTER_COUNT);
        const speechText = 'Your tongue twister is: ' + randomTopics[randTwist];
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
//This will help with the creation of a new speech
//Uses dialogue trees to build essential speech elements
const NewSpeechIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NewSpeechIntent';
    },
    handle(handlerInput){
        const speechText = 'I will work with you to write your speech.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const TimeSpeechIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TimeSpeechIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const userTime = slots['Time'].value;
        var speechText;
        if(userTime === '1' || userTime === 'a'){
            speechText = 'I will time your speech for ' + userTime + ' minute';
        }else{
            speechText = 'I will time your speech for ' + userTime + ' minutes';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hi! If you need help with Speech Me, you can say help. Or you can say exit to exit the Speech Me application.';
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say new speech for help writing a new speech, say exercise for a random speech exercise, or you can say topic for a random topic.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const EXERCISES = [

    'focus on your posture',
    'speak from your gut',
    'go through actions of your speech without speaking',
    'try giving an impromptu speech',
    'try a tongue twister',
    'speed read for 5 minutes',
    'breathe slowly for 1 minute',
    'give your speech in front of a mirror',
    'read a short childrens book aloud',
    'open your mouth as wide as it can go',
]
const TOPICS = [
    'The media controls how and what we think.',
    'The media does not control how and what we think.',
    'Money makes the world go round.',
    'Money does not make the world go round.',
    'Color affects the way people feel.',
    'Color does not affect the way people feel.',
    'Peace is possible.',
    'Peace is impossible.',
    'Art is essential to life.',
    'Art is not essential to life.',
    'Being young is overrated.',
    'Being young is awesome.',
    'Laughter is the best medicine.',
    'Laughter is not the best medicine.',
    'Intelligence is enough.',
    'Intelligence is not enough.',
    'Plants have feelings too.',
    'Plants do not have feelings.',
]
const TONGUE_TWISTERS = [
    'She sells sea shells by the seashore.',
    'Round the rough and rugged rock the ragged rascal rudely ran.',
    'Quizzical quiz, kiss me quick.',
    'Eve eating eagerly elegant Easter eggs.',
    'If a dog chews shoes, whose shoes does he choose?',
    'Four fine fresh fish for you.',
    'Truly rural.',
    'Eleven benevolent elephants.',
    'Stupid superstition.',
    'She sees cheese.',
    'Which witch is which?',
    'Six sticky skeletons.',
]


// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RandomExerciseIntentHandler,
        RandomTopicIntentHandler,
        RandomTongueTwisterIntentHandler,
        NewSpeechIntentHandler,
        TimeSpeechIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(ErrorHandler)
    .lambda();
