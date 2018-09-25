
class ADVLogger {
    static instance = null;
    
    static createInstance(){
        if(this.instance == null){
            this.instance = new ADVLogger();
        }
        return this.instance;
    }
    static getInstance(){
        return this.instance;
    }
    static i(tag,className,functionName,message){
        date = new Date().toLocaleString()+": ";
        text = " :Info from: ";
        data = className+" : "+functionName+" : "+message;

        console.log(date+tag+text+data);
    }
    static e(tag,className,functionName,message){
        date = new Date().toLocaleString()+": ";
        text = " :Error from: ";
        data = className+" : "+functionName+" : "+message;

        console.log(date+tag+text+data);
    }
    static w(tag,className,functionName,message){
        date = new Date().toLocaleString()+": ";
        text = " :Warning from: ";
        data = className+" : "+functionName+" : "+message;

        console.log(date+tag+text+data);
    }
}
export default ADVLogger;