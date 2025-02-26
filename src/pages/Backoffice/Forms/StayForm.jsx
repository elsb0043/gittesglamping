import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useFetchStays } from "../../../hooks/useFetchStays"
import styles from "./form.module.css"
import Button from "../../../components/Button/Button"

const StayForm = ({ isEditMode }) => {
    const [title, setTitle] = useState("")
    const [numberOfPersons, setNumberOfPersons] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const { refetch } = useOutletContext()
    const [selectedFile, setSelectedFile] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const { createStay, fetchStayById, updateStay } = useFetchStays()

    // Hent udtalelsen hvis editMode er true
    useEffect(() => {
        if (isEditMode && id) {
            const loadStayData = async () => {
                try {
                  const response = await fetchStayById(id)
        
                  if (response) {
                    // Forudfyld formularen med opholdets data
                    setTitle(response.title)
                    setDescription(response.description)
                    setNumberOfPersons(response.numberOfPersons)
                    setPrice(response.price)
                    setImage(response.image)
                  }
                } catch (error) {
                  console.error("Error fetching stay:", error)
                }
            }

            loadStayData()
        }
    }, [])

    // Forhåndsvis billede
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            const objUrl = window.URL.createObjectURL(file)
            setImage(objUrl)
        }
    }

    const handleSubmitStay = async (event) => {
        event.preventDefault()

        const stayData = new FormData()
        stayData.append("title", title)
        stayData.append("description", description)
        stayData.append("antal", numberOfPersons)
        stayData.append("price", price)

        // Tilføj billedet hvis det er valgt
        if (selectedFile) {
            stayData.append("file", selectedFile)
        }

        try {
            let response
            if (isEditMode && id) {
                stayData.append("id", id)
                response = await updateStay(stayData)
            } else {
                response = await createStay(stayData)
            }
            console.log (
                isEditMode ? "Ophold opdateret" : "Ophold oprettet", 
                response
            )

            if (response) {
                await refetch()
                navigate("/backoffice/stays")
            }
        } catch (error) {
            console.error("Fejl ved håndtering af stay:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitStay} className={styles.form}>
            <h2>{isEditMode ? "Opdater ophold" : "Tilføj ophold"}</h2>
            <div>
                {/* 
                Når htmlFor-attributten på en <label> matcher id-attributten på et <input>-element, oprettes der en forbindelse mellem dem.
                Dette betyder, at når brugeren klikker på etiketten, bliver det tilknyttede inputfelt automatisk aktiveret eller fokuseret. 
                Dette gør både brugervenligheden og tilgængeligheden (accessibility) bedre
                */}
                <label htmlFor='title'>Titel:</label>
                <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor='description'>Beskrivelse:</label>
                <input
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor='numberOfPersons'>Antal:</label>
                <input
                id='antal'
                type='text'
                value={numberOfPersons}
                onChange={(e) => setNumberOfPersons(e.target.value)}
                required
                />
            </div>
            <div>
            <label htmlFor='price'>Pris:</label>
            <input
                id='price'
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            </div>

            <div>
                <label htmlFor='image'>Vælg billede (valgfrit):</label>
                {image && <img className={styles.previewImage} src={image} />}
                <input id='image' type='file' onChange={handleImageChange} />
            </div>

            <Button
                type='submit'
                buttonText={isEditMode ? "Opdater ophold" : "Tilføj ophold"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default StayForm