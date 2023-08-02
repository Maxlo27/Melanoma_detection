import { useState } from "react"
import styles from "../components/com.module.css"

export default function Compteur() {
    const dataset = [
        { "id": 2, "name": "John", "age": 35 },
        { "id": 4, "name": "Peter", "age": 67 },
        { "id": 8, "name": "Mary", "age": 98 }
    ]

    const [compteur, Setcompteur] = useState(0)

    const increment = () => {
        Setcompteur(compteur + 1)


        console.log("allo")



    }

    return <>

       
        <div className={styles.tablecontainer}>
            <h2>Dataset Table</h2>
            <table className={styles.datasettable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Âge</th>
                    </tr>
                </thead>
                <tbody>
                    {dataset.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        




    </>
}