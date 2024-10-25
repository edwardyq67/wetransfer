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
        // Asegúrate de que haya resultados antes de acceder
        if (res.data.hits.length > 0) {
          setImgDelPais(res.data.hits[3].webformatURL);
        } else {
          setImgDelPais(""); // O una imagen por defecto
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [pais]);

  return (
    <div className="">
      {imgDelPais && (
        <img
          src={imgDelPais}
          alt={`Imagen de ${pais}`}
          width="300"
          height="300"
          className="rounded-t-lg w-[300px] h-[180px]"
        />
      )}
    </div>
  );
};

function Home() {
  // offcanva
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

  const filtroCotinente = [
    {
      code: "EU",
      name: "Europa",
      img: Europa,
    },
    {
      code: "AS",
      name: "Asia",
      img: Asia,
    },
    {
      code: "AM",
      name: "América",
      img: America,
    },
    {
      code: "OC",
      name: "Oceanía",
      img: Oceania,
    },
    {
      code: "AF",
      name: "África",
      img: Africa,
    },
  ];
  // filtrado Continente
  const [selectedContinents, setSelectedContinents] = useState([]);
  const handleContinentClick = (code) => {
    setSelectedContinents((prevSelected) =>
      prevSelected.includes(code)
        ? prevSelected.filter((item) => item !== code)
        : [...prevSelected, code]
    );
  };
  const nuevoValorData = data
    ? data.countries.filter(
        (country) =>
          // Filtra países cuyo nombre contiene el valor de búsqueda y que pertenecen a los continentes seleccionados
          country.name.toLowerCase().includes(valorPais.toLowerCase()) &&
          (selectedContinents.length === 0 ||
            selectedContinents.includes(country.continent.code))
      )
    : [];
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

  // Manejar estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-5 px-4 py-5 w-[100vw]">
      <div
        ref={boxRef}
        onClick={() => stadoFiltadorContinente()}
        className="relative w-full md:w-[60vw] mx-auto"
      >
        <form className="flex items-center bg-white shadow-lg rounded-2xl justify-between px-4 py-2 ">
          <div className="flex flex-col justify-center">
            <label
              htmlFor="pais"
              className="text-primario-500 font-semibold text-lg"
            >
              País
            </label>
            <input
              className="bg-transparent w-auto md:w-80 focus:outline-none z-20"
              name="pais"
              id="pais"
              type="text"
              value={valorPais}
              onChange={(e) => setValosPais(e.target.value)}
              placeholder="Escribe el pais que deseas ver"
              autoComplete="off"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="flex bg-segundario-700 text-white justify-center items-center gap-2 rounded-lg py-1 px-3"
            >
              <FaMagnifyingGlass />
              <span>Buscar</span>
            </button>
          </div>
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
        {nuevoValorData.slice(0, 15).map((country) => (
          <li
            onClick={() => toggleDrawer(country)}
            key={country.code}
            className="flex flex-col items-center"
          >
            <ImgPais pais={country.name} />
            <div className="flex  gap-4 w-[300px] bg-white cursor-pointer p-3 rounded-b-2xl">
              <picture className="flex items-center min-w-14">
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={`Bandera de ${country.name}`}
                  width="50"
                  height="40"
                />
              </picture>

              <div className="">
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
        className={`fixed bottom-0 right-0 z-40 h-screen sm:h-[90vh] overflow-y-hidden p-4 md:px-6 transition-transform rounded-tl-lg bg-white w-80 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <IdHome
          country={selectedCountry}
          setIsDrawerOpen={setIsDrawerOpen}
          ImgPais={ImgPais}
        />
      </div>
    </div>
  );
}

export default Home;
