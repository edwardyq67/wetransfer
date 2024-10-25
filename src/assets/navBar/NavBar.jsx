
import { useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
function NavBar({setIsOpen}) {
  const navbar = [
    {
      id: 1,
      title: "Home",
      path: "/",
      exact: true,
    },
    {
      id: 2,
      title: "Vista 1",
      path: "/vista1",
      exact: true,
    },
    {
      id: 3,
      title: "Vista 2",
      path: "/vista2",
      exact: true,
    },
  ];

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <div className="px-2 pb-4 py-0 sm:py-5 text-primario-500 font-bold flex flex-col gap-4">
      <div onClick={()=>setIsOpen(false)} className='flex sm:hidden justify-end text-xl   text-primario-100 cursor-pointer'>
           <IoClose /> 
        </div>
      <div className="bg-primario-300 flex text-2xl justify-center items-center h-16 rounded-lg">
        <span>Logo</span>
      </div>
      <nav className="flex flex-col text-xl justify-center gap-2">
        {navbar.map((item, index) => (
          <a
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
              pathname === item.path ? "bg-primario-50 text-primario-500" : "text-primario-50 hover:bg-primario-400 "
            }`}
            key={index}
            onClick={() => {navigate(item.path),setIsOpen(false)}}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default NavBar;
