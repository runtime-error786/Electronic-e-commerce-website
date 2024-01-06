let init="Heloo";
let NameSI = (state=null,action)=>{
    if(action.type=="Search")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let coca = (state=0,action)=>{
  if(action.type=="coca")
  {
      return state = action.payload;
  }
  else{
      return state;
  }
}

let Show = (state="n",action)=>{
  if(action.type=="Show")
  {
      return state = action.payload;
  }
  else{
      return state;
  }

}
let Rolee = (state="guest",action)=>{
  if(action.type=="role")
  {
      return state = action.payload;
  }
  else{
      return state;
  }
}

let TotalCart = (state=0,action)=>{
  if(action.type=="totalp")
  {
      return state = action.payload;
  }
  else{
      return state;
  }
}

const productsReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS':
        return action.payload;
      default:
        return state;
    }
  };

  const cartReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_CPRODUCTS':
        return action.payload;
      default:
        return state;
    }
  };

let Total = (state=null,action)=>{
    if(action.type=="total")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}
let Current = (state=null,action)=>{
    if(action.type=="current")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}
export { productsReducer,Total,Current,cartReducer,TotalCart ,Rolee,Show,coca};  
export {NameSI};