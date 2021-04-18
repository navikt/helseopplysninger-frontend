import {fkrGetPatient} from "../../libs/fkr-client/src/index";

export class SomeClass {
    public someMember = 'hi there';
}
fkrGetPatient({

}).then(p=>{
    console.log(p);
})
console.log('hello from scripts!', process.env);


