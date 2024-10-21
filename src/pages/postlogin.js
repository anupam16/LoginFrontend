
import './postlogin.css';

const Postlogin=(props)=>
{
return(
    <div className="postlogin">
   <h1>
    {props.responseobj.fullName}

   </h1>
   <p>
    {props.responseobj.userName}

   </p>
   <p>
    {props.responseobj.phonenumber}

   </p>
   <p>
    {props.responseobj.email}

   </p>


    </div>
);

}

export default Postlogin;