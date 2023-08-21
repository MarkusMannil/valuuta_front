import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

const AdminPage = () => {

    const [valuutad, setValuutad] = useState([])


    useEffect(() => {
        fetch("/api/v1/admin/valuuta", {
            headers: {
                "Content-type": "application/json",
            }, method: "get",
        }).then((response) => response.json())
            .then((data) => setValuutad(data))
    }, [valuutad])


    const delVal = (valuuta) => {
        fetch("/api/v1/admin/delete/valuuta", {
            body:
                JSON.stringify({
                    id: valuuta.id,
                    nimi: valuuta.nimi,
                    vaartus: valuuta.vaartus,
                    sümbol: valuuta.sümbol
                }),
            method: "delete",
            headers: {
                "Content-type": "application/json",
            },

        }).then((response) => {
            console.log(response);
        })
        setValuutad(valuutad)
    }


    let navigate = useNavigate();


    return (<div className="App">
        <h1> Admin Valuuta vahetus</h1>
        <table>
            {valuutad.map((valuuta) => <tr key={valuuta.id}>
                <td>
                    {valuuta.nimi}
                </td>
                <td>
                    {valuuta.vaartus + " " + valuuta.sümbol + " = 1 eur"}
                </td>
                <td>
                    <button onClick={() => {
                        navigate('/muuda', {
                            state: {
                                id: valuuta.id,
                                nimi: valuuta.nimi,
                                vaartus: valuuta.vaartus,
                                symbol: valuuta.sümbol
                            }
                        })
                    }}
                    > muuda
                    </button>
                </td>
                <td>
                    <button onClick={() => {
                        delVal(valuuta)
                    }
                    }> kustuta
                    </button>
                </td>
            </tr>)}
            <tr>
                <button onClick={() => navigate('/lisa')}>Lisa valuuta</button>
            </tr>
        </table>
    </div>)
};


export {AdminPage}