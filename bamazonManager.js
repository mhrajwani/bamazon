var mysql      = require('mysql');
var inquirer = require ("inquirer")
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'hpl1940t',
  database : 'bamazon'
});
 
connection.connect();

function viewSale(){
connection.query('SELECT * FROM product', function (error, results, fields) {
  if (error) throw error;
  console.log("\n"+"*********ITEM AVAILABLE*************"+"\n");
  console.log("ID "+"Product " + "Department " + " Price " + "quantity Available")
  for(i  = 0;  i < results.length; i++){
  console.log(results[i].id+"   " + results[i].product_name +"   " + results[i].department_name +" " + results[i].price + " " +results[i].quantity);}
  console.log("****************************");
  start()
});}

function viewLow(){
    console.log("*********LOW INVENTORY*************");
    connection.query('SELECT * FROM product', function (error, results, fields) {
      if (error) throw error;
      console.log("ID "+"Product " + "Department " + " Price " + "quantity Available")
      for(i  = 0;  i < results.length; i++){
          if(results[i].quantity <5){
      console.log(results[i].id+"   " + results[i].product_name +"   " + results[i].department_name +" " + results[i].price + " " +results[i].quantity);}
      
    }
    start()
    });}

function addInventory(){
    inquirer.prompt([
        {
             type: "input",
             name: "update",
             message: "Which Item to Add inventory (Please input Item Id?",
        
           },
           {
            type: "input",
            name: "quantity",
            message: "How many quantity do want to add?",
        
          },
         ]).then(function(user) {
            connection.query('SELECT * FROM product', function (error, results, fields) {
                if (error) throw error;
            var Bquantity = parseInt(user.quantity);
            var ID = (parseInt(user.update))-1;
            var new_quantity = (results[ID].quantity + Bquantity);
            var ID2 = (parseInt(user.update));
    
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
                  console.log("\n"+"\n"+"\n"+"Update successfully!"+"\n"+"\n"+"\n");
                  console.log("You Updated: "+results[ID].product_name + " Quantity: " + Bquantity )
                  console.log("Current Invertory: " + new_quantity);
                  console.log("****************************");
                  start()
                }
              );
          });
          
        })}

    function addNew(){
        inquirer
            .prompt([
                {
                  name: "product",
                  type: "input",
                  message: "What is the new item you would like to add?"
                },
                {
                  name: "department",
                  type: "input",
                  message: "Which department?"
                },
                {
                  name: "price",
                  type: "input",
                  message: "What is the selling price?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Whats the quantity?",
                }
              ])
              .then(function(answer) {
                connection.query(
                  "INSERT INTO product SET ?",
                  {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    quantity: answer.quantity
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("****************************");
                    console.log("\n"+"\n"+"\n"+"Your product created successfully!"+"\n"+"\n"+"\n");
                    console.log("****************************");
                    start()
                  }
                );
              });
            }
    
    function start(){
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "Would you like to [VIEW] all available item, [ADD] new product, add [INVENTORY] or view product with[LOW] inventory?",
            choices: ["VIEW", "ADD", "INVENTORY","LOW"]
        })
        .then(function(answer) {
            if (answer.action === "VIEW") {
              viewSale();
            } else if(answer.action === "ADD") {
              addNew()
            } else if(answer.action  === "LOW") {
                viewLow();
              }else {
              addInventory();
            }
          });
    }
    start();