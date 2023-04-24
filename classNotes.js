import { createInterface} from 'readline';

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

class Employee{
    constructor(id, name){
        this._id = id
        this._name = name
    }
    toString(){
        return `Id : ${this._id} Name : ${this._name} `;
    }
}

let map = new Map();
const readLineAsync = msg =>{
    return new Promise(resolve=>{
        readLine.question(msg, userEntry=>{
            resolve(userEntry);
        })
    })
}

const readInput = async()=>{
    const response = await readLineAsync("Please enter something !");
    readLine.close()
    console.log("The Response was "+ response);
}
readInput()