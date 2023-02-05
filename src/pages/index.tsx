import { type NextPage } from "next";
import JSONViewer from "../components/JSONViewer";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#fff]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <JSONViewer />
        </div>
      </main>
    </>
  );
};

export default Home;
