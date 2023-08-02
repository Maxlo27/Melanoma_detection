import Modal from '@mui/material/Modal';

export default function Modall() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [diagnostic, setDiagnostic] = useState(null);
    const [features, setFeatures] = useState(null);
    const [id, setId] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [localisation, setLocalisation] = useState("");

    const archiver = () => {
        const archive = { 'features': predictions, 'diagnostic': diagnostic, 'id': id, 'age': age, 'sex': sex, 'localisation': localisation }
        console.log(archive)
    }

    return <>
        <body>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form>
                        <label>Id:
                            <input type="text" value={id} onChange={(e) => setId(e.target.value)} /><br />
                        </label>
                        <label>Age:
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br />
                        </label>
                        <label>Sex:
                            <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} /><br />
                        </label>
                        <label>Localisation:
                            <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} /><br />
                        </label>
                    </form>
                    <button onClick={archiver}>Archiver</button>
                    <button onClick={handleClose}>Archiver</button>
                </Box>
            </Modal>

            <button class="button-41" role="button" onClick={handleOpen}>Archiver resultat</button>
        </body>


    </>

}

