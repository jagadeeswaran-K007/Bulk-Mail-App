import React, { useEffect, useState } from 'react';
import API from '../api';

export default function EmailHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/gethistory')
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-300 font-bold font-['Roboto',sans-serif]">Loading email history...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6 font-['Roboto',sans-serif]">
      <div className="bg-[#111613] text-white p-6 rounded-2xl shadow-xl border-4 border-[#3366ff]">
        <h2 className="text-3xl font-black text-[#3366ff]">Email History</h2>
        <p className="text-gray-300 font-medium text-lg">View your previously sent bulk emails.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-[#111613] text-gray-300 font-bold p-8 rounded-2xl text-center shadow-xl border-4 border-[#3366ff]">
          No email history found.
        </div>
      ) : (
        history.map((item) => (
          <div key={item._id} className="bg-[#111613] text-white p-6 rounded-2xl shadow-xl border-4 border-[#3366ff] space-y-4">
            <div>
              <h3 className="text-2xl font-black text-[#3366ff]">{item.subject || 'No Subject'}</h3>
              <p className="text-sm font-bold text-gray-300">
                {item.date ? new Date(item.date).toLocaleString() : ''}
              </p>
            </div>

            <div>
              <p className="text-sm font-black text-[#3366ff] uppercase tracking-wider mb-1">Message</p>
              <div className="p-3 bg-[#eaebfe] text-black rounded-lg text-sm font-medium border-2 border-[#3366ff]">
                {item.msg}
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-[#3366ff] uppercase tracking-wider mb-1">Recipients</p>
              <div className="p-3 bg-[#eaebfe] text-black rounded-lg text-sm font-medium break-words border-2 border-[#3366ff]">
                {Array.isArray(item.emailList) ? item.emailList.join(', ') : item.emailList}
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-[#3366ff] uppercase tracking-wider mb-1">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  item.status === 'success'
                    ? 'bg-emerald-300 text-emerald-950'
                    : 'bg-red-300 text-red-950'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}