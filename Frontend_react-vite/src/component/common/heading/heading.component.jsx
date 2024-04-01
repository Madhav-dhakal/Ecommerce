import styled from "styled-components";
export const Heading=({value,type})=>{
     switch(type){
          case 'h1':
               return<h1>{value}</h1>
               break;
          case 'h2':
               return<h2>{value}</h2>
               break;
           case 'h3':
                    return<h3>{value}</h3>
                    break;
          case 'h4':
                         return<h4>{value}</h4>
                         break; 
           case 'h5':
                              return<h5>{value}</h5>
                              break; 
           case 'h6':
                                   return<h6>{value}</h6>
                                   break;       
     }
}

export const Title = styled.h1`
  color: #001900;
  text-align: center;
`;
export const Divider = styled.hr`
border-color:#001900
`;

export const H1 =({value})=>{
     return(
          <h1>
               {value}
          </h1>
     )
}

const H2 =({value})=>{
     return(
          <h2>
               {value}
          </h2>
     )
}

const H3 =({value})=>{
     return(
          <h3>
               {value}
          </h3>
     )
}

const H4 =({value})=>{
     return(
          <h4>
               {value}
          </h4>
     )
}

const H5 =({value})=>{
     return(
          <h5>
               {value}
          </h5>
     )
}

const H6 =({value})=>{
     return(
          <h6>
               {value}
          </h6>
     )
}