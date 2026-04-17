import React from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';
import {
  AiOutlinePhone,
  AiOutlineMessage,
  AiOutlineVideoCamera,
  AiOutlineClockCircle,
  AiOutlineInbox,
  AiOutlineDelete,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import { MdOutlineSnooze } from 'react-icons/md';
import toast from "react-hot-toast";
import { useTimeline } from '../context/TimelineContext';

const statusConfig = {
  "on-track": { label: "On Track", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  "almost due": { label: "Almost Due", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  "overdue": { label: "Overdue", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
};

const tagPalette = [
  "bg-[#e8f0ec] text-[#1e4d3b]",
  "bg-[#e6f1fb] text-[#185fa5]",
  "bg-[#faeeda] text-[#854f0b]",
  "bg-[#fbeaf0] text-[#993556]",
  "bg-[#eeedfe] text-[#534ab7]",
];

function tagColor(tag) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = tag.charCodeAt(i) + ((h << 5) - h);
  return tagPalette[Math.abs(h) % tagPalette.length];
}

function InteractionIcon({ type }) {
  const cls = "w-4 h-4 shrink-0";
  if (type === "Text") return <AiOutlineMessage className={`${cls} text-[#185fa5]`} />;
  if (type === "Video") return <AiOutlineVideoCamera className={`${cls} text-[#854f0b]`} />;
  if (type === "Call") return <AiOutlinePhone className={`${cls} text-[#1e4d3b]`} />;
  if (type === "Meetup") return <AiOutlinePhone className={`${cls} text-[#993556]`} />;
  return <AiOutlineMessage className={`${cls} text-gray-400`} />;
}

const checkInTypes = [
  { label: "Call", Icon: AiOutlinePhone, type: "Call" },
  { label: "Text", Icon: AiOutlineMessage, type: "Text" },
  { label: "Video", Icon: AiOutlineVideoCamera, type: "Video" },
];

const FriendsDetails = () => {
  const friends = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { timeline, addEntry } = useTimeline();

  const friend = friends.find((f) => String(f.id) === String(id));

  if (!friend) return (
    <div className="min-h-screen bg-[#f4f7f5] flex items-center justify-center">
      <p className="text-sm text-gray-400">Friend not found.</p>
    </div>
  );

  const handleClick = (type) => {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} added!`, {
      style: {
        background: '#f0f9f4',
        color: '#0f2d22',
        border: '1px solid #a8d5bf',
        fontSize: '14px',
        borderRadius: '10px',
      },
      iconTheme: { primary: '#1e4d3b', secondary: '#fff' },
    });
  };

  const st = statusConfig[friend.status] || statusConfig["on-track"];

  const formattedDue = new Date(friend.next_due_date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  const recentInteractions = timeline
    .filter((t) => t.name === friend.name)
    .slice(0, 4);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });

  return (
    <div className="min-h-screen bg-[#f4f7f5] px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-1.5 text-sm text-[#1e4d3b] hover:underline bg-transparent border-0 cursor-pointer"
        >
          <AiOutlineArrowLeft size={15} />
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-5">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 w-full md:w-64 shrink-0">

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-3 text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-[#d4ede2]"
              />
              <div>
                <p className="font-bold text-[#0f2d22] text-base">{friend.name}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${st.bg} ${st.text}`}>
                {st.label}
              </span>
              <div className="flex flex-wrap gap-1 justify-center">
                {friend.tags.map((tag) => (
                  <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${tagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 italic">"{friend.bio}"</p>
              <p className="text-xs text-gray-400">{friend.email}</p>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-600 hover:bg-[#f4f7f5] transition-colors border-0 bg-transparent cursor-pointer border-b border-gray-50">
                <MdOutlineSnooze size={16} className="text-gray-400" />
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-600 hover:bg-[#f4f7f5] transition-colors border-0 bg-transparent cursor-pointer border-b border-gray-50">
                <AiOutlineInbox size={16} className="text-gray-400" />
                Archive
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer">
                <AiOutlineDelete size={16} />
                Delete
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN  */}
          <div className="flex flex-col gap-4 flex-1">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: friend.days_since_contact, label: "Days Since Contact" },
                { value: friend.goal, label: "Goal (Days)" },
                { value: formattedDue, label: "Next Due" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                  <p className="text-2xl font-bold text-[#0f2d22]">{value}</p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Relationship goal */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-[#0f2d22]">Relationship Goal</p>
                <button className="text-xs text-[#1e4d3b] hover:underline bg-transparent border-0 cursor-pointer">Edit</button>
              </div>
              <p className="text-sm text-gray-500">
                Connect every <span className="font-semibold text-[#0f2d22]">{friend.goal} days</span>
              </p>
            </div>

            {/*  Quick Check — handleClick preserved */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-sm font-bold text-[#0f2d22] mb-4">Quick Check-In</p>
              <div className="grid grid-cols-3 gap-3">
                {checkInTypes.map(({ label, Icon, type }) => (
                  <button
                    key={label}
                    onClick={() => handleClick(type)}
                    className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-100 hover:border-[#1e4d3b] hover:bg-[#f0f9f4] active:scale-95 transition-all cursor-pointer bg-transparent"
                  >
                    <Icon size={22} className="text-gray-500" />
                    <span className="text-xs font-medium text-gray-600">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Interactions — from context filtered by friend */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-[#0f2d22]">Recent Interactions</p>
                <button className="text-xs text-[#1e4d3b] hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1">
                  <AiOutlineClockCircle size={13} /> Full History
                </button>
              </div>

              {recentInteractions.length === 0 ? (
                <p className='text-xs text-gray-400 text-center py-6'>
                  No interactions yet. Use Quick Check-In above!
                </p>
              ) : (
                <div className="flex flex-col divide-y divide-gray-50">
                  {recentInteractions.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <div className="w-7 h-7 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0">
                        <InteractionIcon type={item.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0f2d22]">{item.type}</p>
                        <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default FriendsDetails;