/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/cQMD8NhwWVc
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import AllSectionsDialog from "./AllSectionsDialog";
import { ClassStats } from "@/components/ClassStats";

export function TeacherView() {
  const jsonLogs = [
    [{
  "startTimeStamp": "2024-02-17T09:12:27.483Z",
  "endTimeStamp": "2024-02-17T09:12:33.826Z",
  "contentLength": 8,
  "action": "typing",
  "suspicious": false,
  "text": "int k=3;",
  "lineNumber": 28,
  "fileName": "/Users/cbang/Documents/TreeHacks/test.cpp",
  "hash": "976d3077d3d2c46b93efa2f205279110b6e8e7872337dd5b8ebf0e509f975fcf"
}],
[
{
  "startTimeStamp": "2024-02-17T09:12:35.048Z",
  "endTimeStamp": "2024-02-17T09:12:35.048Z",
  "contentLength": 12,
  "action": "typing",
  "suspicious": false,
  "text": "for int i=0;",
  "lineNumber": 29,
  "fileName": "/Users/cbang/Documents/TreeHacks/test.cpp",
  "hash": "dcdab1f8428acd73caf66615612aa3fbbbb539e6d01b15d161632f95711f6a17"
}]]
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
            <Link className="text-gray-500 dark:text-gray-400" href="#">
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div>Section 1</div>
                  <div className="font-semibold">Plagiarism Likelihood</div>
                  <div>High</div>
                  <div className="font-semibold">Suspicious Patterns</div>
                  <div
                    style={{
                      backgroundColor: "red",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <code>
                      {`
                                                                                                                                                                                                                                                                                                                                                                          // Suspicious code section here
                                                                                                                                                                                                                                                                                                                                                                          function suspiciousFunction() {
                                                                                                                                                                                                                                                                                                                                                                            return 'Suspicious behavior detected';
                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                        `}
                    </code>
                  </div>
                </div>
                <div>
                  <div>Section 2</div>
                  <div className="font-semibold">Plagiarism Likelihood</div>
                  <div>Medium</div>
                  <div className="font-semibold">Suspicious Patterns</div>
                  <div
                    style={{
                      backgroundColor: "red",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <code>
                      {`
                                                                                                                                                                                                                                                                                                                                                                          // Suspicious code section here
                                                                                                                                                                                                                                                                                                                                                                          function suspiciousFunction() {
                                                                                                                                                                                                                                                                                                                                                                            return 'Suspicious behavior detected';
                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                        `}
                    </code>
                  </div>
                </div>
                <div>
                  <div>Section 3</div>
                  <div className="font-semibold">Plagiarism Likelihood</div>
                  <div>Low</div>
                  <div className="font-semibold">Suspicious Patterns</div>
                  <div
                    style={{
                      backgroundColor: "red",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <code>
                      {`
                                                                                                                                                                                                                                                                                                                                                                          // Suspicious code section here
                                                                                                                                                                                                                                                                                                                                                                          function suspiciousFunction() {
                                                                                                                                                                                                                                                                                                                                                                            return 'Suspicious behavior detected';
                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                        `}
                    </code>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-center left-2 flex items-center">
                <button className="rounded-full bg-gray-200 p-3" onClick={undefined}>
                  {`<`}
                </button>
              </div>
              <div className="absolute inset-y-center right-2 flex items-center">
                <button className="rounded-full bg-gray-200 p-3" onClick={undefined}>
                  {`>`}
                </button>
              </div>
              <AllSectionsDialog jsonLogs={ jsonLogs } />
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
                  <Button className="w-full" variant="ghost">
                    Add from GitHub
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
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div />
                  <div className="font-semibold">Lines of Code</div>
                  <div className="font-semibold">Complexity</div>
                  <div className="font-semibold">Quality Score</div>
                  <div className="font-semibold">Student 1</div>
                  <div>120</div>
                  <div>10</div>
                  <div>85%</div>
                  <div className="font-semibold">Student 2</div>
                  <div>95</div>
                  <div>8</div>
                  <div>92%</div>
                  <div className="font-semibold">Student 3</div>
                  <div>80</div>
                  <div>12</div>
                  <div>78%</div>
                </div>
                <Button>View Metrics</Button>
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
