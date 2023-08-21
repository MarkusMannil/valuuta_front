import {useEffect, useState} from "react";
import React from "react";

const UserPage = () => {

    const [valuutad, setValuutad] = useState([]);
    // for showing the result
    const [tul, setTul] = useState("");
    const [eur, setEur] = useState("")
    // for getting the value from filled form
    const [selVal, setSelVal] = useState([]);
    const [amount, setAmount] = useState(0.0);


    useEffect(() => {

        fetch("/api/v1/user/valuuta", {
            headers: {
                "Content-type": "application/json",
            },
            method: "get",
        }).then((response) => response.json())
            .then((data) => setValuutad(data))

    }, [])

    useEffect(() => {
        console.log(valuutad)
        if (valuutad.length !== 0) {
            setSelVal([valuutad[0].vaartus, valuutad[0].sümbol, valuutad[0].nimi])
        }
    }, [valuutad])

    return (
        <div className="App">
            <h1> Valuutavahetus</h1>

            <select onChange={(event) => {
                console.log(event.target.value)
                setSelVal(event.target.value.split(","))
            }
            }>
                {valuutad.map((valuuta) => <option key={valuuta.id}
                                                   value={[valuuta.vaartus, valuuta.sümbol, valuuta.nimi]}>{valuuta.nimi + ": " + valuuta.sümbol}</option>)}
            </select>
            <p>
                Kurss : <table>{selVal[0] + " " + selVal[1] + " = 1 euro "}</table>
            </p>
            <p>
                Vali välja vahetatav summa <br/>
                <input pattern={"[0-9]+.?[0-9]*"} onChange={(e) =>
                    setAmount((v) => (e.target.validity.valid ? e.target.value : -1))} defaultValue={0}/>
                <a className="error"> {(amount === -1 ? "Peab olema number" : "")}</a>
            </p>
            <p>
                <br/>
                <button
                    onClick={() => (
                        (amount !== -1) && (selVal.length !== 0) ? setTul((amount/1.0).toFixed(2)+" "+ selVal[1] +" = "+ (amount / selVal[0]).toFixed(2) + " €") : setTul(""))}>
                    Konverteeri eurodeks
                </button>

                <button
                    onClick={() => (
                        (amount !== -1) && (selVal.length !== 0) ? setTul( (amount/1.0).toFixed(2) +" €" + " = " +(amount * selVal[0]).toFixed(2) + " " + selVal[1] ) : setTul(""))}>
                    Konverteeri {selVal[2]}-sse
                </button>

            </p>
            <p>
               Vahetus: <table>{tul}</table>

            </p>
        </div>
    );

}

export default UserPage