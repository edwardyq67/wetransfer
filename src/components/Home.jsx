import { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Europa from "@/Lib/imagenes/Europa.webp";
import Asia from "@/Lib/imagenes/Asia.webp";
import America from "@/Lib/imagenes/America.webp";
import Oceania from "@/Lib/imagenes/Oceania.webp";
import Africa from "@/Lib/imagenes/Africa.webp";
import IdHome from "./IdHome";

const key = "46707628-4281e8ded4ae22dc4e7f45b79";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emoji
      languages {
        code
        name
      }
      continent {
        code
        name
        countries {
          name
          code
        }
      }
      currencies
    }
  }
`;

const ImgPais = ({ pais }) => {
  const [imgDelPais, setImgDelPais] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `https://pixabay.com/api/?key=${key}&q=${pais}&image_type=photo`
        );

        if (res.data.hits.length > 0) {
          setImgDelPais(res.data.hits[3].webformatURL);
        } else {
          setImgDelPais("");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [pais]);

  return (
    <div className="w-[280px] sm:w-[300px] h-[180px] rounded-t-lg">
      {imgDelPais ? (
        <img
          src={imgDelPais}
          alt={`Imagen de ${pais}`}
          className="w-full h-full rounded-t-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-t-lg" />
      )}
    </div>
  );
};
const ImgBandera = ({ country }) => {
  return (
    <picture className="flex items-center">
      {country.code ? (
        <img
          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
          alt={`Bandera de ${country.name}`}
          width="50"
          height="40"
          className="w-10 h-auto"
        />
      ) : (
        <div className="w-10 h-[40px] bg-gray-300" />
      )}
    </picture>
  );
  
};

function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activarFiltradoContinentes, setActivarFiltradoContinentes] =
    useState(false);
  const boxRef = useRef(null);
  const toggleDrawer = (country) => {
    setSelectedCountry(country);
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [valorPais, setValosPais] = useState("");
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [valorDatoSearch, setValorDatoSearch] = useState([]);
  const filtroCotinente = [
    {
      code: "EU",
      name: "Europe",
      img: Europa,
    },
    {
      code: "AS",
      name: "Asia",
      img: Asia,
    },
    {
      code: "SA",
      name: "South America",
      img: America,
    },
    {
      code: "OC",
      name: "Oceania",
      img: Oceania,
    },
    {
      code: "AF",
      name: "Africa",
      img: Africa,
    },
  ];

  const [selectedContinents, setSelectedContinents] = useState([]);
  const handleContinentClick = (code) => {
    setSelectedContinents((prevSelected) =>
      prevSelected.includes(code)
        ? prevSelected.filter((item) => item !== code)
        : [...prevSelected, code]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoValorData = (await data)
      ? data.countries.filter(
          (country) =>
            country.name.toLowerCase().includes(valorPais.toLowerCase()) &&
            (selectedContinents.length === 0 ||
              selectedContinents.includes(country.continent.code))
        )
      : [];

    await setValorDatoSearch(nuevoValorData);
    await setActivarFiltradoContinentes(false);
  };
  useEffect(() => {
    if (data && data.countries) {
      setValorDatoSearch(data.countries);
    }
  }, [data]);
  console.log(valorDatoSearch);
  const stadoFiltadorContinente = () => {
    setActivarFiltradoContinentes(true);
  };

  const nostadoFiltadorContinente = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setActivarFiltradoContinentes(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", nostadoFiltadorContinente);
    return () => {
      document.removeEventListener("mousedown", nostadoFiltadorContinente);
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-5 px-4 py-5 overflow-x-hidden w-screen">
      <div
        ref={boxRef}
        onClick={() => stadoFiltadorContinente()}
        className="relative w-full md:w-[60vw] mx-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white shadow-lg rounded-2xl justify-between px-2 sm:px-4 py-1 sm:py-2 "
        >
          <div className="flex flex-col justify-center sm:w-full w-36 ">
            <label
              htmlFor="pais"
              className="text-primario-500 font-semibold  text-lg"
            >
              País
            </label>
            <input
              className="bg-transparent focus:outline-none z-20"
              name="pais"
              id="pais"
              type="text"
              value={valorPais}
              onChange={(e) => setValosPais(e.target.value)}
              placeholder="Escribe el pais "
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="flex bg-segundario-700 text-white justify-center items-center gap-2 rounded-lg py-1 px-3"
          >
            <FaMagnifyingGlass />
            <span>Buscar</span>
          </button>
        </form>
        <div
          onBlur={() => setActivarFiltradoContinentes(false)}
          onFocus={() => setActivarFiltradoContinentes(true)}
          className={`${
            activarFiltradoContinentes
              ? "translate-y-0 opacity-100"
              : "-translate-y-20 opacity-0 pointer-events-none"
          }  transition-all duration-300 absolute bg-white rounded-xl px-4 py-2 top-20 gap-2 flex flex-col shadow-lg`}
        >
          <div className="flex justify-between">
            <p className="text-primario-700">Filtrar por continentes</p>
            <button
              onClick={() => setSelectedContinents([])}
              className="text-segundario-500"
            >
              <b>Limpiar</b>
            </button>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 ">
            {filtroCotinente.map((item) => (
              <picture
                key={item.code}
                onClick={() => {
                  handleContinentClick(item.code),
                    setActivarFiltradoContinentes(true);
                }}
                className="flex flex-col gap-1 cursor-pointer"
              >
                <img
                  className={`rounded-lg w-40 h-20 ${
                    selectedContinents.includes(item.code)
                      ? "border-4 border-segundario-500 shadow-lg"
                      : ""
                  }`}
                  src={item.img}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </picture>
            ))}
          </div>
        </div>
      </div>

      <ul className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-5 pb-5 z-60">
        {valorDatoSearch.slice(0, 24).map((country) => (
          <li
            onClick={() => toggleDrawer(country)}
            key={country.code}
            className="flex flex-col items-center overflow-hidden "
          >
            <ImgPais pais={country.name} />
            <div className="flex gap-2 md:gap-4 w-[280px] sm:w-[300px] bg-white cursor-pointer p-3 rounded-b-2xl">
              <ImgBandera country={country}/>

              <div className=" w-[280px] sm:w-[300px]">
                <strong className="text-segundario-700 text-xl truncate whitespace-nowrap overflow-hidden">
                  {country.name}
                </strong>
                <div className="truncate whitespace-nowrap overflow-hidden">
                  {country.continent.name}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={`fixed bottom-0 right-0 z-40 h-[90vh] overflow-y-hidden  transition-transform rounded-tl-lg bg-white w-80 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <IdHome
          country={selectedCountry}
          setIsDrawerOpen={setIsDrawerOpen}
          ImgPais={ImgPais}
          ImgBandera={ImgBandera}
        />
      </div>
    </div>
  );
}

export default Home;
