import React from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();
const dummyData = [
  {
    label:
      "Achievement of Sustained Net Plasma Heating in a Fusion Experiment with the Optometrist Algorithm",
    year: 2017,
  },
  {
    label:
      "Artificial Replay: A Meta-Algorithm for Harnessing Historical Data in Bandits",
    year: 2015,
  },
  { label: "Competition-Level Code Generation with AlphaCode", year: 2022 },
  {
    label:
      "Multi-Objective Bayesian Optimisation over High-Dimensional Search Spaces ",
    year: 2016,
  },
];
function App() {
  const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState(dummyData);
  const [history, setHistory] = React.useState([]);
  const [searchResponse, setSearchResponse] = React.useState();
  const [submittedQuery, setSubmittedQuery] = React.useState();

  const [researchArea, _setResearchArea] = React.useState([
    "PHYSICS",
    "MACHINE LEARNING",
    "ARTIFICIAL INTELLIGENCE",
    "CHEMISTRY",
  ]);

  const [researchAreaSelection, setResearchAreaSelection] = React.useState("");

  const handleChange = (event) => {
    setResearchAreaSelection(event.target.value);
  };

  const preventDefault = (event) => event.preventDefault();
  console.log(submittedQuery);
  console.log(searchResponse);
  const fetchData = () => {
    const query = {
      query: value.label,
      researchAreaSelection: researchAreaSelection,
    };

    // saving search query, to display it later
    setSubmittedQuery({ ...query });
    /**
     * move this part to then of the fetch block
     */

    setHistory((prevHistory) => [
      {
        query: `${value.label} ${researchAreaSelection}`,
        link: "http://googl.com",
      },
      ...prevHistory,
    ]);

    // fetch(`http://localhost:3000/result?researchPaper=${value.label}&researchArea=${researchAreaSelection}`);
    fetch(`http://localhost:3001/search?${new URLSearchParams(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResponse(data);
      });
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              label: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              label: newValue.inputValue,
            });
            setOptions((prevValue) => [
              ...prevValue,
              {
                label: newValue.inputValue,
                year: 2000,
              },
            ]);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.label
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.label;
        }}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Research paper" />
        )}
      />
      <br></br>
      <br></br>
      <br></br>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">RESEARCH AREA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={researchAreaSelection}
            label="RESEARH AREA"
            onChange={handleChange}
          >
            {researchArea.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <Stack spacing={2} direction="row">
        {/* <Button variant="text">Text</Button> */}
        <Button variant="contained" onClick={fetchData}>
          Submit
        </Button>
        {/* <Button variant="outlined">Outlined</Button> */}
      </Stack>
      <br></br>f
      <p>
        <t></t>
        <t></t>
        <t></t>
        <t></t>
        <t></t>TOP MOST RECENT PAPER SEARCHES-----
      </p>
      <br></br>
      {/* *
       * displaying search result
       */}
      {searchResponse?.length ? (
        <>
          <div style={{ fontSize: 23, fontWeight: "bold" }}>
            Search Result Response for query <i>{submittedQuery.query}</i> in{" "}
            <i>{submittedQuery.researchAreaSelection}</i> is{" "}
          </div>
          <ul>
            {searchResponse?.map((item) => (
              <li>
                <Link href={item.link}>{item.documentTitle}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <br></br>
      <br></br>
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          typography: "body1",
          "& > :not(style) + :not(style)": {
            ml: 2,
          },
        }}
        onClick={preventDefault}
      >
        <Link
          href="https://www.sciencedirect.com/science/article/pii/S0004370215000910"
          underline=""
        >
          Law and logic: A review from an argumentation perspective
        </Link>
      </Box>
      {/* displaying previous searches */}
      <ul>
        {history?.slice(0, 5)?.map((item) => (
          <li>
            <Link href={item.link}>{item.query}</Link>
          </li>
        ))}
      </ul>
      {/* <Link href="#" underline="hover">
          {'underline="hover"'}
        </Link>
        <Link href="#" underline="always">
          {'underline="always"'}
        </Link> */}
    </div>
  );
}

export default App;
