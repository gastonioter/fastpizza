import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-center text-xl md:text-3xl px-4 font-semibold text-stone-700">
        <span className="text-yellow-500">The best pizza.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
