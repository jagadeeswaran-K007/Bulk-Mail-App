import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../api';

export default function SendMail() {
  const [subject, setSubject] = useState('');
  const [manualRecipients, setManualRecipients] = useState('');
  const [msg, setMsg] = useState('');
  const [emailList, setemailList] = useState([]);
  const [fileName, setFileName] = useState('No file chosen');
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  function handlefile(event) {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];
      const parsedList = XLSX.utils.sheet_to_json(workSheet, { header: 'A' });
      const totalemail = parsedList.map((items) => items.A).filter(Boolean);
      
      setemailList(totalemail);
    };

    reader.readAsBinaryString(file);
  }

  const handleSend = () => {
    setStatusMsg(null);

    const typedEmails = manualRecipients.split(',').map((e) => e.trim()).filter(Boolean);
    const finalRecipients = Array.from(new Set([...typedEmails, ...emailList]));

    if (finalRecipients.length === 0) {
      setStatusMsg({ type: 'error', text: 'Please enter emails or upload an Excel file.' });
      return;
    }

    setLoading(true);

    API.post('/sendemail', {
      subject: subject,
      msg: msg,
      emailList: finalRecipients
    })
    .then((res) => {
      if (res.data === true) {
        setStatusMsg({ type: 'success', text: 'Emails sent and history recorded successfully!' });
        setSubject('');
        setMsg('');
        setManualRecipients('');
        setemailList([]);
        setFileName('No file chosen');
      } else {
        setStatusMsg({ type: 'error', text: 'Failed to send emails.' });
      }
    })
    .catch(() => {
      setStatusMsg({ type: 'error', text: 'Error connecting to server.' });
    })
    .finally(() => setLoading(false));
  };

  return (
    /* Landscape-oriented dashboard container */
    <div className="max-w-6xl mx-auto my-6 bg-[#111613] text-white p-8 rounded-2xl shadow-2xl border-4 border-[#3366ff] font-['Roboto',sans-serif]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-[#3366ff]">Send Bulk Email</h2>
        <p className="text-gray-300 font-bold text-md">
          Send emails to multiple recipients quickly and easily.
        </p>
      </div>

      {statusMsg && (
        <div
          className={`p-3 mb-6 rounded-lg text-sm font-bold border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
              : 'bg-red-950 text-red-300 border-red-500'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* 2-Column Landscape Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Subject, Recipients & File Input */}
        <div className="space-y-5">
          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-[#eaebfe] text-black placeholder-gray-500 rounded-lg outline-none font-medium border-2 border-[#3366ff] focus:ring-2 focus:ring-[#3366ff]"
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Recipient Emails</label>
            <textarea
              placeholder="Enter recipient emails separated by comma"
              value={manualRecipients}
              onChange={(e) => setManualRecipients(e.target.value)}
              rows={4}
              className="w-full p-3 bg-[#eaebfe] text-black placeholder-gray-500 rounded-lg outline-none font-medium border-2 border-[#3366ff] focus:ring-2 focus:ring-[#3366ff]"
            />
            <p className="text-sm font-semibold text-gray-300 mt-1">Example: example@gmail.com</p>
          </div>

          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Select Recipient File</label>
            <div className="flex items-center gap-3 p-3 bg-[#eaebfe] rounded-lg border-2 border-[#3366ff]">
              <label className="px-4 py-2 bg-[#3366ff] text-white text-sm font-black rounded cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 shadow inline-block">
                Choose File
                <input type="file" accept=".xlsx, .xls" onChange={handlefile} className="hidden" />
              </label>
              <span className="text-sm font-semibold text-gray-700 truncate">{fileName}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold text-gray-300">Excel with emails in column A</span>
              <span className="text-sm font-bold text-white">
                Total Emails in the file: <span className="font-black text-[#3366ff]">{emailList.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Email Body & Send Action */}
        <div className="space-y-5 flex flex-col justify-between h-full">
          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Email Body</label>
            <textarea
              placeholder="Write your email message here..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={9}
              className="w-full p-3 bg-[#eaebfe] text-black placeholder-gray-500 rounded-lg outline-none font-medium border-2 border-[#3366ff] focus:ring-2 focus:ring-[#3366ff]"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full py-3.5 bg-[#3366ff] text-white font-black rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg uppercase tracking-wider disabled:opacity-50 cursor-pointer mt-auto"
          >
            {loading ? 'Sending...' : 'send'}
          </button>
        </div>

      </div>
    </div>
  );
}