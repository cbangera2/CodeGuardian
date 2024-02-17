import json
from datetime import datetime, timedelta
def flagTypingSpeed(json_data, currentTypingSpeed, totalCharsTyped, totalTime, susLog):
    #if json_data["edits"]["wasTyping"] and not json_data["edits"]["suspicious"]:
    startTime = datetime.fromisoformat(json_data["startTimeStamp"].replace('Z', ''))
    endTime = datetime.fromisoformat(json_data["endTimeStamp"].replace('Z', ''))
    if startTime < endTime: 
        editTime = (endTime - startTime).total_seconds() / 60 # we're doing characters per min
        typingSpeed = json_data["contentLength"] / editTime
    if startTime == endTime or typingSpeed >= currentTypingSpeed * 2:
        modifiedLog = json_data
        modifiedLog["action"] = "typing too fast"
        modifiedLog["suspicious"] = True
        susLog.append(modifiedLog)
        return currentTypingSpeed, totalCharsTyped, totalTime, susLog
    else:
        totalTime += editTime
        totalCharsTyped += json_data["contentLength"]
        return totalCharsTyped / totalTime, totalCharsTyped, totalTime, susLog