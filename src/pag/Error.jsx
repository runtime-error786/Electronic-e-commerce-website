import { Se } from "../Action";
import { useSelector,useDispatch } from "react-redux";
function Error()
{
    let di = useDispatch();
    di(Se("n"));
    return(
        <>
           <section class="page_4041">
  <div class="container-fluid">
    <div class="row"> 
    <div class="col-sm-12 ">
    <div class="col-sm-12 col-sm-offset-1  text-center">
    <div class="four_zero_four_bg1">
      <h1 class="text-center ">404</h1>
    
    
    </div>
    
    <div class="contant_box_4041">
    <h3 class="h2">
    Look like you're lost
    </h3>
    
    <p>the page you are looking for not avaible!</p>
    
  </div>
    </div>
    </div>
    </div>
  </div>
</section>
        </>
    )
}

export {Error};