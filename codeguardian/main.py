import json
from datetime import datetime

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

def merge_suspicious_edits(edits):
    # This function merges edits that are within 5 seconds of each other
    merged = []
    for edit in edits:
        if not merged:
            merged.append(edit)
        else:
            last = merged[-1]
            last_end_time = datetime.fromisoformat(last["endTimeStamp"].replace('Z', '+00:00'))
            current_start_time = datetime.fromisoformat(edit["startTimeStamp"].replace('Z', '+00:00'))
            # If the current start time is within 5 seconds of the last end time, merge them
            if (current_start_time - last_end_time).total_seconds() <= 10:
                # Update the last edit's end time if the current edit ends later
                if edit["endTimeStamp"] > last["endTimeStamp"]:
                    last["endTimeStamp"] = edit["endTimeStamp"]
                # Append the text of the current edit to the last edit
                last["text"] += " " + edit["text"]
                last["contentLength"] += edit["contentLength"]
            else:
                merged.append(edit)
    return merged

def remove_short_edits(edits):
    # This function removes edits with text lengths under 5 words
    return [edit for edit in edits if len(edit["text"].split()) >= 5]


if __name__ == "__main__":
    # Read the existing JSON log file
    with open("./analytics.json", "r") as file:
        logCollection = json.load(file)

    # Extract the suspicious logs list
    susLog = logCollection["suspiciousEditDetails"]

    # Start processing from the first item
    idx = 0
    item = logCollection["normalEditDetails"][idx]
    while item["startTimeStamp"] == item["endTimeStamp"]:
        modifiedLog = item.copy()  # Use copy() to avoid modifying the original item in-place
        modifiedLog["action"] = "typing too fast"
        modifiedLog["suspicious"] = True
        susLog.append(modifiedLog)
        idx += 1
        item = logCollection["normalEditDetails"][idx]

    # Calculate typing speed for the next item
    startTime = datetime.fromisoformat(item["startTimeStamp"].replace('Z', ''))
    endTime = datetime.fromisoformat(item["endTimeStamp"].replace('Z', ''))
    totalTime = (endTime - startTime).total_seconds() / 60
    totalCharsTyped = item["contentLength"]
    currentTypingSpeed = totalCharsTyped / totalTime

    # Process remaining items
    for i in range(idx + 1, len(logCollection["normalEditDetails"])):
        currentTypingSpeed, totalCharsTyped, totalTime, susLog = flagTypingSpeed(
            logCollection["normalEditDetails"][i],
            currentTypingSpeed,
            totalCharsTyped,
            totalTime,
            susLog
        )

    # Update the suspicious logs in the log collection
    logCollection["suspiciousEditDetails"] = susLog

    # Write the updated log collection to a new file
    with open("./updatedAnalytics.json", "w") as file:
        json.dump(logCollection, file, indent=2)

    with open("./updatedAnalytics.json", "r") as file:
        logCollection = json.load(file)
    
    # Sort the suspicious edit details by start time
    susEdits = sorted(logCollection["suspiciousEditDetails"], key=lambda x: x["startTimeStamp"])
    
    # Merge suspicious edits that are within 5 seconds of each other
    mergedSusEdits = merge_suspicious_edits(susEdits)
    
    filteredSusEdits = remove_short_edits(mergedSusEdits)
    
    # Update the suspiciousEditDetails and suspiciousEdits count
    logCollection["suspiciousEditDetails"] = filteredSusEdits
    logCollection["suspiciousEdits"] = len(filteredSusEdits)
    
    # Write the updated log collection to a new file
    with open("./updatedAnalytics.json", "w") as file:
        json.dump(logCollection, file, indent=2)
