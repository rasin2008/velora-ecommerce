import { useEffect } from "react";
import { supabase } from "../lib/supabase";

function Home() {
  useEffect(() => {
    const testConnection = async () => {
      console.log("Supabase Client:", supabase);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      console.log("HOME DATA:", data);
      console.log("HOME ERROR:", error);
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Welcome to Velora</h1>
      <p>Smart Shopping, Better Living</p>
    </div>
  );
}

export default Home;