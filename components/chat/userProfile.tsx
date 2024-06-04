"use client";

const notifyMessages = [
  {
    name: "user1",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user2",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user3",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user4",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user5",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
];

type Props = {};

const UserProfile = (props: Props) => {
  return (
    <div className="w-[20%] mt-5 pl-10 overflow-hidden relative">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center">
        <div className="p-5 w-24 h-24 rounded-full object-cover">
          <img src="/user.svg" alt="profile" />
        </div>
        <h4 className="text-[#607d8b] mt-1">3rd rabbit Bot</h4>
        <p className="italic mt-1 text-xs">
          <strong>Status : </strong>
          unstable
        </p>
      </div>

      <div className="bg-white rounded-lg flex flex-col justify-center overflow-y-hidden">
        <div className="text-center">
          <h4 className="text-[#607d8b]">Notification</h4>
        </div>
        <div className="max-h-[40vh] overflow-y-auto h-full bg-[#e0e5ec] rounded break-words">
          {/* //todo: map notify-item */}
          <div>
            {notifyMessages.map(({ name, message, momentTime }, index) => (
              <div className="flex flex-col m-1 p-1" key={index}>
                <p className="text-xs font-semibold bg-white px-2 rounded-sm opacity-70 m-1 text-black w-fit">
                  {name}
                </p>
                <p className="px-2 text-xs mb-1 ml-1 opacity-70 text-[#04c30b]">
                  <span className="font-bold text-[#607d8b]">{momentTime}</span>
                  {` : ${message}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
