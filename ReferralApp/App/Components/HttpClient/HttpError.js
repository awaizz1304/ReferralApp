class HttpError {
    code = 0;
    description = "";
    
    HttpError(){

    }
    HttpError(_code,_description){
        code = _code;
        description = _description;
    }
    
    getErrorMessage(){
        return this.description
    }
}
export default HttpError;