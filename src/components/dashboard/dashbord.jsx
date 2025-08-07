import React from "react";

const Dashboard = () => {
  const recentActivities = [
    {
      user: "admin1@.com",
      action: "Edited Title",
      section: "Blogs",
      datetime: "19 June 2025, 10:45 AM",
    },
    {
      user: "admin2@.com",
      action: "Added new notice",
      section: "Notice board",
      datetime: "15 June 2025, 11:29 AM",
    },
    {
      user: "admin3@.com",
      action: "Deleted image",
      section: "Gallery",
      datetime: "12 June 2025, 08:22 PM",
    },
    {
      user: "admin4@.com",
      action: "Updated topper list",
      section: "Topper list",
      datetime: "11 June 2025, 09:15 AM",
    },
    {
      user: "admin5@.com",
      action: "Added video",
      section: "Video gallery",
      datetime: "05 June 2025, 07:55 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#333] p-4 sm:p-6 font-poppins">
      {/* Dashboard Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <h1 className="mb-6 font-bold text-[30px] sm:text-[35px] leading-none tracking-normal text-[#1F2A44]">
          Dashboard
        </h1>
        
        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-0 mb-10">
          {[
            { count: 4, label: "Notices" },
            { count: 25, label: "Photos" },
            { count: 2, label: "Videos" },
            { count: 2, label: "Blogs" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#E85222] text-white rounded-md py-6 w-[180px] sm:w-[220px] md:w-[240px] lg:w-[240px] text-center shadow-[0px_4px_4px_0px_#00000040]"
            >
              <div className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-medium">
                {item.count}
              </div>
              <div className="font-medium text-[10px] sm:text-[12px] md:text-[18px] lg:text-[15px]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-none text-[#1F2A44] mb-6">
          Recent Activity
        </h2>

        {/* Desktop Table - Hidden on mobile and tablet */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl">
          <table className="min-w-[600px] w-full text-left border-separate border-spacing-0 bg-[#BAC7E5]">
            <thead>
              <tr className="bg-[#E85222] text-white text-center font-bold">
                <th className="p-3 border-r border-black">User</th>
                <th className="p-3 border-r border-black">Action</th>
                <th className="p-3 border-r border-black">Section</th>
                <th className="p-3">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index} className="text-center font-medium text-black">
                  <td className="px-1 py-2 border-r border-black">
                    {activity.user}
                  </td>
                  <td className="px-1 py-2 border-r border-black">
                    {activity.action}
                  </td>
                  <td className="px-1 py-2 border-r border-black">
                    {activity.section}
                  </td>
                  <td className="px-1 py-2">{activity.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Cards - Hidden on desktop */}
        <div className="lg:hidden space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4"
            >
              {/* Header with User */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#E85222] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {activity.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-[#1F2A44]">
                      {activity.user}
                    </p>
                  </div>
                </div>
                <span className="bg-[#BAC7E5] text-[#1F2A44] px-2 py-1 rounded text-xs font-medium">
                  {activity.section}
                </span>
              </div>

              {/* Action */}
              <div className="mb-3">
                <p className="text-gray-800 font-medium">
                  {activity.action}
                </p>
              </div>

              {/* Date & Time */}
              <div className="border-t border-gray-200 pt-2">
                <p className="text-xs text-gray-500">
                  {activity.datetime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;