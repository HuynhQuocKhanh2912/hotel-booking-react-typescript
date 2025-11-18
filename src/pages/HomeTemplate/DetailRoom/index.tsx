import Gallery from "./Gallery";
import Title from "./Title";
import Highlights from "./Highlights";
import Desc from "./Desc";
import Amenities from "./Amenities";
import Rules from "./Rules";
import BookingForm from "./BookingForm";
// import Comments from "./Comments";

export default function RoomDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Gallery />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Title />
            <Highlights />
            <Desc />
            <Amenities />
            <Rules />
          </div>
          <BookingForm />
        </div>
        <div className="mt-8">{/* <Comments /> */}</div>
      </div>
    </div>
  );
}
