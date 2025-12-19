import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex justify-evenly items-center p-5 "
    >
      <img
        src="/shapes/home-shape.svg" 
        alt="Generic shape"
        className="w-[45%]"
      />

      <div
        className="flex flex-col justify-center items-center w-[42%] h-[75vh] border-1 rounded-3xl"
      >
        <div
          className="flex flex-col gap-4 w-[72%]"
        >
          <h2
            className="text-6xl font-bold ml-[-5px]"
          >
            Get Started!
          </h2>
          <p className="opacity-95 ml-[-3px]">
            This project was created with a focus on enabling you to manage your portfolio in a dynamic and practical way, and here you will be able to:
          </p>

          <ul
            className="flex flex-col gap-2 list-disc opacity-80 mt-4"
          >
            <li>
              <span className="font-bold">
                Manage images <Link href="/images" className="text-blue-500 uppercase">Here</Link>
              </span> 
              <br />
              create, edit and delete stack logos & project images
            </li>
            <li>
              <span className="font-bold">
                Manage stacks <Link href="/stacks" className="text-blue-500 uppercase">Here</Link>
              </span> 
              <br />
              create, edit and delete stacks
            </li>
            <li>
              <span className="font-bold">
                Manage your projects <Link href="/projects" className="text-blue-500 uppercase">Here</Link>
              </span> 
              <br />
              configure project's used stacks, and manage images
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
