import useAnnouncement from "../../Hooks/useAnnouncement";

const Annouce = () => {
  const [allAnnounce] = useAnnouncement()
  return (
    <div className="container mx-auto px-4 my-10">
    <h1 className="text-3xl mb-4 text-[#F73E7B] text-center font-semibold">Announcements</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
      {allAnnounce.map((announcement, index) => (
        <div key={index} className="shadow-2xl border-2 p-5">
          <div className="flex items-center mb-4 justify-center">
            <img src={announcement.authorImage} alt={announcement.authorName} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{announcement.authorName}</h2>
              <p className="text-sm text-gray-600">{new Date(announcement.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">{announcement.title}</h3>
          <p className="w-full">{announcement.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Annouce;