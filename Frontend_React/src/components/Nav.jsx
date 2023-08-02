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
                    <Link to="/contact">Dataset</Link>
                </li>
                <li>
                    <Link to="/detaitPatient">Detaille</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/test">Test</Link>
                </li>
                <li>
                    <Link to="/hassan">Test2</Link>
                </li>
            </ul>
        </nav>

    </nav>


}