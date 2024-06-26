import { useAuthContext } from '../../app/hooks/useAuthContext';

import { Arrow } from './icons/Arrow';
import { Logout } from './icons/Logout';

export function Sidebar() {
  const { userInfo, signOut } = useAuthContext();

  return (
    <aside
      className={`
      h-full
      w-fit
      p-2
      bg-slate-700
      flex
      flex-col
      items-center
      gap-2
    `}
    >
      <input
        type="checkbox"
        id="toggleSidebar"
        className={`
          appearance-none
          w-7
          checked:w-56
          transition-all
          ease-in-out
          duration-200
          peer/toggleSidebar
        `}
      />
      <label
        title="expand-menu"
        htmlFor="toggleSidebar"
        className={`
          cursor-pointer
          inline-block
          peer-checked/toggleSidebar:hidden
          hover:bg-slate-800
          rounded
          p-1
        `}
      >
        <Arrow name="right" />
      </label>

      <div
        className={`
        hidden
        w-full
        peer-checked/toggleSidebar:flex
        justify-end
      `}
      >
        <label
          title="collapse-menu"
          htmlFor="toggleSidebar"
          className={`
            cursor-pointer
            hover:bg-slate-800
            rounded
            p-1
          `}
        >
          <Arrow name="left" />
        </label>
      </div>

      <a href="/#" title="Profile">
        <img
          className="rounded-full w-12"
          src={userInfo?.picture}
          alt={userInfo?.name}
        />
      </a>

      <div
        className={`
          hidden
          text-white
          peer-checked/toggleSidebar:flex
          flex-col
          gap-2
          mt-6
        `}
      >
        <p>{userInfo?.name}</p>
        <p>{userInfo?.email}</p>
        <p>{userInfo?.locale}</p>
      </div>

      <button
        title="sign out"
        onClick={signOut}
        type="button"
        className={`
        px-2
        rounded
        absolute
        border
        bottom-4
        bg-white
        hover:bg-slate-700
        hover:text-white
        hover:border-white
        transition-all
      `}
      >
        <span className="signOut hidden">Sign Out</span>

        <span className="signOutIcon">
          <Logout />
        </span>
      </button>
    </aside>
  );
}
