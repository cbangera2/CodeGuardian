/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/7ySGmG985CL
 */
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { StudentDropdown } from "@/app/student-view/StudentDropdown"


export function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [filename, setFilename] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">CodeGuardian</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link className="font-bold" href="#">
            Student View
          </Link>
          <Link className="text-gray-500 dark:text-gray-400 flex items-center" href="/teacher-view">
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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-2">
          <h1 className="font-semibold text-3xl">CodeGuardian</h1>
          <p className="text-gray-500 md:w-[80%] dark:text-gray-400">
            Analyze and compare the performance of different students.
          </p>
          <div></div>
          <div></div>
        </div>
        
        <p className="font-semibold text-2xl">Welcome, Bob:</p>

        <StudentDropdown students={['Project 1']} setSelectedStudent={setSelectedStudent} />

        {selectedStudent ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Submissions</CardTitle>
              <CardDescription>Select the files you want to analyze.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-10">
              <div className="grid gap-2 text-center">
                
                <label htmlFor="file-input" className="w-full">
                  <FileIcon className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-700" />
                  Select Files

                  <input id="file-input" className="sr-only" type="file" onChange={handleFileChange}  />
                </label>
                <Button className="w-full" variant="ghost" onClick={handleUpload}>
                Upload
                </Button>
                {filename && <p>Selected file: {filename}</p>}

              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Code Metrics</CardTitle>
              <CardDescription>View detailed code metrics for the submissions.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div></div>
                <div>Submission 1</div>
                <div>Submission 2</div>
                <div className="font-semibold">Lines of Code</div>
                <div>120</div>
                <div>95</div>
                <div className="font-semibold">Complexity</div>
                <div>10</div>
                <div>8</div>
                <div className="font-semibold">Quality Score</div>
                <div>85%</div>
                <div>92%</div>
                <div className="font-semibold">Characters Per Minute</div>
                <div>26</div>
                <div>42</div>
              </div>
            </CardContent>
          </Card>

        </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Select a project to view details.</p>
        )}

      </main>
    </div>
  )
}


function FrameIcon(props: any) {
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
