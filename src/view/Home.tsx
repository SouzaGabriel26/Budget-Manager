import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function handleGoogleSignin() {
    navigate('/google/signin');
  }

  return (
    <main className="h-full  flex flex-col items-center justify-center">
      <div className="rounded px-4 space-y-4 bg-white">
        <h1 className="text-2xl text-center">Welcome to Budget Manager</h1>

        <div className="space-y-2 text-center p-2">
          <p>To continue, you have to enter with your google account.</p>
          <p>
            Click in the button bellow to <strong>enter with google.</strong>
          </p>

          <button
            type="button"
            className="bg-white border px-2 rounded max-w-40 font-semibold w-full hover:bg-slate-200 transition-all"
            onClick={() => handleGoogleSignin()}
          >
            Enter with google
          </button>
        </div>
      </div>
    </main>
  );
}
