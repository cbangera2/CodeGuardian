"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState, type BaseSyntheticEvent, type MouseEvent } from "react";

type Log = {
    startTimeStamp: string;
    endTimeStamp: string;
    contentLength: number;
    action: string;
    suspicious: boolean;
    text: string;
    lineNumber: number;
    fileName: string;
    username: string;
    hash: string;
};

// Function to convert JSON object to Logs object
function convertJsonToLog(jsonData: any): Log {
    return {
        startTimeStamp: jsonData.startTimeStamp || "",
        endTimeStamp: jsonData.endTimeStamp || "",
        contentLength: jsonData.contentLength || 0,
        action: jsonData.action || "",
        suspicious: jsonData.suspicious || false,
        text: jsonData.text || "",
        lineNumber: jsonData.lineNumber || 0,
        fileName: jsonData.fileName || "",
        username: jsonData.username || "",
        hash: jsonData.hash || "",
    };
}

//"SELECT * FROM json_data"
async function fetchCustomQuery(query: string): Promise<Log[]> {
    const response = await fetch('http://localhost:3002/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
}


export default function AllSectionsDialog({ jsonLogs }: { jsonLogs: any }) {

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-3 w-full">View All Sections</Button>
          </DialogTrigger>
          <DialogContent>
                <h2>All Sections Details</h2>
                {jsonLogs.map((json, index) => {
                    const logObject = convertJsonToLog(json);
                    return (
                    <div key={index}>
                    <p>Start Time: {logObject.startTimeStamp}</p>
                    <p>Content: {logObject.text}</p>
                    {/* Add other properties as needed */}
              <hr />
            </div>
          );
        })}
            </DialogContent>
          </Dialog>
  );
}