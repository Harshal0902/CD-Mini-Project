import React, { Component } from "react";

export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem('input') || ``,
      output: ``,
      language_id: localStorage.getItem('language_Id') || 2,
      user_input: ``,
    };
  }
  input = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value)
  };

  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };

  language = (event) => {
    event.preventDefault();
    this.setState({ language_id: event.target.value });
    localStorage.setItem('language_Id', event.target.value)

  };

  submit = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "0319223c71mshc51b756933941a7p1a4c4ejsn710364b40f0b",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id,
        }),
      }
    );

    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "0319223c71mshc51b756933941a7p1a4c4ejsn710364b40f0b",
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      outputText.innerHTML = "";
      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };

  render() {
    return (
      <div className="grid grid-cols-2 my-4 mx-12 gap-3">

        <div className="">
          <div className="bg-secondary text-2xl text-white py-2 px-4 w-44 text-center rounded-lg">
            Code Here
          </div>

          <textarea
            required
            name="solution"
            id="source"
            onChange={this.input}
            className="source my-4 p-2 w-full bg-gray-200 text-xl rounded-lg h-96"
            value={this.state.input}
          ></textarea>

          <button
            type="submit"
            className="bg-red-500 text-white p-2 w-56 text-center rounded-lg text-2xl"
            onClick={this.submit}
          >Run
          </button>

          <label htmlFor="tags" className="mr-1">
            <b className="px-2 text-xl text-white">Language:</b>
          </label>
          <select
            value={this.state.language_id}
            onChange={this.language}
            id="tags"
            className="text-xl p-2 rounded-lg cursor-pointer w-44"
          >
            <option value="54">C++</option>
            <option value="50">C</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
          </select>

          <div className="mt-4">
            <div className="bg-secondary text-2xl text-white py-2 px-4 w-44 text-center rounded-lg">
              User Input
            </div>
            <textarea id="input" className="my-2 p-2 w-full bg-gray-200 text-xl rounded-lg h-44" onChange={this.userInput}></textarea>
          </div>

        </div>


        <div className="">
          <div className="bg-secondary text-2xl text-white py-2 px-4 w-44 text-center rounded-lg">
            Output
          </div>
          <textarea className="my-4 p-2 w-full bg-gray-200 text-xl rounded-lg h-[44rem]" id="output"></textarea>
        </div>

      </div>
    );
  }
}
