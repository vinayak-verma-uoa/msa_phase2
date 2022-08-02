import React, { useState } from "react";
import { Pokemon } from "pokenode-ts";
import axios from "axios";
// Material-UI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper, Skeleton } from "@mui/material";

// Pokemon Api base URL
const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

function Form() {
  /*
    Form hook that allows performs search for pokemon and display pokemon stats

    Inputs:
        None
    Outputs:
        None
    */
  // State storing pokemon name input from search bar
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined);
  // CSS Styling
  const formStyle = {
    top: "10%",
    placeSelf: "center",
    display: "grid",
    color: "blue",
    backgroundColor: "white",
    width: 300,

    // Border styling
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "5px",
    borderRadius: "5px",
  };
  const statsStyle = {
    color: "black",
    margin: "0px",
    marginBottom: "10px",
  };
  return (
    <div style={formStyle}>
      <Box
        sx={{
          fontFamily: "Monospace",
          mt: 1,
          mb: 1,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "h5.fontSize",
        }}
      >
        Ask Professor Oak
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "p.fontSize",
          mb: 1,
        }}
      >
        Credit Background Image:
        <a href="https://www.teechu.com/pokemon-professor-oak-facts-trivia">
          TeeChu
        </a>
      </Box>
      <div>
        <TextField
          id="search-bar"
          className="text"
          value={pokemonName}
          onChange={(prop: any) => {
            setPokemonName(prop.target.value);
          }}
          label="Pokemon name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
      {pokemonInfo === undefined ? (
        <p>Pokemon not found..</p>
      ) : (
        <Box>
          <p>
            <u>Results for: {pokemonInfo.name}</u>
          </p>
          <Paper sx={{ backgroundColor: getBackColor(pokemonInfo) }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {pokemonInfo === undefined || pokemonInfo === null ? (
                    <h1> Pokemon not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {pokemonInfo.name.charAt(0).toUpperCase() +
                          pokemonInfo.name.slice(1)}
                      </h1>
                      <p>
                        ID: {pokemonInfo.id}
                        <br />
                        Height: {pokemonInfo.height * 10} cm
                        <br />
                        Weight: {pokemonInfo.weight / 10} kg
                        <br />
                        Types: {getTypes()?.toString()}
                        <br />
                        Abilities: {getAbilities()?.toString()}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {pokemonInfo?.sprites.other.dream_world.front_default ? (
                    <img
                      height="250"
                      width="250"
                      alt={pokemonInfo.name}
                      src={pokemonInfo.sprites.other.dream_world.front_default}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </div>
  );

  function getTypes() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.types.map((item: any) => item.type.name);
    }
  }

  function getAbilities() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.abilities.map((ability: any) => ability.ability.name);
    }
  }

  // Credit to codingsparkles for providing the color mapping
  function getBackColor(poke: Pokemon | undefined | null) {
    let backColor = "#EEE8AA";
    if (poke === undefined || poke === null) {
      return backColor;
    }
    const pokeTypes = poke.types.map((i) => i.type.name);
    if (pokeTypes.includes("fire")) {
      backColor = "#FEC5BB";
    } else if (pokeTypes.includes("grass")) {
      backColor = "#80FFDB";
    } else if (pokeTypes.includes("water")) {
      backColor = "#DFE7FD";
    } else if (pokeTypes.includes("bug")) {
      backColor = "#B0DEA3";
    } else if (pokeTypes.includes("normal")) {
      backColor = "#E0FFFF";
    } else if (pokeTypes.includes("electric")) {
      backColor = "#D8E2DC";
    } else if (pokeTypes.includes("ground")) {
      backColor = "#FAD2E1";
    } else if (pokeTypes.includes("fairy")) {
      backColor = "#FFF1E6";
    } else if (pokeTypes.includes("ghost")) {
      backColor = "#F8EDEB";
    } else if (pokeTypes.includes("fighting")) {
      backColor = "#F1FAEE";
    } else if (pokeTypes.includes("rock")) {
      backColor = "#A8DADC";
    }
    return backColor;
  }

  function search() {
    /*
        Takes in pokemon name, then searches pokemon database and displays 
        result in console

        Inputs:
            None
        Outputs:
            None
        */

    // Prevents search from executing without input
    if (pokemonName !== "") {
      axios
        .get(POKEMON_BASE_URL + "/pokemon/" + pokemonName.toLowerCase())
        .then((res) => {
          setPokemonInfo(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Pokemon not found");
          setPokemonInfo(undefined);
        });
    }
  }
}
export default Form;
