
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
function IdHome({ country, setIsDrawerOpen, ImgPais,ImgBandera }) {
  if (!country || !country.code) return null;

  return (
    <div className='flex flex-col px-2'>
        <div onClick={()=>setIsDrawerOpen(false)} className=' p-2 flex justify-end text-lg text-primario-700 cursor-pointer'>
           <IoClose /> 
        </div>
        
      <ImgPais pais={country.name} />
      <div className="flex gap-1  bg-white rounded-2xl py-2">
              <ImgBandera country={country}/>

              <div  className="">
                <strong className="text-segundario-700 text-xl truncate whitespace-nowrap overflow-hidden">
                  {country.name}
                </strong>
                <div className="truncate whitespace-nowrap overflow-hidden">
                 {country.name}
                </div>
              </div>
            </div>
            <ul className=''>
                <li><strong className='text-segundario-700'>Capital: </strong>{country.capital}</li>
                <li><strong className='text-segundario-700'>Lamguage: </strong>{country.languages[0].name}</li>
                <li><strong className='text-segundario-700'>Population: </strong></li>
                <li><strong className='text-segundario-700'>Currency: </strong>{country.currencies[0]}</li>
                <li><strong className='text-segundario-700  h-80'>Region: </strong>
                <ul className='overflow-y-auto h-[40vh] py-4 px-2 shadow-xl '>
                      {
                    country.continent?.countries.map(region=>(
                        <li className='pointer-events-none' key={region.code}>{region.name}</li>
                    ))
                }
                </ul>
              
                </li>
              </ul>
    </div>
  );
}

IdHome.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
  ImgPais: PropTypes.elementType.isRequired,
};

export default IdHome;
