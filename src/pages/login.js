import React, {useState,useEffect} from 'react';
import md5 from 'md5';
import  'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios  from 'axios';
import '../css/login.css';

function Login(props){
const baseUrl="https://localhost:44310/api/usuarios";
const cookies = new Cookies();

const [Form, setForm]=useState({
    username:'',
    password: ''
  });
    const handleChange=e=>{
   const {name, value} = e.target;
   setForm({
     ...Form,
     [name]: value
   });
   console.log(Form);
}
const iniciarSesion=async()=>{
await axios.get(baseUrl+`/${Form.username}/${md5(Form.password)}`)
.then(response=>{
    return response.data;
}).then(response=>{
    if(response.length>0){
        var respuesta=response[0];
        cookies.set('id', respuesta.id, {path: '/'});
        cookies.set('apellido', respuesta.apellido, {path: '/'});
        cookies.set('nombre', respuesta.nombre, {path: '/'});
        cookies.set('correo', respuesta.correo, {path: '/'});
        cookies.set('username', respuesta.username, {path: '/'});
        cookies.set('password', respuesta.password, {path: '/'});
        alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido);
        props.history.push('/menu');

}else{

    alert("el usuario o contraseña son incorrectos");}
})

.catch(error=>{
    console.log(error)
})
}
useEffect(()=>{
    if(cookies.get('id')){
      props.history.push('/menu');
    }
      },[]);

    return(
        <div className="containerPrincipal">
            <div className="containerLogin">
                <div className="form-group">
                    <label>Usuario</label>
                    <br/>
                    <input
                    type="text"
                    className="form-group"
                    name="username"
                    onChange={handleChange}
                    />
                    <br/>
                    <label>Contraseña</label>
                    <br/>
                    <input
                    type="password"
                    className="form-group"
                    name="password"
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <button className="btn btn-primary"onClick={()=>iniciarSesion()}>Iniciar sesion</button>


                </div>

            </div>

        </div>
    
    );

}
export default Login;