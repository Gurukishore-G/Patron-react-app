import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, Download, Mail, Loader } from 'lucide-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

interface ReferralData {
  candidateName: string;
  position: string;
  company: string;
  jobID: string;
  jobURL: string;
  customMessage: string;
  generatedEmail?: string;
  isValidEmail?: boolean;
}

export default function ReferralAutomation() {
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [sendingComplete, setSendingComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [referralData, setReferralData] = useState<ReferralData[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSendEmails = async () => {
    if (!resumeFile) {
      setError('Please upload your resume first');
      return;
    }

    setIsSending(true);
    setError(null);
    setSendingProgress(0);
    
    try {
      const validEmails = referralData.filter(item => item.isValidEmail);
      const totalEmails = validEmails.length;
      
      for (let i = 0; i < totalEmails; i++) {
        const item = validEmails[i];
        
        const formData = new FormData();
        formData.append('to', item.generatedEmail || '');
        formData.append('subject', `Regarding referral opportunity at ${item.company}`);
        formData.append('body', generateEmailBody(item));
        formData.append('resume', resumeFile);

        try {
          await axios.post('/api/send-referral-mail', formData, {  // Ensure the endpoint matches
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          setSendingProgress(Math.round(((i + 1) / totalEmails) * 100));
        } catch (emailError) {
          console.error(`Failed to send email to ${item.generatedEmail}:`, emailError);
          throw new Error(`Failed to send email to ${item.candidateName}`);
        }
      }
      
      setSendingComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send emails');
    } finally {
      setIsSending(false);
    }
  };

  const generateEmailBody = (data: ReferralData): string => {
    return `
Hi ${data.candidateName.split(' ')[0]},
I hope you're doing well!

This is Gurukishore G, proficient in problem solving, data structures and algorithms coupled with handy communication and people handling skills.

I recently came across some open ${data.position} positions at ${data.company} that match my skill sets and thought I would reach out to see if you might be able to help me with a referral. I've been following ${data.company}'s work and truly admire the impact it's making in the industry.
${data.customMessage}

Here are the details of the roles I'm interested in:
Job ID: ${data.jobID}
Job URL: ${data.jobURL}

I believe my background and experience would make me a good fit for these positions, and I'd greatly appreciate any guidance or assistance you could offer in this process.

Thanks in advance. Have a nice time!
Best regards,
Gurukishore G
    `.trim();
  };

  const handleReset = () => {
    setShowConfirmation(false);
    setSendingComplete(false);
    setReferralData([]);
    setSendingProgress(0);
    setError(null);
    setResumeFile(null);
  };

  const validateAndGenerateEmails = async (data: any[]): Promise<ReferralData[]> => {
    return data.map(row => {
      const names = row.candidateName.trim().split(' ');
      let generatedEmail = '';
      let isValidEmail = false;

      if (names.length >= 2) {
        const firstName = names[0].toLowerCase();
        const lastName = names[names.length - 1].toLowerCase();
        generatedEmail = `${firstName}.${lastName}@gmail.com`;
        isValidEmail = true;
      }

      return {
        ...row,
        generatedEmail,
        isValidEmail
      };
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      const validatedData = await validateAndGenerateEmails(jsonData);
      setReferralData(validatedData);
      setShowConfirmation(true);
    };
    
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDownloadSample = () => {
    const sampleData = [
      {
        candidateName: "John Smith",
        position: "Software Engineer",
        company: "Tech Corp",
        jobID: "JD123456",
        jobURL: "https://company.com/jobs/123456",
        customMessage: "I have 5 years of experience in similar roles."
      }
    ];
  
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "referral_template.xlsx");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Referral Automation</h1>
        <button
          onClick={handleDownloadSample}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Sample Excel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {resumeFile && (
          <p className="mt-2 text-sm text-green-600">
            Resume uploaded: {resumeFile.name}
          </p>
        )}
      </div>
        
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg text-gray-600">Drop the Excel file here...</p>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-2">
                Drag & drop your Excel file here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports .xlsx and .xls files
              </p>
            </>
          )}
        </div>
  
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Template Format</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">Required Excel Columns:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Candidate Name</li>
              <li>Position</li>
              <li>Company</li>
              <li>Job ID</li>
              <li>Job URL</li>
              <li>Custom Message</li>
            </ul>
          </div>
        </div>
      </div>
  
      {showConfirmation && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Confirm Email Recipients</h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Generated Email</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Job ID</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.candidateName}</td>
                    <td className="px-4 py-2">{item.generatedEmail || 'Invalid name format'}</td>
                    <td className="px-4 py-2">
                      {item.isValidEmail ? (
                        <span className="text-green-600">Valid</span>
                      ) : (
                        <span className="text-red-600">Invalid</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{item.position}</td>
                    <td className="px-4 py-2">{item.company}</td>
                    <td className="px-4 py-2">{item.jobID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            {error && (
              <p className="text-red-600 mb-4">
                Error: {error}
              </p>
            )}
            
            {referralData.some(item => !item.isValidEmail) && (
              <p className="text-red-600 mb-4">
                Some email addresses could not be generated due to invalid name formats.
                Please ensure all names are in "First Last" format.
              </p>
            )}
            
            {isSending && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sending emails...</span>
                  <span className="text-sm font-medium">{sendingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${sendingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {sendingComplete ? (
              <div className="text-center">
                <p className="text-green-600 mb-4">
                  All emails have been sent successfully!
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Process Another Batch
                </button>
              </div>
            ) : (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isSending}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmails}
                  disabled={isSending || referralData.some(item => !item.isValidEmail) || !resumeFile}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isSending || referralData.some(item => !item.isValidEmail) || !resumeFile
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSending ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Emails
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as XLSX from 'xlsx';
// import { Download, Upload, Send } from 'lucide-react';

// interface CandidateData {
//   fullName: string;
//   company: string;
//   generatedEmails: string[];
// }

// function ReferralAutomation() {
//   const [candidates, setCandidates] = useState<CandidateData[]>([]);
//   const [emailTemplate, setEmailTemplate] = useState(`Dear {{name}},

// I hope this email finds you well. I came across an exciting opportunity at {{company}} that I believe would be a great fit for your skills and experience.

// {{custom_message}}

// Best regards,
// [Your name]`);
//   const [customMessage, setCustomMessage] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const generateEmails = (fullName: string, company: string): string[] => {
//     const names = fullName.toLowerCase().split(' ');
//     const emails = [];
    
//     if (names.length >= 2) {
//       // Format: firstname.lastname@company.com
//       emails.push(`${names[0]}.${names[names.length - 1]}@${company.toLowerCase()}.com`);
      
//       // Format: lastname.firstname@company.com
//       emails.push(`${names[names.length - 1]}.${names[0]}@${company.toLowerCase()}.com`);
//     }
    
//     return emails;
//   };

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       try {
//         const data = event.target?.result;
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet) as { fullName: string; company: string }[];

//         const processedData = jsonData.map(row => ({
//           fullName: row.fullName,
//           company: row.company,
//           generatedEmails: generateEmails(row.fullName, row.company)
//         }));

//         setCandidates(processedData);
//       } catch (error) {
//         console.error('Error processing file:', error);
//         alert('Error processing file. Please make sure it matches the template format.');
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
//       'application/vnd.ms-excel': ['.xls']
//     }
//   });

//   const downloadTemplate = () => {
//     const template = [
//       { fullName: 'John Smith Doe', company: 'Example' },
//       { fullName: 'Jane Marie Johnson', company: 'Sample' }
//     ];

//     const ws = XLSX.utils.json_to_sheet(template);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Template");
//     XLSX.writeFile(wb, "referral_template.xlsx");
//   };

//   const handleSendEmails = async () => {
//     setIsProcessing(true);
//     try {
//       // Implement your email sending logic here
//       await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
//       alert('Emails sent successfully!');
//     } catch (error) {
//       alert('Error sending emails. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Referral Automation</h1>

//       <div className="space-y-8">
//         {/* Template Download */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Download Template</h2>
//           <button
//             onClick={downloadTemplate}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <Download className="w-5 h-5 mr-2" />
//             Download Excel Template
//           </button>
//         </div>

//         {/* File Upload */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Upload Candidate Data</h2>
//           <div
//             {...getRootProps()}
//             className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
//               ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//           >
//             <input {...getInputProps()} />
//             <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//             <p className="text-gray-600">
//               {isDragActive ? "Drop the file here" : "Drag and drop your Excel file here, or click to select"}
//             </p>
//           </div>
//         </div>

//         {/* Email Template */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Email Template</h2>
//           <textarea
//             value={emailTemplate}
//             onChange={(e) => setEmailTemplate(e.target.value)}
//             className="w-full h-48 p-4 border rounded-md mb-4"
//             placeholder="Enter your email template..."
//           />
//           <div className="mb-4">
//             <h3 className="font-medium mb-2">Custom Message</h3>
//             <textarea
//               value={customMessage}
//               onChange={(e) => setCustomMessage(e.target.value)}
//               className="w-full h-24 p-4 border rounded-md"
//               placeholder="Enter your custom message..."
//             />
//           </div>
//           <div className="text-sm text-gray-600 mb-4">
//             Available variables: {'{{'}<span>name</span>{'}}'},  {'{{'}<span>company</span>{'}}'},  {'{{'}<span>custom_message</span>{'}}'}
//           </div>
//         </div>

//         {/* Preview */}
//         {candidates.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Generated Emails</h2>
//             <div className="space-y-4">
//               {candidates.map((candidate, index) => (
//                 <div key={index} className="border-b pb-4">
//                   <p className="font-medium">{candidate.fullName}</p>
//                   <p className="text-gray-600">{candidate.company}</p>
//                   <div className="mt-2">
//                     {candidate.generatedEmails.map((email, emailIndex) => (
//                       <div key={emailIndex} className="text-sm text-blue-600">
//                         {email}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={handleSendEmails}
//               disabled={isProcessing}
//               className={`mt-6 flex items-center px-4 py-2 rounded-md text-white
//                 ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//             >
//               <Send className="w-5 h-5 mr-2" />
//               {isProcessing ? 'Sending...' : 'Send Emails'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReferralAutomation;

