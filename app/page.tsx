import Auth from "./auth/page";
import Room from "./home/page";

export default function Home() {
  const isAuthenticated = true;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {!isAuthenticated ? <Auth /> : <Room />}
    </main>
  );
}
