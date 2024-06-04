const Tags = () => {
  const tags = [
    { name: "Programming" },
    { name: "Work" },
    { name: "Travel" },
    { name: "Technology" },
    { name: "Health" },
    { name: "Finance" },
    { name: "Business" },
    { name: "Science" },
    { name: "Lifestyle" },
    { name: "History" }
  ];

  return (
    <div className="my-10 container mx-auto px-4">
      <h1 className="uppercase text-3xl font-bold mb-3">Tags</h1>
      <ul className="w-2/5 flex flex-wrap gap-5">
        {tags.map(tag => (
          <li className=" px-4 py-2 bg-[#F73E7B] font-medium text-white" key={tag.name}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
