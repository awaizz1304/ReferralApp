import HttpError from "../../HttpClient/HttpError";
import ReferralsData from "./DataModels/ReferralsData";
import RewardsDataModel from "./DataModels/RewardsDataModel";

class MockDataService {
    getBadgePath (badge) {
        path = ""
        if(badge == "Bronze"){
            path = '../../Assets_icons/Dashboard/Bronzemedalsmall1x.png'
        }
        else if (badge == "Silver"){
            path = '../../Assets_icons/Dashboard/Silvermedalsmall1x.png'
        }
        return path;
    }
    getDashboardRecords(type,successCallBack,errorCallBack){
        setTimeout(() => {
            listOfData = []
            if(type == "inprocess"){
                ReferralsData1 = new ReferralsData()
                ReferralsData1.id = 1
                ReferralsData1.name = "Awais"
                ReferralsData1.time = "10 mins ag0"

                listOfData.push(ReferralsData1)

                ReferralsData2 = new ReferralsData()
                ReferralsData2.id = 2
                ReferralsData2.name = "Shafqat"
                ReferralsData2.time = "2 days ago"

                listOfData.push(ReferralsData2)

                ReferralsData3 = new ReferralsData()
                ReferralsData3.id = 3
                ReferralsData3.name = "Minhaj"
                ReferralsData3.time = "5 mins ago"

                listOfData.push(ReferralsData3)

                ReferralsData4 = new ReferralsData()
                ReferralsData4.id = 4
                ReferralsData4.name = "Bilal"
                ReferralsData4.time = "1 year ago"

                listOfData.push(ReferralsData4)

                ReferralsData5 = new ReferralsData()
                ReferralsData5.id = 5
                ReferralsData5.name = "Bilal"
                ReferralsData5.time = "1 year ago"

                listOfData.push(ReferralsData5)

                ReferralsData6 = new ReferralsData()
                ReferralsData6.id = 6
                ReferralsData6.name = "Bilal"
                ReferralsData6.time = "1 year ago"

                listOfData.push(ReferralsData6)

                ReferralsData7 = new ReferralsData()
                ReferralsData7.id = 7
                ReferralsData7.name = "Bilal"
                ReferralsData7.time = "1 year ago"

                listOfData.push(ReferralsData7)

                // ReferralsData8 = new ReferralsData()
                // ReferralsData8.id = 8
                // ReferralsData8.name = "Bilal"
                // ReferralsData8.time = "1 year ago"

                // listOfData.push(ReferralsData8)

                // ReferralsData9 = new ReferralsData()
                // ReferralsData9.id = 9
                // ReferralsData9.name = "Bilal"
                // ReferralsData9.time = "1 year ago"

                // listOfData.push(ReferralsData9)

                // ReferralsData10 = new ReferralsData()
                // ReferralsData10.id = 10
                // ReferralsData10.name = "Bilal"
                // ReferralsData10.time = "1 year ago"

                // listOfData.push(ReferralsData10)

                // ReferralsData11 = new ReferralsData()
                // ReferralsData11.id = 11
                // ReferralsData11.name = "Bilal"
                // ReferralsData11.time = "1 year ago"

                // listOfData.push(ReferralsData11)
                
            }
            if(type == "pending"){
                ReferralsData1 = new ReferralsData()
                ReferralsData1.id = 1
                ReferralsData1.name = "Mike"
                ReferralsData1.time = "4 hrs ago"

                listOfData.push(ReferralsData1)

                ReferralsData2 = new ReferralsData()
                ReferralsData2.id = 2
                ReferralsData2.name = "Chris"
                ReferralsData2.time = "2 secs ago"

                listOfData.push(ReferralsData2)

                ReferralsData3 = new ReferralsData()
                ReferralsData3.id = 3
                ReferralsData3.name = "Shahid"
                ReferralsData3.time = "25 mins ago"

                listOfData.push(ReferralsData3)
                
            }

            if(type == "rewards"){
                ReferralsData1 = new ReferralsData()
                ReferralsData1.id = 1
                ReferralsData1.name = "Usman Aziz"
                ReferralsData1.prize = 5000
                ReferralsData1.badge = "Silver"
                ReferralsData1.time = "30 mins ag0"
                listOfData.push(ReferralsData1)

                ReferralsData2 = new ReferralsData()
                ReferralsData2.id = 2
                ReferralsData2.name = "Ahmed Hasan"
                ReferralsData2.prize = 2000
                ReferralsData2.time = "2 days ago"
                ReferralsData2.badge = "Bronze"
                listOfData.push(ReferralsData2)

                ReferralsData3 = new ReferralsData()
                ReferralsData3.id = 3
                ReferralsData3.name = "Qasim Ali"
                ReferralsData3.prize = 2000
                ReferralsData3.time = "2 days ago"
                ReferralsData3.badge = "Bronze"
                listOfData.push(ReferralsData3)

                ReferralsData4 = new ReferralsData()
                ReferralsData4.id = 4
                ReferralsData4.name = "Junaid Ansari"
                ReferralsData4.prize = 2000
                ReferralsData4.time = "2 days ago"
                ReferralsData4.badge = "Silver"
                listOfData.push(ReferralsData4)

                ReferralsData5 = new ReferralsData()
                ReferralsData5.id = 5
                ReferralsData5.name = "Junaid Ansari"
                ReferralsData5.prize = 2000
                ReferralsData5.time = "2 days ago"
                ReferralsData5.badge = "Silver"
                listOfData.push(ReferralsData5)

                ReferralsData6 = new ReferralsData()
                ReferralsData6.id = 6
                ReferralsData6.name = "Junaid Ansari"
                ReferralsData6.prize = 2000
                ReferralsData6.time = "2 days ago"
                ReferralsData6.badge = "Silver"
                listOfData.push(ReferralsData6)
            }

            successCallBack(listOfData)
        }, 2000);
    }
    
