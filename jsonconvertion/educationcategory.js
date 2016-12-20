/* Education category csv to json */

//Adding the required modules
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

//Creating Streams to read csv file
var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
var outstream = new stream();

//Creating Interface for user interaction
var rl = readline.createInterface(instream, outstream);

//Array for storing education category details
var categories = [];

var eachObj = {};

//Reading the csv file line by line
rl.on('line', function(line) {
 var row = line.split(',');

 //Checking conditions for picking the required line
 if(row[3] === 'INDIA' && row[5] === "All ages" && row[4] === 'Total'){

   //Checking the presence of data in categories
   if(categories.length === 0){

     //Pushing data into categories for the first time
     categories.push({
                      'Literate': +row[12],
                      'Literate without Education': +row[15],
                      'Below Primary': +row[18],
                      'Primary': +row[21],
                      'Middle': +row[24],
                      'Matric/Secondary': +row[27],
                      'Higher secondary/Intermediate/Pre-University/Senior secondary': +row[30],
                      'Non-technical diploma or certificate not equal to degree': +row[33],
                      'Technical diploma or certificate not equal to degree': +row[36],
                      'Graduate & above': +row[39],
                      'Unclassified' : +row[42]
                    });
                    //End of pushing data into categories for the first time
    }else{

        //Updating data into categories
       categories[0]['Literate'] =  categories[0]['Literate'] + +row[12];
       categories[0]['Literate without Education'] = categories[0]['Literate without Education'] + +row[15];
       categories[0]['Below Primary'] = categories[0]['Below Primary'] + +row[18];
       categories[0]['Primary'] = categories[0]['Primary'] + +row[21];
       categories[0]['Middle'] = categories[0]['Middle'] + +row[24];
       categories[0]['Matric/Secondary'] = categories[0]['Matric/Secondary'] + +row[27];
       categories[0]['Higher secondary/Intermediate/Pre-University/Senior secondary'] =  categories[0]['Higher secondary/Intermediate/Pre-University/Senior secondary'] + +row[30];
       categories[0]['Non-technical diploma or certificate not equal to degree'] =  categories[0]['Non-technical diploma or certificate not equal to degree'] + +row[33];
       categories[0]['Technical diploma or certificate not equal to degree'] =  categories[0]['Technical diploma or certificate not equal to degree'] + +row[36];
       categories[0]['Graduate & above'] = categories[0]['Graduate & above'] + +row[39];
       categories[0]['Unclassified'] = categories[0]['Unclassified'] + +row[42];
     }
     //Updating categories of else ends
   }
   //condition if ends
});
//End of rl.line

//Creating json file from the education category population in csv
rl.on('close', function() {
    fs.writeFile('../json/education_category_json.json', JSON.stringify(categories, null, 2), 'utf8', function(error) {

        //Incase file not preseent error message will appear on console
        if (error) {
            console.log(error);
        }
    });
});
//End of rl.close
