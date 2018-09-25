import DefaultPreference from 'react-native-default-preference';

class SharedPrefences {
    SaveValueForKey(key,value){
        DefaultPreference.set(key,value).then(
            function(){
                str = value + " for " + key + " Saved ";
                console.log(str);
            }
        )
    }
    GetValueForKey(key,valueResponse){
        DefaultPreference.get(key).then(
            function(value){
                str = value + " for " + key + " Retrived ";
                console.log(str)
                if(value == undefined || value == ""){
                    value = null;
                }
                valueResponse(value);
                
            }
        )
    }
}
export default SharedPrefences;