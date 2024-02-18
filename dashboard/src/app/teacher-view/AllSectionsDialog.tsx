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
    hash: string;
};

// Function to convert JSON object to Species object
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
        hash: jsonData.hash || "",
    };
}

export default function AllSectionsDialog({ jsonLogs }: { jsonLogs: any }) {

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-3 w-full">View All Sections</Button>
          </DialogTrigger>
          <DialogContent>
                <h2>All Sections Details</h2>
                {jsonLogs.map((innerArray, outerIndex) => (
                    <div key={outerIndex}>
                        <p>Array Order: {outerIndex + 1}</p>
                        {innerArray.map((json, innerIndex) => {
                            const species = convertJsonToLog(json);
                            return (
                                <div key={innerIndex}>
                                    <p>Start Time: {species.startTimeStamp}</p>
                                    {/* Add other properties as needed */}
                                </div>
                            );
                        })}
                        <hr />
                    </div>
                ))}
            </DialogContent>
          </Dialog>
  );
}