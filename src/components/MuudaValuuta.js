import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './style.css'

const MuudaValuuta = () => {

    const navigate = useNavigate();
    const {state} = useLocation()
    const {id, nimi, vaartus, symbol} = state
    const [error, setError] = useState(0)


    const postUpdate = () => {
        fetch("/api/v1/admin/update/valuuta", {
            body: JSON.stringify({
                id: id,
                nimi: document.getElementById("nimi").value,
                vaartus: document.getElementById("kurss").value,
                sümbol: document.getElementById("sümbol").value
            }), method: "post", headers: {
                "Content-type": "application/json",
            },

        }).then((response) => {
            console.log(response);
        })
        navigate("/admin");
    }

    return (<div>
        <p>
            <label>Nimi :&nbsp;</label> <input id="nimi" defaultValue={nimi}/><br/>
            <label>Kurss :&nbsp;</label> <input pattern={"[0-9]+.?[0-9]*"}
                                                onChange={(e) => setError(e.target.validity.valid ? e.target.value : -1)}
                                                defaultValue={vaartus} id="kurss"/>
            <a className="error"> {error === -1 ? "Peab olema number" : ""}</a><br/>
            <label>Sümbol :&nbsp;</label> <input id="sümbol" defaultValue={symbol}/><br/>
        </p>
        <p>
            <button onClick={error !== -1 ? postUpdate : console.log("not valid kurss")}>Save</button>
        </p>

        <p>
            <button onClick={() => navigate('/admin')}>Back
            </button>
        </p>

    </div>);
}

export default MuudaValuuta

