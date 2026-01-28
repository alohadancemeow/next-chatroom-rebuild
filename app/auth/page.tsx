import Tabs from "@/components/auth/tabs";

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-4 text-center text-sm text-blue-600 bg-blue-50 border border-blue-200 p-3 rounded-lg">
        For testing: <span className="font-bold text-blue-800">test@gmail.com</span> &nbsp; Password: <span className="font-bold text-blue-800">123456</span>
      </div>
      <div className="flex justify-center items-center relative mt-1 z-10 h-full w-full">
        <Tabs />
      </div>
    </div>
  );
};

export default Auth;
