import React, {useState} from 'react';
import { Pokemon } from "pokenode-ts";
import axios from 'axios';
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
        top: '10%',
        placeSelf: 'center',
        display: 'grid',
        color: 'blue',
        backgroundColor: 'white',
        width: 300,

        // Border styling
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '5px',
        borderRadius: '5px',
      };
    const statsStyle = {
        color: 'black',
        margin: '0px',
        marginBottom: '10px',
    }
    return (
    <div style={formStyle}>
        <h2>Ask Professor Oak</h2>
        <p>Tell me the pokemon name:</p>
        <div >
            <input type="text" id="pokemon-name" name="pokemon-name" onChange={e => setPokemonName(e.target.value)}/><br/>
        </div>
        <div style={{marginTop: '10px'}}>
            <button onClick={() => {search()}}>Search</button>
        </div>
        {pokemonInfo === undefined ? (
        <p>Pokemon not found..</p>
        ) : (
            <div>
            <p><u>Results for: {pokemonInfo.name}</u></p>
            <img src={pokemonInfo.sprites.other.dream_world.front_default} />
            <p style={statsStyle}>ID: {pokemonInfo.id}</p>
            <p style={statsStyle}>Height: {pokemonInfo.height}</p>
            <p style={statsStyle}>Weight: {pokemonInfo.weight}</p>
            <p style={statsStyle}>Base Experience: {pokemonInfo.base_experience}</p>
            <p style={statsStyle}>Special Move: {pokemonInfo.moves[0].move.name}</p>

            </div>
        )}
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
            setPokemonInfo(res.data);
            console.log(res.data);
        });
        
    }
}
export default Form;