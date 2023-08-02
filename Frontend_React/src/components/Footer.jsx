import styles from "../components/footer.module.css"
export default function Footer() {
    return <footer>
        <div className={styles.footer}>
            &copy;copyright 2023 <span>G</span>roupe <span>M</span>élanome . Tous droits reservés
        </div>
    </footer>
}