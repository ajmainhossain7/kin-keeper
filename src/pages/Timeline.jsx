import { useState } from "react";
import { FiPhone, FiMessageCircle, FiVideo } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { useTimeline } from "../components/context/TimelineContext";

const typeConfig = {
  Call: { Icon: FiPhone, iconBg: "bg-gray-100", iconColor: "text-gray-500" },
  Text: { Icon: FiMessageCircle, iconBg: "bg-gray-100", iconColor: "text-gray-500" },
  Video: { Icon: FiVideo, iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
  Meetup: { Icon: MdPeopleOutline, iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
};

const Timeline = () => {
  const { timeline } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? timeline
      : timeline.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-[#f4f7f5] px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0f2d22] mb-6">Timeline</h1>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-start">
          <div className="dropdown dropdown-start">

            <div
              tabIndex={0}
              role="button"
              className="bg-white border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-500 flex items-center gap-2 cursor-pointer hover:border-[#1e4d3b] hover:text-[#1e4d3b] transition"
            >
              {filter === "All" ? "Filter timeline" : filter}
              <span>▾</span>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-44 p-2 shadow-md border border-gray-100 mt-2"
            >
              {["All", "Call", "Text", "Video"].map((item) => (
                <li key={item}>
                  <button
                    onClick={(e) => {
                      setFilter(item);

                      // 👇 This line closes the dropdown
                      e.currentTarget.blur();
                      document.activeElement.blur();
                    }}
                    className={`text-sm ${filter === item
                      ? "text-[#1e4d3b] font-medium"
                      : "text-gray-500"
                      }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Empty state */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-md bg-[#e8f0ec] flex items-center justify-center">
              <FiPhone size={20} className="text-[#1e4d3b]" />
            </div>
            <p className="text-sm text-gray-400 text-center">
              No interactions yet.<br />
              Go to a friend's page and use Quick Check-In!
            </p>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-1">
          {filteredData.map((item) => {
            const cfg = typeConfig[item.type] || typeConfig["Call"];
            const { Icon } = cfg;

            return (
              <div
                key={item.id}
                className="bg-white rounded-md border border-gray-100 px-5 py-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
                  <Icon size={16} className={cfg.iconColor} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0f2d22]">
                    <span className="font-semibold">{item.type}</span>
                    <span className="text-gray-400"> with {item.name}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Timeline;