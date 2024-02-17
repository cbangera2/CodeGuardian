import json
from flag import flagTypingSpeed
from datetime import datetime, timedelta
if __name__ == "__main__":
    with open("your_collection_of_logs.json", "r") as file:
        logCollection = json.load(file)
    susLog = []
    idx = 0
    item = logCollection[idx]
    while item["edits"]["suspicious"]:
        idx += 1
        item = logCollection[idx]
        susLog.append(item)

    startTime = datetime.fromisoformat(item["edits"]["startTimestamp"])
    endTime = datetime.fromisoformat(item["edits"]["endTimestamp"])
    totalTime = (endTime - startTime).total_seconds() / 60
    totalCharsTyped = item["edits"]["contentLength"]
    currentTypingSpeed = totalCharsTyped / totalTime


    for i in range (idx, len(logCollection)):
        currentTypingSpeed, totalCharsTyped, totalTime, susLog = flagTypingSpeed(logCollection[i], currentTypingSpeed, totalCharsTyped, totalTime, susLog)

    


