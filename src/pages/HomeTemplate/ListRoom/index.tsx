import Title from "./Title";
import Stats from "./Stats";
import Cards from "./Cards";

export default function RoomListing() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Title />
          {/* Stats Bar */}
          <Stats />
          {/* Room Cards Grid */}
          <Cards />
        </div>
      </div>
    </div>
  );
}
