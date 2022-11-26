const { readdirSync } = require("fs"); //this is the Node.js native package for reading files and directories
const ascii = require("ascii-table"); //this is a cool package to make a ascii table
let table = new ascii("Commands"); // ascii table
table.setHeading("Command", "Load status"); //set the table heading
console.log("Welcome to SERVICE HANDLER /--/ By https://milrato.eu /--/ Discord: Tomato#6966".yellow); 
module.exports = (client) => { //exporting the module
  try{ //try to read the directory
    readdirSync("./commands/").forEach((dir) => { //readdirSync reads the directory
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js")); //get all the commands
        for (let file of commands) { //loop over all the commands
            let pull = require(`../commands/${dir}/${file}`); //get the command
            if (pull.name) { //if the command has a name
                client.commands.set(pull.name, pull); //set the command in the collection with the name as key
                table.addRow(file, "Ready"); //add the command to the table
            } else { //if the command has no name
                table.addRow(file, `error->missing a help.name,or help.name is not a string.`); //add the command to the table with an error
                continue; //skip the rest of the code
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name)); //set the aliases in the collection
        }
    });
    console.log(table.toString().cyan); //log the table
  }catch (e){
    console.log(String(e.stack).bgRed) //if an error occurs log it
  }
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
