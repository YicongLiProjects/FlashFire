import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    return (
      <div className="flex flex-row items-center ml-2">
        <h1 className="text-6xl font-bold font-heading text-amber-600">FlashFire</h1>
        <button className="text-xl font-body text-yellow-400 ml-5 mt-2 hover:underline hover:text-red-500" onClick={() => router.push("/help")}>Help</button>
      </div>
    );
}

export default Navbar;