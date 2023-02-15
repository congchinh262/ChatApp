import moment from "moment"

export const formatMsgTimestamp = (time:Date)=>{
    return moment(time).format('YYYY-MM-DD HH:mm:ss').toString()
}