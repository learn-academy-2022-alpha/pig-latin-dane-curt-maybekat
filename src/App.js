import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'

class App extends Component {
  constructor(props) {
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "alpha through yummy squeal queen fry",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      const vowels = "aeiou"

      let vowelsArray = currentWord.split("").filter(vowel => {
        // return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
        return vowels.split("").includes(vowel.toLowerCase())
      })
      console.log("vowelsArray:", vowelsArray)

      // Aye burgers quick give me some by the door yay
      // ayeway urgersbay ickquay ivegay emway omesay ybay ethay oorday ayyay

      // Thoughts:
      // Organized phrase into the conditions set forth to see/understand input/output
      // Translated the phrase by hand to the desired output
      // If the word is only single letter with no vowels as an input - what to do?
      // Puncation?
      // If user inputs only spaces or random symbols: @$$

      //Pseudo Code:
      // Create a empty string for translated word
      // Check each Conditional:
      // 1. Check if the words starts with a consonant
      // 1.5. Check if the word starts with multiple consonants
      // 2. Check if the word starts with a vowel.
      // 3. If the vowels array is empty and the word contains a "y", y is the vowel
      // 4. IF the word is a qu or is in the first syllable, move the u with q.

      const vowelsRegex = /[aeiou]/

      // your code here!
      let translatedWord = ""
      const vowelIdx = currentWord.search(vowelsRegex)
      if (currentWord.toLowerCase().includes("qu")) {
        const vowelsWithoutU = /[aeio]/
        const vowelNoUIdx = currentWord.search(vowelsWithoutU)
        translatedWord = currentWord.slice(vowelNoUIdx) + currentWord.slice(0, vowelNoUIdx) + "ay"
      } else if (!vowelsArray.includes(currentWord[0])) {
        if (!vowelsArray.includes(currentWord[1])) {
          translatedWord = currentWord.slice(vowelIdx) + currentWord.slice(0, vowelIdx) + "ay"
        } else {
          translatedWord = currentWord.slice(vowelIdx) + currentWord[0] + "ay"
        }
      } else if (vowelsArray.includes(currentWord[0])) {
        translatedWord = currentWord + "way"
      } else {
        if (vowelsArray.length === 0) {
          if (currentWord.includes("y")) {
            const yIdx = currentWord.search(/y/)
            translatedWord = currentWord.slice(yIdx) + currentWord.slice(0, yIdx) + "ay"
          }
        }
      }
      console.log(translatedWord)



      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return translatedWord.toLowerCase()
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({ phraseTranslated: translatedWords })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "alpha through yummy squeal queen fry",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({ phrase: e.target.value })
  }

  render() {
    return (
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPig}
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by Curt & Dane</footer>
      </>
    )
  }
}

export default App
