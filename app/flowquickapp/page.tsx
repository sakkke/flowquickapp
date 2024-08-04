import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function FlowquickApp() {
  const supabase = createClient();
  const { data: railway } = await supabase.from("railways").select().single();
  const { data: station } = await supabase.from("stations").select().single();
  const { data: route } = await supabase.from("routes").select().single();
  const { data: crowd } = await supabase.from("crowd").select();

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hours}:${formattedMins}`;
  };

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div className="flex gap-2 items-center">
          <Image src={railway.icon} alt="railway" width={48} height={48} />
          <div>{railway.name}</div>
        </div>
        <div className="flex gap-2 items-center">
          <Image src={station.icon} alt="station" width={48} height={48} />
          <div>{station.name}</div>
        </div>
        <div>{minutesToTime(route.time)}</div>
        <div>
          {(crowd ?? []).map((crowd) => (
            <div key={crowd.id}>{crowd.crowd_level}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
