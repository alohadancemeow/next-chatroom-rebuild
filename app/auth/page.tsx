import Tabs from "@/components/auth/tabs";

type Props = {};

const Auth = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center relative mt-1 z-10 h-full w-full">
        <Tabs />
      </div>
    </div>
  );
};

export default Auth;
