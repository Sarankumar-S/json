/* State gender draduate csv to json */

//Adding the required modules
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

//Creating Streams to read csv file
var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
var outstream = new stream();

//Creating Interface for user interaction
var rl = readline.createInterface(instream, outstream);

//Array for storing state male and female graduate details
var graddata = [];

//function to find index of state name
function findIndexGrad(stateName){
  var i = graddata.length;
  var index = -1;

  //Loop to find the index of state name
  while(i--){
    if(stateName == graddata[i]['State-Name']){
      index = i;
      break;
    }
  }

  //Returning the index of state name
  return index;
}

//Reading the csv file line by line
rl.on('line', function(line) {
    var currentLine = line.split(',');

    //Checking conditions for picking the required line
    if (currentLine[4] === 'Total' && currentLine[5] === 'All ages') {

      //Calling findIndexGrad funcion for finding the index of the state name
      var index = findIndexGrad(currentLine[3]);
      var eachObj = {};

      //Storing the state name total graduate name and female graduate respective population in each object
      eachObj['State-Name'] = currentLine[3];
      eachObj['Total-Graduate'] = +currentLine[39];
      eachObj['Total-Female'] = +currentLine[40];
      eachObj['Total-Male'] = +currentLine[41];

      //Index available means sum and store the popoulation in result
      if(index !== -1){
        var result = graddata[index];

        result['Total-Graduate'] += eachObj['Total-Graduate'];
        result['Total-Female'] += eachObj['Total-Female'];
        result['Total-Male'] += eachObj['Total-Male'];

        graddata[index] = result;
      }
      else {
        graddata.push(eachObj);
      }
    }
});
//End of rl.line

//Creating json file from the state male and female graduate population in csv
rl.on('close', function() {
    fs.writeFile('../json/state_gender_graduate_json.json', JSON.stringify(graddata, null, 2), 'utf8', function(error) {

        //Incase file not preseent error message will appear on console
        if (error) {
            console.log(error);
        }
    });
});
//End of rl.close
