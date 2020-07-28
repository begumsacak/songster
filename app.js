const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ilhanirem51",
    database: "top_songsDB",
})

connection.connect(err => {
    if (err) throw err
    console.log(`Coonect on thread ${connection.threadId}`)
    initialPrompts()
})
// the object will be stored under the action key (since it's the name). That is why we use answer.action in switch method
function initialPrompts() {
    inquirer.prompt([
        {
            name: "action",
            message: "what do you want to do?",
            type: "list",
            choices: ["ARTIST SEARCH", "MULTI SEARCH", "RANGE SEARCH", "SONG SEARCH", "EXIT"]
        }
    ]).then(answer => {
        switch (answer.action) {
            case "ARTIST SEARCH":
                artistSearch()
                break
            case "MULTI SEARCH":
                multiSearch()
                break
            case "RANGE SEARCH":
                rangeSearch()
                break
            case "SONG SEARCH":
                songSearch()
                break
            default:
                connection.end()
                //exit back to the Terminal
                process.exit()
        }
    })
}
//artist search

function artistSearch() {
    inquirer.prompt([{
        message: "Which artist you are looking for?",
        name: "artist",
    }]).then(answer => {
        connection.query("SELECT position, artist, song, year FROM top5000 WHERE ?, 
            { artist: answer.artist },
            (err, results) => {
                if (err) throw err
                console.table(results)
                initialPrompts()
            }
        )
    })
}

function multiSearch() {
    console.log("Multi search...")
    //we will run it again after each function
    initialPrompts()
}
// a query which returns all data contained within a specific range
function rangeSearch() {
    console.log("Range search....")
    initialPrompts()
}

function songSearch() {
    console.log("Searching song...")
    initialPrompts()
}