import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function FlowquickApp() {
  const supabase = createClient();
  const { data: railways } = await supabase.from("railways").select().single();
  const { data: stations } = await supabase.from("stations").select().single();
  const { data: routes } = await supabase.from("routes").select().single();
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
          <Image src={railways.icon} alt="railway" width={48} height={48} />
          <div>{railways.name}</div>
        </div>
        <div>{stations.name}</div>
        <div>{minutesToTime(routes.time)}</div>
        <div>
          {(crowd ?? []).map((crowd) => (
            <div key={crowd.id}>{crowd.crowd_level}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
