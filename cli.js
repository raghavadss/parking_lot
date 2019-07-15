"use-strict";
var _ = require('lodash')
var chalk = require('chalk');
const Json2csvParser = require('json2csv').Parser;
var parkingManager = require('./parking-manager');

var validateArgCount = function (args, expectedArgCount) {
  return args.length == expectedArgCount
};

var initLoading = function () {
  console.log('********* Enter command ********');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (argString) {
    argString = argString.trim();
    var args = argString.split(' ');
    if (args[0] === "create_parking_lot") {
      if (validateArgCount(args, 2)) {
        try {
          parkingManager.create(args[1]);
        } catch (err) {
          console.log('Error: ' + err.message);
        }
      } else {
        console.log('Invalid input ' + argString);
      }
    } else if (args[0] === "park") {
      //validate inputs
      if (validateArgCount(args, 3)) {
        try {
          parkingManager.park(args[1], args[2]);
        } catch (err) {
          console.log('Error: ' + err.message);
        }
      } else {
        console.log('Invalid input ' + argString);
      }
    } else if (args[0] === "leave") {
      if (validateArgCount(args, 2)) {
        try {
          parkingManager.leave(args[1]);
        } catch (err) {
          console.log('Error: ' + err.message);
        }
      } else {
        console.log('Invalid input ' + argString);
      }
    } else if (args[0] === "status") {
      if (validateArgCount(args, 2)) {
        try {
          parkingManager.status(args[1]);
        } catch (err) {
          console.log('Error: ' + err.message);
        }
      } else {
        console.log('Invalid input ' + argString);
      }
    } else {
      console.log('Invalid input ' + argString);
    }
  }
  );
}
initLoading();