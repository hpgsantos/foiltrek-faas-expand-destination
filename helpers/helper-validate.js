exports.helpers = (function() {

    const schemaValidationHandleMessages = (validations) => {
        
        var errorMessages = [];

        if(validations && validations !== 'undefined') {
            if(validations.hasOwnProperty('errors')) {
                
                let arrErrors = Object.getOwnPropertyNames(validations.errors);

                arrErrors.map((valError,idx) => {
                    if(validations.errors[valError] && validations.errors[valError].message) {
                        errorMessages.push({"message":validations.errors[valError].message})
                    }
                })
            }
        }

        return errorMessages
    }
 
     return {schemaValidationHandleMessages}
 })();