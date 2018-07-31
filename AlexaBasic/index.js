/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const Interpreter = require('./interpreter')

const WELCOME_TIPS =
    [
        "Did you know you can rename your programs?",
        "Look at the online guide for full tutorials.",
        "You can ask for an example program to see something cool!"
    ]

const DIALOG_STATES =
    {
        START: '_START',
        EDITING: '_EDITING',
        RUNNING: '_RUNNING',
        SAVING: '_SAVING',
    }

function getRandom(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const speechText = 'Welcome to Alexa Basic. ' + WELCOME_TIPS[getRandom(0, WELCOME_TIPS.length-1)];

        attributes.state = DIALOG_STATES.START;

        console.log(attributes);
        console.log(handlerInput);

        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Welcome to Basic!', speechText)
            .getResponse();
    },
};

const EditLineRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'EditLineInit';
    },
    handle(handlerInput) {
        /*const*/ var attributes = handlerInput.attributesManager.getSessionAttributes();
        const speechText = 'Welcome to Alexa Basic. ' + WELCOME_TIPS[getRandom(0, WELCOME_TIPS.length - 1)];

        attributes.state = DIALOG_STATES.START;

        var keyword = handlerInput.requestEnvelope.request.intent.slots.Keyword.value;//this.event.request.intent.slots.Keyword.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        var value = handlerInput.requestEnvelope.request.intent.slots.Value.value;
        var lineNumber = handlerInput.requestEnvelope.request.intent.slots.LineNumber.value;
        attributes = editLine(lineNumber,keyword,value,attributes);

        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Welcome to Basic!', speechText)
            .getResponse();
    },
};

const ReadProgramRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ReadProgram';
    },
    handle(handlerInput) {
        /*const*/ var attributes = handlerInput.attributesManager.getSessionAttributes();
        //const speechText = 'Welcome to Alexa Basic. ' + WELCOME_TIPS[getRandom(0, WELCOME_TIPS.length - 1)];
        var speechText = "";

        if (attributes.hasOwnProperty('codeLines')) {
            var lines = attributes.codeLines;
            lines.forEach(function (line) {
                speechText += "Line " + line.lineNumber + " is " + line.keyword +" "+ line.value + ".";
            }
            )

        } else {
            speechText = "Sorry, no program detected. Ask for help if you want to get started."
        }

        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Welcome to Basic!', speechText)
            .getResponse();
    },
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
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
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
    HelpIntentHandler,
    EditLineRequestHandler,
    ReadProgramRequestHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

//'use strict';

//const Alexa = require('alexa-sdk');
////const Alexa = require('ask-sdk-core');

//const APP_ID = undefined;

//const SKILL_NAME = 'Space Facts';

//const DIALOG_STATES = {
//    TRIVIA: '_TRIVIAMODE', // Asking trivia questions.
//    //START: '_STARTMODE', // Entry point, start the game.
//    PROGRAM: '_PROGAMMODE',
//    USERINPUT: '_USERINPUTMODE',
//    //    EDITLINE: '_EDITLINEMODE',
//    HELP: '_HELPMODE', // The user is asking for help.
//};

//const STARTUP_TIPS = [
//    "Did you know you can name your programs?",


//];

//const newSessionHandlers = {
//    'LaunchRequest': function () {
//        this.handler.state = DIALOG_STATES.PROGRAM;
//        this.emitWithState('Program', true);
//    },
//    'AMAZON.StartOverIntent': function () {
//        this.handler.state = DIALOG_STATES.PROGRAM;
//        this.emitWithState('Program', true);
//    },
//    'AMAZON.HelpIntent': function () {
//        this.handler.state = DIALOG_STATES.HELP;
//        this.emitWithState('helpTheUser', true);
//    },
//    'Unhandled': function () {
//        // const speechOutput = this.t('START_UNHANDLED');
//        this.response.speak("Unrecognized command, try again");//.listen(speechOutput);
//        this.emit(':responseReady');
//    },
//};

//const startDialogHandlers = Alexa.CreateStateHandler(DIALOG_STATES.PROGRAM, {
//    'Program': function () {
//        var speechOutput = STARTUP_TIPS[0];
//        this.response.speak("Welcome to BASIC! " + speechOutput);
//        this.handler.state = DIALOG_STATES.PROGRAM;
//        this.emit(':responseReady');

//        //GET USER INPUT, GOOD FOR EXECUTION
//        // this.handler.state = DIALOG_STATES.USERINPUT;
//        // this.emit(":ask", "What is your name?");
//    },
//    'ReadProgram': function () {
//        this.response.speak("testing");
//        this.emit(':responseReady');
//    },
//    'EditLineInit': function () {
//        // var keyword = this.event.request.intent.slots.Keyword.resolutions.resolutionsPerAuthority[0].values[0].value.name;
//        // var value = this.event.request.intent.slots.Value.value;
//        // var lineNumber = this.event.request.intent.slots.LineNumber.value;

//        // this.attributes = editLine(lineNumber,keyword,value,this.attributes);
//        this.handler.state = DIALOG_STATES.PROGRAM;
//        this.response.speak("testing");
//        this.emit(':responseReady');



//        // this.response.speak(" you wot mate").listen("I missed it");
//        // this.emit(':responseReady');
//    },
//});

//const userInputHandlers = Alexa.CreateStateHandler(DIALOG_STATES.USERINPUT, {
//    'GetUserInputIntent': function () {
//        // this.response.speak("Try writing a line of code.").listen("For example, change line 10.");
//        // this.emit(':responseReady');
//        //this.handler.state = DIALOG_STATES.USERINPUT;
//        this.response.speak("Hello " + this.event.request.intent.slots.Input.value);
//        //this.response.cardRenderer(this.t('GAME_NAME'), repromptText);
//        this.emit(':responseReady');
//    },
//});

function editLine(lineNumber, keyword, value, attributes) {
    // var index = (this.attributes.hasOwnProperty('lineNumbers') ? this.attributes.lineNumbers.indexOf(lineNumber) : -2);


    var index = 0;
    var lineObj = { lineNumber: lineNumber, keyword: keyword, value: value };


    if (attributes.hasOwnProperty('codeLines')) {
        index = attributes.codeLines.findIndex(line => line.lineNumber == lineNumber);
    } else {
        index = -2; //codeLines is not defined yet
        attributes.codeLines = [lineObj];
    }

    if (index == -1) {
        attributes.codeLines = attributes.codeLines.concat([lineObj]);
    } else if (index >= 0) {
        attributes.codeLines[index] = lineObj;
    }

    attributes.codeLines = sortByKey(attributes.codeLines, 'lineNumber');

    return attributes;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function getLineIndex(array, value) {

    return array.findIndex(line => line.lineNumber == value);
}

//exports.handler = function (event, context, callback) {
//    const alexa = Alexa.handler(event, context, callback);
//    alexa.APP_ID = APP_ID;
//    alexa.registerHandlers(newSessionHandlers, startDialogHandlers, userInputHandlers);
//    alexa.execute();
//};
