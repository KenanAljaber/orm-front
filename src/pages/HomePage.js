import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { provs_api, cant_api } from "../components/apis";
import "../styles/index.css";
const HomePage = () => {
    const [datos, setDatos] = useState([]);
    const [newProv, setNewProv] = useState({ "provinciaName": "" });
    const [newcanton, setNewCanton] = useState({
        "cantonName": "",
        "provinciaName":""
    });
    const [cantonName,setCantonName]=useState("");
    const warningDiv = useRef(null);
    const cantonInput = useRef(null);
    
    useEffect(() => {
        loadData(provs_api.ALL_PROV);
    }, []);

    function loadData(api) {
        axios.get(api).then(resp => {
            setDatos(resp.data);
        });
    }

    function handleChange(e) {
        setNewProv({ "provinciaName": e.target.value });

    }
    function addNewProv() {
        if (newProv.provinciaName.length > 0) {
            axios.post(provs_api.ADD_PROV, newProv).then(response => {
                setNewProv({ "provinciaName": "" });
                loadData(provs_api.ALL_PROV);
                showHideSuccess("Success", "#00d60096");
            }, (error) => {
                console.log(error);
            });
        } else {
            showHideSuccess("Please fill the province name", "#d6000096")
        }


    }

    function deleteProv(prov) {
        axios.post(provs_api.DELETE_PROV, prov).then(res => {
            showHideSuccess("Deleted!", "#d6000096");
            loadData(provs_api.ALL_PROV);
        }, (error) => {
            console.log(error);
        });
    }
    function showHideSuccess(text, bgColor) {
        warningDiv.current.style.display = "block";
        warningDiv.current.innerText = text;
        warningDiv.current.style.backgroundColor = bgColor;
        setTimeout(() => {
            warningDiv.current.style.display = "none";
        }, 2000)
    }

    function addCanton(prov){
        if(cantonName){
            setNewCanton({
                "cantonName": cantonName,
                "provinciaName":prov.provinciaName
            });
            if(newcanton.cantonName && newcanton.provinciaName){
                axios.post(cant_api.ADD_CANT, newcanton).then(resp=>{
                    showHideSuccess("Success", "#00d60096");
                    setCantonName("");
                    loadData(provs_api.ALL_PROV);
                },(error=>{
                    
                }))
            }
        }
      
     
    }
    function handleCantonChange(){
        setCantonName(cantonInput.current.value);
    }

    return (
        <div className="homePage">
            <h1>Lista de provincias</h1>
            <div className="added" ref={warningDiv}>Success</div>
            {
                datos.length == 0 ?
                    <div className="addProvinciaContainer">
                        <h3>No hay provincias :(</h3>
                        <p>Agrega una para comienzar</p>
                        <input placeholder="Ingresa nombre de provincia..." onChange={handleChange} value={newProv.provinciaName} />
                        <button onClick={addNewProv}>Agregar</button>
                    </div> :

                    <div className="provsList">
                        <div className="addBar">
                            <input placeholder="Ingresa nombre de provincia..." onChange={handleChange} value={newProv.provinciaName} />
                            <button onClick={addNewProv}>Agregar</button>
                        </div>
                        {
                            datos.map(it => {
                                return <div key={it.id} className="provRow" onClick={() => {
                                    axios.post(provs_api.GET_PROV, it).then(resp => {
                                        if (resp.data.length > 0) {
                                            setDatos(resp.data);
                                        }

                                    })
                                }}>
                                    <div className="delete" onClick={() => {
                                        deleteProv(it);
                                    }}>X</div>
                                    <h3>{it.provinciaName}</h3>
                                    <input placeholder="add canton..."  ref={cantonInput} onChange={handleCantonChange} value={cantonName}/>
                                    <button onClick={()=>
                                        addCanton(it)
                                    }>Agregar Canton</button>
                                </div>
                            })
                        }
                    </div>
            }


        </div>

    );
}

export default HomePage;
