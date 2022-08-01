import React, {useState} from 'react';
import axios from 'axios';
const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

function Form() {
    const [pokemonName, setPokemonName] = useState("");
    return (
    <div>
        <h2>Enter pokemon name:</h2>
        <input type="text" id="pokemon-name" name="pokemon-name" onChange={e => setPokemonName(e.target.value)}/><br/>
        <button onClick={() => {search()}}>
            Search
        </button>
    </div>
    );

    function search() {
        /*
        Takes in pokemon name, then searches pokemon database and displays 
        result in console

        Inputs:
            None
        Outputs:
            None
        */
        axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
            console.log(res.data);
        });
    }
}

export default Form;
