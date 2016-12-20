var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
var outstream = new stream();

var rl = readline.createInterface(instream, outstream);


var agedata = [];

function findIndexAge(ageGroup){
  var i = agedata.length;
  var index = -1;

  while(i--){
    if(ageGroup == agedata[i]['agegroup']){
      index = i;
      break;
    }
  }

}
  return index;

rl.on('line', function(line) {
    var eachObj = {};
    var currentLine = line.split(',');

    //Checking conditions for picking the required line
    if(currentLine[3] == 'INDIA' && currentLine[4] == 'Total'){

      //Storing the age group and respective population in each object
      eachObj['agegroup'] = currentLine[5];
      eachObj['population'] = +currentLine[12];

      //Calling findIndexAge funcion for finding the index of the age group
      var index = findIndexAge(currentLine[5]);

      //Index available means sum and store the popoulation in result
      if(index != -1){
        var result = agedata[index];
        agedata[index] = result;
        result['population'] += eachObj['population'];
      }
      else{
        agedata.push(eachObj);
      }
    }
});

rl.on('close', function() {
    fs.writeFile('../json/age_wise_json.json', JSON.stringify(agedata, null, 2), 'utf8', function(error) {

        //Incase file not preseent error message will appear on console
        if (error) {
            console.log(error);
        }
    });
    //End of rl.close
});
