/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/cQMD8NhwWVc
 */
"use client";

import Link from "next/link"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import AllSectionsDialog from "./AllSectionsDialog";
import { ClassStats } from "@/components/ClassStats";
import { useState, useEffect } from "react";

type Log = {
  startTimeStamp: string;
  endTimeStamp: string;
  contentLength: number;
  action: string;
  text: string;
  lineNumber: number;
  fileName: string;
  hash: string;
  username: string;
};

type Metric = {
  averagetypingspeed: number;
  suspiciousedits: number;
  totaledits: number;
  totallinesedited: number;
  username: string;
}

// Function to convert JSON object to Logs object
function convertJsonToLog(jsonData: any): Log {
  return {
    startTimeStamp: jsonData.startTimeStamp || "",
    endTimeStamp: jsonData.endTimeStamp || "",
    contentLength: jsonData.contentLength || 0,
    action: jsonData.action || "",
    text: jsonData.text || "",
    lineNumber: jsonData.lineNumber || 0,
    fileName: jsonData.fileName || "",
    hash: jsonData.hash || "",
    username: jsonData.username || "",
  };
}

function convertJsonToMetric(jsonData: any): Metric {
  return {
    averagetypingspeed: jsonData.averagetypingspeed || 0,
    suspiciousedits: jsonData.suspiciousedits || 0,
    totaledits: jsonData.totaledits || 0,
    totallinesedited: jsonData.totallinesedited || 0,
    username: jsonData.username || "",
  };
}

export function TeacherView() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [jsonLogs, setJsonLogs] = useState([]);
  const [jsonMetrics, setJsonMetrics] = useState<Metric[]>([]);
  // State to track the currently selected username
  const [selectedUsername, setSelectedUsername] = useState('');

  // Effect to fetch usernames when the component mounts
  useEffect(() => {
    // Replace the following with your async function to fetch usernames
    const fetchData = async () => {
      // Fetch usernames and set them in the state
      let fetchedUsernames: { username: string }[] = []; // Initialize the fetchedUsernames variable with an empty array
      const sqlUser = 'SELECT username FROM json_data'; // Replace with your SQL command
      await (async () => {
        try {
          const response = await axios.post<any>('http://localhost:3002/query', { query: sqlUser });
          fetchedUsernames = response.data;
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      })();
      console.log(fetchedUsernames);
      const distinctUsernames = Array.from(new Set(fetchedUsernames.map(obj => obj.username)));
      setUsernames(distinctUsernames);

      // Fetch jsonLogs and set them in the state
      // Get the data from the server
      let fetchedJsonLogs: any = []; // Define a variable to hold the response data
      const sql = 'SELECT * FROM json_data'; // Replace with your SQL command
      await (async () => {
        try {
          const response = await axios.post<any>('http://localhost:3002/query', { query: sql });
          fetchedJsonLogs = response.data;
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      })();

      let fetchedJsonMetrics: any = []; // Initialize the fetchedUsernames variable with an empty array
      const sqlUsername = 'SELECT * FROM user_edit_summary'; // Replace with your SQL command
      await (async () => {
        try {
          const response = await axios.post<any>('http://localhost:3002/query', { query: sqlUsername });
          fetchedJsonMetrics = response.data;
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      })();

      console.log(fetchedJsonLogs);
      setJsonLogs(fetchedJsonLogs);
      setJsonMetrics(fetchedJsonMetrics);

      // Set the initial selected username
      if (distinctUsernames.length > 0) {
        setSelectedUsername(distinctUsernames[0]);
      }
    };

    fetchData();
  }, []);

  const [filteredSections, setFilteredSections] = useState<Log[]>([]);

  useEffect(() => {
    if (usernames.length > 0 && !selectedUsername) {
      setSelectedUsername(usernames[0]);
    }
  }, [usernames]);
  // Filter sections based on the selected username
  useEffect(() => {
    const newFilteredSections = jsonLogs.filter((section: { username: string }) => section.username === selectedUsername);
    setFilteredSections(newFilteredSections);
  }, [selectedUsername]);

  const handleUsernameChange = (direction: number) => {
    const currentIndex = usernames.indexOf(selectedUsername);
    console.log(currentIndex)
    const newIndex = (currentIndex + direction + usernames.length) % usernames.length;
    console.log(newIndex)
    setSelectedUsername(usernames[newIndex]);
    console.log(usernames[newIndex])
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
            <FrameIcon className="w-6 h-6" />
            <span className="sr-only">CodeGuardian</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className="text-gray-500 dark:text-gray-400" href="/">
              Student View
            </Link>
            <Link className="font-bold" href="#">
              Teacher View
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="/class-info">
              Class Information
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Settings
            </Link>
          </nav>

          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">

            <Button className="rounded-full ml-auto" size="icon" variant="ghost">
              <img
                alt="Avatar"
                className="rounded-full border"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        <div >
          <ClassStats />
        </div>
        <main className="flex flex-1 flex-col gap-4 max-w-6xl w-full mx-auto ">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Suspicious Sections</CardTitle>
              <CardDescription>Identify potentially plagiarized or suspicious code sections.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {filteredSections.map((jsonObject, index) => {
                const logObject = convertJsonToLog(jsonObject);
                return (
                  <div key={index}>
                    <div>{`Student Username: ${logObject.username}`}</div>
                    <div className="font-semibold">Plagiarism Likelihood: "High"</div>
                    <div className="font-semibold">Suspicious Patterns: </div>
                    <div
                      style={{
                        backgroundColor: "red",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <code>{logObject.text}</code>
                    </div>
                  </div>
                );
              })}
              <AllSectionsDialog jsonLogs={jsonLogs} />
              <div className="absolute inset-y-center left-2 flex items-center">
                <button className="rounded-full bg-gray-200 p-3" onClick={() => handleUsernameChange(-1)}>
                  {`<`}
                </button>
              </div>
              <div className="absolute inset-y-center right-2 flex items-center">
                <button className="rounded-full bg-gray-200 p-3" onClick={() => handleUsernameChange(1)}>
                  {`>`}
                </button>
              </div>
              
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Additional Submissions</CardTitle>
                <CardDescription>Select the files you want to analyze.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-10">
                <div className="grid gap-2 text-center">
                  <FileIcon className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-700" />
                  <Button className="w-full" variant="outline">
                    Select Files
                    <input className="sr-only" type="file" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Code Metrics</CardTitle>
                <CardDescription>View detailed code metrics for the submissions.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
              <table>
              <thead>
                <tr>
                  <td className="font-semibold">Username</td>
                  <td className="font-semibold">Lines of Code</td>
                  <td className="font-semibold">Complexity</td>
                  <td className="font-semibold">Quality Score</td>
                </tr>
              </thead>
              <tbody>
                {jsonMetrics.map((studentMetric, index) => {
                  const studentMetrics = convertJsonToMetric(studentMetric) || { username: '', totaledits: 0, suspiciousedits: 0, totallinesedited: 0 };
                  const percentage = (studentMetrics.totaledits - studentMetrics.suspiciousedits) / studentMetrics.totaledits * 100;

                  return (
                    <tr key={index}>
                      <td className="font-semibold">{ studentMetrics.username }</td>
                      <td>{studentMetrics.totaledits}</td>
                      <td>{studentMetrics.suspiciousedits}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

    </>
  )
}


function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
