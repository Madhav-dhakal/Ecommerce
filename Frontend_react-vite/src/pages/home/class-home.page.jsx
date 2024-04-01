import React from "react"
// const HomePage =()=>{
//      return (
//      <div>
//           <h1>Home Page</h1>
//           <h3>Content</h3>
//      </div>
//      )
// }
// component lifecycle on basis of class
class HomePage extends React.Component{
     constructor(){
          super()
          //create state, no api call in constrctor
          this.state={
              title:"wow",
              content:"excited"
          }
          console.log("I am constructor")
     }
                          //constructor->render->DidMount->rerender->DidUpdate = flow
     componentDidMount=()=>{
          //API call
          setTimeout(()=>{
               this.setState({ 
                    ...this.state,
                    title:"Home Page",
                    content:"I am dummy content"
                     })
          },1000)
          
          console.log("I am on componentDidMount");
     }

     componentDidUpdate=()=>{
     
          console.log("I am on compoenent DidUpdate");
     }

      increaseValue=()=>{
          // state change
      }
     componentWillUnmount=()=>{ // to eject 1 comp. and enter into another comp.using routes
          console.log("I am on component DidUnmount");
     }
     render=()=>{
          console.log("I am render")

         return (
  <div>
     <h1>{this.state.title}</h1>
     <div>{this.state.content}</div>
  </div>
         )
         
     }
     
}
  export default HomePage