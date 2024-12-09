'use client';
import { Button } from "../common/components/Button";
import { useAuthContext } from "../hooks/useAuthContext";


export const Navbar = () => {
	const { handleLogOut } = useAuthContext();

  return (
    <div className="h-16 w-screen fixed top-0 border-b-2 bg-[#1f1f1f] flex flex-row justify-end items-center">
      <div className="px-8">
        <Button label="Logout" type="button" onClick={handleLogOut}/>
      </div>
    </div>
  )
};