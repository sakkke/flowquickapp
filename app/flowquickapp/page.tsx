import { createClient } from "@/utils/supabase/server";

export default async function FlowquickApp() {
  const supabase = createClient();
  const { data: railways } = await supabase.from("railways").select().single();
  const { data: stations } = await supabase.from("stations").select().single();
  const { data: routes } = await supabase.from("routes").select().single();
  const { data: crowd } = await supabase.from("crowd").select();

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div>{railways.name}</div>
        <div>{stations.name}</div>
        <div>{routes.time}</div>
        <div>
          {(crowd ?? []).map((crowd) => (
            <div key={crowd.id}>{crowd.crowd_level}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
