import Gallery from "./Gallery";
import Title from "./Title";
import Highlights from "./Highlights";
import Desc from "./Desc";
import Amenities from "./Amenities";
import Rules from "./Rules";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomByID } from "@/services/room.api";
import { useQuery } from "@tanstack/react-query";
import { useRoomDetail } from "@/stores/useRoomDetails.store";
import { useEffect } from "react";
import CommentList from "./Comments";

export default function RoomDetail() {
  const { id } = useParams();
  const setRoomDetail = useRoomDetail((state) => state.setRoomDetail);
  // get rooms by id
  const { data: roomDetail } = useQuery({
    queryKey: ["roomDetail", id],
    queryFn: () => getRoomByID(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (roomDetail) setRoomDetail(roomDetail);
  }, [roomDetail, setRoomDetail]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Gallery />
      <div className="max-w-[1440px] mx-auto px-4 py-12">
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
        <div className="mt-8">
          <CommentList />
        </div>
      </div>
    </div>
  );
}
