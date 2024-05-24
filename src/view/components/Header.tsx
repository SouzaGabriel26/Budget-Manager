import { useAuthContext } from '../../app/hooks/useAuthContext';

export function Header() {
  const { userInfo, signOut } = useAuthContext();

  if (!userInfo) {
    return null;
  }

  return (
    <header className="bg-slate-600 flex justify-between items-center text-white p-4">
      <div className="flex items-center gap-4">
        <img
          className="rounded-full w-12"
          src={userInfo.picture}
          alt={userInfo.name}
        />
        <p>{userInfo.name}</p>
      </div>

      <h1 className="text-2xl">Budget Manager</h1>

      <button
        type="button"
        onClick={signOut}
        className="p-2 rounded bg-white hover:bg-white/35 transition text-slate-800"
      >
        Signout
      </button>
    </header>
  );
}
