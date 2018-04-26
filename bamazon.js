var mysql      = require('mysql');
var inquirer = require ("inquirer")
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'hpl1940t',
  database : 'bamazon'
});
 
connection.connect();

function view(){
connection.query('SELECT * FROM product', function (error, results, fields) {
  if (error) throw error;
  console.log("ID "+"Product " + "Department " + " Price " + "quantity Available")
  for(i  = 0;  i < results.length; i++){
  console.log(results[i].id+"   " + results[i].product_name +"   " + results[i].department_name +" " + results[i].price + " " +results[i].quantity);}
  buy();
});}



function buy(){
inquirer.prompt([
{
     type: "input",
     name: "dowhat",
     message: "Which Item you want to Buy (Please input Item Id?",

   },
   {
    type: "input",
    name: "quantity",
    message: "How many quantity you want?",

  },
 ]).then(function(user) {

   connection.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    var Bquantity = parseInt(user.quantity);
    var ID = (parseInt(user.dowhat))-1;
    var new_quantity = (results[ID].quantity - Bquantity);
    var ID2 = (parseInt(user.dowhat));

   if(new_quantity < 0){
    console.log("****************************");
    console.log("\n"+"\n"+"\n"+"INSUFFIENT QUANTITY!!"+"\n"+"\n"+"\n");
    console.log("****************************");
   }else{
    {
      
      connection.query(
        "UPDATE product SET ? WHERE ?",
        [
          {
            quantity: new_quantity
          },{
            id: ID2
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("****************************");
          console.log("\n"+"\n"+"\n"+"Purchase successfully!"+"\n"+"\n"+"\n");
          console.log("You bought: "+results[ID].product_name + " Quantity: " + Bquantity )
          console.log("Total Spent: $" + Bquantity*results[ID].price);
          console.log("****************************");
        }
      );
    }
   };
   
   view();
  });
   

});}
view();