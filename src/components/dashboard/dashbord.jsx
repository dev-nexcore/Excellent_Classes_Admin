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
    <div className="min-h-screen bg-[#edf1f7] text-[#333] p-4 sm:p-6 font-poppins">
      {/* Dashboard Section */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h1 className="mb-6 font-bold text-[30px] sm:text-[35px] leading-none tracking-normal text-[#1F2A44]">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-[30px] mb-10">
          {[
            { count: 4, label: "Notices" },
            { count: 25, label: "Photos" },
            { count: 2, label: "Videos" },
            { count: 2, label: "Blogs" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#E85222] text-white rounded-md py-6 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[160px] text-center shadow-[0px_4px_4px_0px_#00000040]"
            >
              {/* Custom count size */}
              <div className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-medium">
                {item.count}
              </div>

              {/* Custom label size */}
              <div className="font-medium text-[10px] sm:text-[12px] md:text-[18px] lg:text-[15px]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h2 className="text-[26px] sm:text-[30px] font-bold leading-none text-[#1F2A44] mb-6">
          Recent Activity
        </h2>

        <div className="overflow-x-auto rounded-2xl">
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
      </div>
    </div>
  );
};

export default Dashboard;
