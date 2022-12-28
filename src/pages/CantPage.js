import { useEffect, useState } from "react";
import axios from "axios";
import { provs_api, cant_api } from "../components/apis";

const CantPAge = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        loadData(cant_api.ALL_CANTON);
    }, []);

    function loadData(api) {
        axios.get(api).then(resp => {
            setDatos(resp.data);
            console.log(resp.data);
        });
    }
    return (    
        <div>
            {
                datos.map(it=>{
                    return <div>{it.cantonName}</div>
                })
            }
        </div>
      );
}
 
export default CantPAge;