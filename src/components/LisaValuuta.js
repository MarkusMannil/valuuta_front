import {useNavigate} from "react-router-dom";
import './style.css'
import {useState} from "react";

const LisaValuuta = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(0)

    const postUpdate = () => {
        fetch("/api/v1/admin/post/valuuta", {
            body:
                JSON.stringify({
                    nimi: document.getElementById("nimi").value,
                    vaartus: document.getElementById("kurss").value,
                    sümbol: document.getElementById("sümbol").value
                }),
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
        }).then((response) => {
            console.log(response);
        })
        navigate('/admin')
    }

    return (<div>
        <p>
            <label>Nimi :&nbsp;</label> <input id="nimi"/><br/>
            <label>Kurss :&nbsp;</label> <input pattern={"[0-9]+.?[0-9]*"}
                                                onChange={(e) => setError(e.target.validity.valid ? e.target.value : -1)}
                                                 id="kurss"/>
            <a className="error"> {error === -1 ? "Peab olema number" : ""}</a><br/>

            <label>Sümbol :&nbsp;</label> <input id="sümbol"/><br/>
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
export default LisaValuuta
