
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/convert", async (req, res) => {
  const codeInput = req.body.code;
  const targetLanguage = req.body.language;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `convert ${codeInput} this code into ${targetLanguage} code`,
      max_tokens: 1000,
    });
    console.log(response.data.choices[0].text);
    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});

app.post("/debug", async (req, res) => {
  const codeInput = req.body.code;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please debug this code ${codeInput} and explain in 2-5 pionters each pionter has 5-8 words `,
      max_tokens: 1000,
    });
    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});


app.post("/qualitycheck", async (req, res) => {
  const codeInput = req.body.code;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please check the quality of this following code and explain how code can be improved in 2-5 pionters each pionter has 5-8 words and rate the code with max points of 10 ${codeInput}`,
      max_tokens: 1000,
    });

    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});

app.listen(3000, () => {
  console.log(`server is running at port 3000`);
});