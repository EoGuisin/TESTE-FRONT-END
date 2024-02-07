import { Title, WrapperContent, Names, Picker, Input, InputTitle, YourTeamPS, YourTeamWrapper, AddPokemon, Bar, CalculationWrapper, CalculationText, Total, ConcludeButton, ConcludeText } from "./styles";
import { CalculationButton, Footer, Header, InfoPage } from "../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import customSelectStyles from './agendar.module.css'; // Importe o arquivo CSS com uma variável
import { useQuery } from "react-query";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup"
import { userValidationSchema } from "../validation/userValidation";
import { Success } from "./Success";
import { Error } from "./Error";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Form {
  name: string,
  surname: string,
  region: string,
  city: string,
  date: string,
  time: string,
  pokemons: PokemonTeam[],
}

interface Results {
  name: string,
  url: string,
}

interface PokeAPI {
  count: number;
  next: string | null,
  previous: string | null,
  results: Results[],
}

interface CitysLocation {
  id: number,
  locations: Results[],
  main_generation: any[],
  name: string,
  names: any[],
  pokedexes: any[],
  version_groups: any[],
}

interface PokemonTeam {
  pokemonNumber: number,
  pokemonName: string,
  openPicker: boolean,
}

function schedule() {

  //#region Variables
  const { register, handleSubmit, reset, formState: { errors, isSubmitted, isValid, isSubmitSuccessful }, getValues } = useForm({
    resolver: yupResolver(userValidationSchema)
  });
  const [selectedCity, setSelectedCity] = useState('Selecione sua cidade');
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Selecione sua região');
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Selecione uma data');
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Selecione um horário');
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [citys, setCitys] = useState<CitysLocation>();
  const [times, setTimes] = useState<string[] | undefined>(undefined);
  const [forceRender, setForceRender] = useState(0);
  const [tax, setTax] = useState<number>(0);
  const [sucessOrError, setSucessOrError] = useState<number>(0);
  let initalListOfPokemons = [{
    pokemonNumber: 1,
    pokemonName: "Selecione seu pokémon",
    openPicker: false,
  }]
  const [pokemonTeam, setPokemonTeam] = useState<PokemonTeam[]>(initalListOfPokemons);
  const dates = useQuery<string[]>("dates", getDates, {})  
  const regions = useQuery<PokeAPI>("regions", getRegions, {})
  const pokemons = useQuery<PokeAPI>("pokemons", getPokemons, {})
  const subtotal = (pokemonTeam.length * 70).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
  const length = pokemonTeam.length
  const unity = "R$ 70,00"
  const total = (pokemonTeam.length * 70) + tax
  let biggerGeneration = 0
  //#endregion

  //#region Functions
  const onSubmit = () => {
    setSucessOrError(1)
    if(isValid) {
      setSucessOrError(1)
      return true
    } else {
      setSucessOrError(1)
      return false
    } 
  }

  const resetForm = () => {
    reset();
    setSelectedCity('Selecione sua cidade');
    setSelectedRegion('Selecione sua região');
    setSelectedDate('Selecione uma data');
    setSelectedTime('Selecione um horário');
    setIsOpenCity(false);
    setIsOpenRegion(false);
    setIsOpenDate(false);
    setIsOpenTime(false);
    setCitys(undefined);
    setTimes(undefined);
    setPokemonTeam(initalListOfPokemons);
  }

  const handleSelectRegion = (value: string) => {
    setSelectedRegion(value);
    register("region", { value: value })
    setIsOpenRegion(false);
  };

  const notify = (text: string) => {
    toast(text, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const pokemonTeamToForm = () => {
    register("pokemons", { value: pokemonTeam })
  };

  const handleSelectCity = (value: string) => {
    setSelectedCity(value);
    register("city", { value: value })
    setIsOpenCity(false);
  };

  const handleSelectDate = (value: string) => {
    setSelectedDate(value);
    register("date", { value: value })
    setIsOpenDate(false);
  };

  const handleSelectTime = (value: string) => {
    setSelectedTime(value);
    register("time", { value: value })
    setIsOpenTime(false);
  };

  const handleSelectClick = (index: number) => {
    pokemonTeam.forEach((pokemon, i) => pokemon.openPicker = i === index ? !pokemon.openPicker : false);
    setForceRender(Math.random());
  };

  const handlePokemonClick = (pokemon: PokemonTeam, item: Results) => {
    pokemon.pokemonName = item.name;
    pokemon.openPicker = false;
    setForceRender(Math.random());
  };

  const newPokemon = () => {
    if(pokemonTeam.length !== 6) {
      let newObject = {
        pokemonNumber: pokemonTeam.length + 1,
        pokemonName: "Selecione seu pokémon",
        openPicker: false,
      };
      setPokemonTeam([...pokemonTeam, newObject]);
    }
  }

  async function getDates() {
    const response = await axios
      .get("http://localhost:3000/api/scheduling/date");
    return response.data;
  }

  async function getTimes(date: string) {
    const requestvalues = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date }),
    };
    fetch("http://localhost:3000/api/scheduling/time", requestvalues)
      .then(response => {
        return response.json();
      })
      .then(data => setTimes(data))
  }

  async function getRegions() {
    const response = await axios
      .get("https://pokeapi.co/api/v2/region");
    return response.data;
  }

  async function getCitys(url: string) {
    const response = await axios
      .get(url);
    response.data.locations.length = 10
    return setCitys(response.data);
  }
  
  async function getPokemons() {
    const response = await axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
    return response.data;
  }
  
  async function getSelectedPokemon(pokemonName: string) {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
    let generationNumber: number = 0

    if(response.data.generation.name == "generation-i") generationNumber = 1
    if(response.data.generation.name == "generation-ii") generationNumber = 2
    if(response.data.generation.name == "generation-iii") generationNumber = 3
    if(response.data.generation.name == "generation-iv") generationNumber = 4
    if(response.data.generation.name == "generation-v") generationNumber = 5
    if(response.data.generation.name == "generation-vi") generationNumber = 6
    if(response.data.generation.name == "generation-vii") generationNumber = 7
    if(response.data.generation.name == "generation-viii") generationNumber = 8
    if(generationNumber > biggerGeneration) {
      biggerGeneration = generationNumber
    }

    const percentage = 3 * biggerGeneration;

    const tax = percentage / 100 * (pokemonTeam.length * 70);

    setTax(tax)
  }
  //#endregion

  return (
    <div>
      <Header absolute={false} />
      <InfoPage
        title="Agendar Consulta"
        description="Recupere seus pokémons em 5 segundos"
      />
      {sucessOrError == 0 &&
      <div> 
        <Title>Preencha o formulário abaixo para agendar sua consulta</Title>
        <WrapperContent key="form" onSubmit={handleSubmit(onSubmit, onSubmit)}>
          <Names>
            <div>
              <InputTitle>Nome</InputTitle>
              <Input id="name" type="text" placeholder="Digite seu nome" {...register("name")} /> 
            </div>
            <div>
              <InputTitle>Sobrenome</InputTitle>
              <Input id="surname" type="text" placeholder="Digite seu sobrenome" {...register("surname")} />
            </div>
          </Names>
          <Picker style={{marginBottom: "6rem"}}>
            <div>
              <InputTitle>Região</InputTitle>
              <div className={customSelectStyles.customselect}>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectselected} ${isOpenRegion ? customSelectStyles.selectarrowactive : ''}`} onClick={() => setIsOpenRegion(!isOpenRegion)}>
                  {selectedRegion}
                </div>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectitems} ${isOpenRegion ? '' : customSelectStyles.selecthide}`}>
                  {regions.data?.results.map((item, id) => <div key={id} onClick={() => {handleSelectRegion(item.name); getCitys(item.url)}}>{item.name}</div> )}
                </div>
              </div>
            </div>
            <div>
              <InputTitle>Cidade</InputTitle>
              <div className={customSelectStyles.customselect}>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectselected} ${isOpenCity ? customSelectStyles.selectarrowactive : ''}`} onClick={() => selectedRegion == 'Selecione sua região' ? notify("Selecione uma região antes de selecionar a cidade!") : setIsOpenCity(!isOpenCity)}>
                  {selectedCity}
                </div>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectitems} ${isOpenCity ? '' : customSelectStyles.selecthide}`}>
                  {citys?.locations?.map((item, id) => <div key={id} onClick={() => handleSelectCity(item.name)}>{item.name}</div> )}
                </div>
              </div>
            </div>
          </Picker>
          <InputTitle>Cadastre seu time</InputTitle>
          <YourTeamPS>Atendemos até 06 pokémons por vez</YourTeamPS>
          {pokemonTeam.map((pokemon, index) => 
          <YourTeamWrapper key={index}>
            <InputTitle>Pokémon {"0" + pokemon.pokemonNumber}</InputTitle>
            <div>
                <div key={pokemon.pokemonNumber} className={customSelectStyles.customselect}>
                  <div
                    style={{ width: 438 }}
                    className={`${customSelectStyles.selectselected} ${pokemon.openPicker ? customSelectStyles.selectarrowactive : ''}`}
                    onClick={() => handleSelectClick(index)}
                  >
                    {pokemon.pokemonName}
                  </div>
                  <div className={`${customSelectStyles.selectitems} ${pokemon.openPicker ? '' : customSelectStyles.selecthide}`}>
                    {pokemon.openPicker && pokemons?.data?.results?.map((item, id) => (
                      <div key={id} onClick={() => {handlePokemonClick(pokemon, item); getSelectedPokemon(item.name)}}>{item.name}</div>
                    ))}
                  </div>
                </div>
            </div>
          </YourTeamWrapper>)}
          <AddPokemon onClick={newPokemon}>
            <InputTitle>Adicionar novo pokémon ao time...</InputTitle>
            <InputTitle>+</InputTitle>
          </AddPokemon>
          <Picker style={{marginBottom: "2rem"}}>
            <div>
              <InputTitle>Data para Atendimento</InputTitle>
              <div className={customSelectStyles.customselect}>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectselected} ${isOpenDate ? customSelectStyles.selectarrowactive : ''}`} onClick={() => setIsOpenDate(!isOpenDate)}>
                  {selectedDate}
                </div>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectitems} ${isOpenDate ? '' : customSelectStyles.selecthide}`}>
                  {dates.data?.map((item, id) => <div key={id} onClick={() => {handleSelectDate(item); getTimes(item)}}>{item}</div> )}
                </div>
              </div>
            </div>
            <div>
              <InputTitle>Horário de Atendimento</InputTitle>
              <div className={customSelectStyles.customselect}>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectselected} ${isOpenTime ? customSelectStyles.selectarrowactive : ''}`} onClick={() => {times ? setIsOpenTime(!isOpenTime) : notify("Selecione uma data antes de selecionar o horário de atendimento!")}}>
                  {selectedTime}
                </div>
                <div style={{width: "16.5rem"}} className={`${customSelectStyles.selectitems} ${isOpenTime ? '' : customSelectStyles.selecthide}`}>
                  {times?.map((item, id) => <div key={id} onClick={() => handleSelectTime(item)}>{item}</div> )}
                </div>
              </div>
            </div>
          </Picker>
          <Bar />
          <div>
            <CalculationWrapper>
              <CalculationText>Número de pokémons a serem atendidos:</CalculationText>
              <CalculationText>{"0" + length}</CalculationText>
            </CalculationWrapper>
            <CalculationWrapper>
              <CalculationText>Atendimento unitário por pokémon:</CalculationText>
              <CalculationText>{unity}</CalculationText>
            </CalculationWrapper>
            <CalculationWrapper>
              <CalculationText>Subtotal:</CalculationText>
              <CalculationText>{subtotal}</CalculationText>
            </CalculationWrapper>
            <CalculationWrapper>
              <CalculationText>Taxa geracional*:</CalculationText>
              <CalculationText>{tax.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</CalculationText>
            </CalculationWrapper>
            <CalculationWrapper>
              <CalculationText style={{fontSize: 8}}>*adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%</CalculationText>
            </CalculationWrapper>
          </div>
          <CalculationButton
            onClick={pokemonTeamToForm}
            total={`Valor Total: ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}`}
          />
        </WrapperContent>
      </div>}
      {isSubmitSuccessful && <Success key="success" onClick={() => {setSucessOrError(0); resetForm()}} date={getValues("date")} time={getValues("time")} quantityPokemons={getValues("pokemons")?.length} />}
      {isSubmitted && !isValid && <Error key="error" onClick={() => {setSucessOrError(0); resetForm()}} errorMessage={[errors.city?.message, errors.date?.message, errors.name?.message, errors.pokemons?.message, errors.region?.message, errors.surname?.message, errors.time?.message]} />}
      <Footer absolute={sucessOrError != 0} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}



export default schedule;
