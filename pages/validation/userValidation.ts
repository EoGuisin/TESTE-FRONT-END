import * as yup from "yup";

// Função de validação personalizada para verificar se pelo menos um Pokémon foi selecionado
const validatePokemons = (value: any) => {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }
  for (const element of value) {
    if (element.pokemonName === "Selecione seu pokémon") {
      return false;
    }
  }
  return true;
};

export const userValidationSchema = yup.object().shape({
  name: yup.string().required("Não informou o nome!"),
  surname: yup.string().required("Não informou o sobrenome!"),
  region: yup.string().required("Não selecionou a região!"),
  city: yup.string().required("Não selecionou a cidade!"),
  date: yup.string().required("Não selecionou a data para atendimento!"),
  time: yup.string().required("Não selecionou o horário de atendimento!"),
  pokemons: yup
    .array()
    .test(
      "at-least-one-pokemon",
      "Selecione ao menos 1 Pokémon!",
      validatePokemons
    )
    .of(
      yup.object().shape({
        pokemonName: yup.string().required("Não selecionou um Pokémon!"),
      })
    ),
});
