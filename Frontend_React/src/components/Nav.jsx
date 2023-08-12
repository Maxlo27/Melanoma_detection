import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nas.module.css"


export default function Nav() {
    return <nav className={styles.navcontainer}>
        <div className={styles.logo}>
            <Link to="#"><span>P</span>rojet <span>C</span>apstone</Link>
        </div>
        <nav className={styles.navmenu}>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/dataset">Dataset</Link>
                </li>
                <li>
                    <Link to="/detaitPatient">Détail</Link>
                </li>
                <li>
                    <Link to="/contact"></Link>
                </li>
                <li>
                    <Link to="/test"></Link>
                </li>
                <li>
                    <Link to="/hassan">Delete</Link>
                </li>
            </ul>
        </nav>

    </nav>


}