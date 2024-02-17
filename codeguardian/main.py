import json
from flag import flagTypingSpeed
from datetime import datetime
if __name__ == "__main__":
    with open("./analytics.json", "r") as file:
        logCollection = json.load(file)
    susLog = logCollection["suspiciousEditDetails"]
    idx = 0
    item = logCollection["normalEditDetails"][idx]
    while item["startTimeStamp"] == item["endTimeStamp"]:
        modifiedLog = item
        modifiedLog["action"] = "typing too fast"
        modifiedLog["suspicious"] = True
        susLog.append(modifiedLog)
        idx += 1
        item = logCollection["normalEditDetails"][idx]

    startTime = datetime.fromisoformat(item["startTimeStamp"].replace('Z', ''))
    endTime = datetime.fromisoformat(item["endTimeStamp"].replace('Z', ''))
    totalTime = (endTime - startTime).total_seconds() / 60
    totalCharsTyped = item["contentLength"]
    currentTypingSpeed = totalCharsTyped / totalTime


    for i in range (idx + 1, len(logCollection["normalEditDetails"])):
        currentTypingSpeed, totalCharsTyped, totalTime, susLog = flagTypingSpeed(logCollection["normalEditDetails"][i], currentTypingSpeed, totalCharsTyped, totalTime, susLog)
    
    print(json.dumps(susLog, indent=2))
    