    referFriend(referDataModel,successCallBack,errorCallBack){
        setTimeout(() => {
            successCallBack()
        },2000)
    }
    getRewards(successCallBack,errorCallBack){
        listOfData = []
        setTimeout(() => {
            rewarddData1 = new RewardsDataModel()
            rewarddData1.id = 1
            rewarddData1.name = "Ayesha Hassan"
            rewarddData1.prize = 10000
            rewarddData1.system = "10 kW"
            rewarddData1.level = "Gold"
            rewarddData1.time = "2 days"

            listOfData.push(rewarddData1)

            rewarddData2 = new RewardsDataModel()
            rewarddData2.id = 2
            rewarddData2.name = "Ali Baloch"
            rewarddData2.prize = 5000
            rewarddData2.system = "5.5 kW"
            rewarddData2.level = "Silver"
            rewarddData2.time = "2 days"

            listOfData.push(rewarddData2)

            rewarddData3 = new RewardsDataModel()
            rewarddData3.id = 3
            rewarddData3.name = "Ghani Bangash"
            rewarddData3.prize = 20000
            rewarddData3.system = "50 kW"
            rewarddData3.level = "Platinium"
            rewarddData3.time = "2 days"

            listOfData.push(rewarddData3)

            successCallBack(listOfData)
        },2000)
        
    }
    getAllReferrals(successCallBack,errorCallBack){
        listOfData = []

        setTimeout (() => {
            referralData1 = new ReferralsData()
            referralData1.id = 1
            referralData1.name = "Awais Khan"
            referralData1.time = "2 days ago"
            referralData1.status = "Pending"

            listOfData.push(referralData1)

            referralData2 = new ReferralsData()
            referralData2.id = 2
            referralData2.name = "Shafqat Jamil"
            referralData2.time = "1 mins ago"
            referralData2.status = "Pending"
            
            listOfData.push(referralData2)

            referralData3 = new ReferralsData()
            referralData3.id = 3
            referralData3.name = "Minhaj Javed"
            referralData3.time = "2 years ago"
            referralData3.status = "Declined"
            
            listOfData.push(referralData3)

            referralData4 = new ReferralsData()
            referralData4.id = 4
            referralData4.name = "Muhammad Bilal"
            referralData4.time = "3 hrs ago"
            referralData4.status = "In Process"
            
            listOfData.push(referralData4)

            referralData5 = new ReferralsData()
            referralData5.id = 5
            referralData5.name = "Irum Manzoor"
            referralData5.time = "4 secs ago"
            referralData5.status = "In Process"
            
            listOfData.push(referralData5)

            referralData6 = new ReferralsData()
            referralData6.id = 6
            referralData6.name = "Anas Iqbal"
            referralData6.time = "1 day ago"
            referralData6.status = "Declined"
            
            listOfData.push(referralData6)

            referralData7 = new ReferralsData()
            referralData7.id = 7
            referralData7.name = "Uzair Tariq"
            referralData7.time = "2 days ago"
            referralData7.status = "Pending"
            
            listOfData.push(referralData7)

            successCallBack(listOfData)
        },2000)
    }
}
export default MockDataService