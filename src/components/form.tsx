import React, { useState } from "react";
import { Pokemon } from "pokenode-ts";
import axios from "axios";
// Material-UI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper, Skeleton } from "@mui/material";

// Animal Zoo Api base URL
const ANIMAL_API_BASE_URL = "https://zoo-animal-api.herokuapp.com";
let listItems = [];

function Form() {
  /*
    Form hook that allows performs search for pokemon and display pokemon stats

    Inputs:
        None
    Outputs:
        None
    */
  // State storing pokemon name input from search bar
  const [numberInput, setNumberInput] = useState("");
  const [animalData, setAnimalData] = useState<undefined | any>(undefined);
  // CSS Styling
  const formStyle = {
    top: "10%",
    placeSelf: "center",
    display: "grid",
    color: "blue",
    backgroundColor: "white",
    width: 400,

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
        Animals with Prof. Oak
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "p.fontSize",
          mb: 1,
        }}
      >
        Input number of animals to view? Range 1-10
      </Box>
      <div>
        <TextField
          id="search-bar"
          className="text"
          value={numberInput}
          onChange={(prop: any) => {
            setNumberInput(prop.target.value);
          }}
          label="Number between 1-10"
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
      {animalData === undefined ? (
        <p>Animal(s) not found..</p>
      ) : (
        <Box>
          <p>
            <u>Result for: {numberInput} animal(s).</u>
          </p>
          <Paper>
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
                  {animalData === undefined || animalData === null ? (
                    <h1>Enter number between 1-10</h1>
                  ) : (
                    <div>
                      {generateList(animalData)}
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
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

    // Prevents search from executing without input
    if (numberInput !== "") {
      axios
        .get(ANIMAL_API_BASE_URL + "/animals/rand/" + numberInput)
        .then((res) => {
          setAnimalData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(ANIMAL_API_BASE_URL + "/animals/rand/" + numberInput);
          console.log("Input invalid");
          console.log(err);
          setAnimalData(undefined);
        });
    }
  }
  function generateList(list: any) {
    /*
    Takes in a list and generate a react componen
    */
    return (list.map((item: any) =>
      <div>
        <div key={item.id.toString()}>
          <img src={item.image_link} style={{width: 200,}} />
        </div>
        <div style={{textAlign: 'left',}}>
          <li>name: {item.name}</li>
          <li>Type: {item.animal_type}</li>
          <li>Max Weight: {item.weight_max} kg</li>
        </div>
      </div>
      )
    );
  }
}
export default Form;
