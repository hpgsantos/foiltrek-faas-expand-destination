/**
 * Author: Henrique Pires Goulart dos Santos <hpgsantos@gmail.com>
 * 
 */

const {helpers} = require('./helpers/helper-validate');
const DateRange = require('./classes/class-date-range');
const DummyModel = require('./schemas/schema-flight');


const validateEvent = (event) => {

    const contentSchema = new DummyModel.DummyModel(event);
    const validation  = contentSchema.validateSync();

    let errorMessages = helpers.schemaValidationHandleMessages(validation) || [];
    let code = errorMessages.length > 0 ? 400 : 200;

    return {    
            statusCode: code,
            body:errorMessages
    }
}

exports.handler = async function(event, context) {
    
    context.callbackWaitsForEmptyEventLoop = false;

    let bodyJson  = event.hasOwnProperty('body-json') ? event['body-json'] : event;

    let eventVal = validateEvent(bodyJson);
    var statusCode = eventVal.statusCode;
    var bodyResponse = [];


    //let trek = ['BSB','CGH'];
    let trek = [bodyJson.trek[0].from,bodyJson.trek[0].to];
    
    //const mmts = ['2019-01-08T00:00:00.000', '2019-01-10T00:00:00.000'];
    const mmts = bodyJson.trek[0].dates;


    let pair = 1;
    let directions = [[0,1],[1,1],[1,-1],[0,-1]];

    let foilDest = new Array(trek.length * 2).fill().map((_,idx)=>{
        return Math.ceil(idx % trek.length);
    }).map((val,idx)=>{
        return [trek[val],... directions[idx]]
    });

    // calcula diff etre as datas acima
    const da1  = new DateRange(mmts[0]); //2019-02-01
    const da2  = da1.extendWeek(40);
    
    const db1  = new DateRange(mmts[1]); //2019-02-03
    //onst db2 =   moment.duration(end.diff(startTime));
    
    let diffdays = db1.getDate().diff(da1.getDate(),'days');
    let step = Math.sqrt(diffdays **2) * 1;

    
    //berfore db1 during da2 - (mmts[1] - mmts[0])
    let mDa2 = new DateRange(da2[0]);
    const  db2 =   mDa2.walkDate(step);
    let mDb2 = new DateRange(db2[0]);
    
    
    let dateRoutes = [da1.getDatePretty(),db1.getDatePretty(),mDa2.getDatePretty(),mDb2.getDatePretty()];
    
    
    foilDest.map((val,idx)=>foilDest[idx].push(dateRoutes[idx]));
    

    return {    
        statusCode: statusCode,
        body: (eventVal.body.length == 0 ? foilDest : eventVal.body)
    }

}
