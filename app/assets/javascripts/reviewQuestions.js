// function hoisting() {
//   console.log(a);
//   console.log(daHoist());
//   console.log(da2ndHoist());
//
//   var a = "a";
//
//   function daHoist() {
//     return "the first hoist";
//   }
//
//   var da2ndHoist = function() {
//     return "the second hoist";
//   }
// }
//
// function hoisting() {
//   var a;
//   var da2ndHoist;
//   function daHoist() {
//     return "the first hoist";
//   }
//
//   console.log(a);
//   console.log(daHoist());
//   console.log(da2ndHoist;
//
//   a = "a";
//   da2ndHoist = function() {
//     return "the second hoist";
//   }
// }
//
// hoisting()
// // undefined
// // "the first hoist"
// // TypeError
//
//
//
// // What is "this"?
// var name = "megaman";
// var gameCharacter = {
//   name: "ice climber",
//   properties: {
//     name: "samus",
//     getName: function() {
//       return this.name;
//     }
//   }
// }
//
// console.log(gameCharacter.properties.getName()); // "Samus"
// var characterName = gameCharacter.properties.getName;
// console.log(characterName()); // "megaman"
//
//
// class Games extends Component {
//
//   constructor(props) {
//     super(props)
//     this.state = {
//       games: []
//     }
//   }
//
//   handleOnClick = () => {
//     fetchGame
//       .then(games => this.setState({
//         games
//       }))
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleOnClick)}>Get Games</button>
//         <input onChange={(event) => this.handleOnChange(event)} />
//       </div>
//     )
//   }
//
// }
