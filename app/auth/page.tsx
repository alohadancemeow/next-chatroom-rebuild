import Tabs from "@/components/auth/tabs";

type Props = {};

const Auth = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
        <div className="mb-4 text-center text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
          For testing: <span className="font-bold text-slate-700">test@gmail.com</span> &nbsp; Password: <span className="font-bold text-slate-700">123456</span>
        </div>
      <div className="flex justify-center items-center relative mt-1 z-10 h-full w-full">
        <Tabs />
      </div>
    </div>
  );
};

export default Auth;
