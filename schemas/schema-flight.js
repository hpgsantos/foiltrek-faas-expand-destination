
const model = require('mongoose').model
const Schema = require('mongoose').Schema;

exports.DummyModel = (function() {
    
    let trekItemStructure = new Schema({
        from: {type:String, required:[true,'Atributo <from> deve ser a sigla do aeroporto']},
        to: {type:String, required:[true,'Atributo <to> deve ser a sigla do aeroporto']},
        round: {type:Boolean, required:[true,'Atributo <from> deve informar se eh voo de ida e volta']},
        range: [{type:Number, required:[true,'Atributo <range> deve informar quantidade de dias para foil']}]
    }, {_id:false});

    let dummySchema = new Schema({
        type:String,
        trek: [trekItemStructure],
    }, {timestamps: false});

    dummySchema.path('trek').validate(function(features){

        if(!features || features.length < 1)  {
            return false;
        }
            
        return true;

    }, 'Attributo <trek> precisa ter pelo menos 1 elemento');

    let mmodel = model('dummyModel',dummySchema);

    return mmodel;

})();