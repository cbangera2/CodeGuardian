import json
from datetime import datetime, timedelta
def flagTypingSpeed(json_data, currentTypingSpeed, totalCharsTyped, totalTime, susLog):
    if json_data["edits"]["wasTyping"] and not json_data["edits"]["suspicious"]:
        startTime = datetime.fromisoformat(json_data["edits"]["startTimestamp"])
        endTime = datetime.fromisoformat(json_data["edits"]["endTimestamp"])
        editTime = (endTime - startTime).total_seconds() / 60 # we're doing characters per min
        typingSpeed = json_data["edits"]["contentLength"] / editTime
        if typingSpeed >= currentTypingSpeed * 2:
            modifiedLog = json_data
            modifiedLog["edits"]["suspicious"] = "typing too fast"
            modifiedLog["analytics"]["suspiciousPatternsDetected"] += 1
            susLog.append(modifiedLog)
            return currentTypingSpeed, totalCharsTyped, totalTime, susLog
        else:
            totalTime += editTime
            totalCharsTyped += json_data["edits"]["contentLength"]
            return totalCharsTyped / totalTime, totalCharsTyped, totalTime, susLog
    return currentTypingSpeed, totalCharsTyped, totalTime, susLog