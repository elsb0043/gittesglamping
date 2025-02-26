import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useFetchReviews } from "../../../hooks/useFetchReviews"
import styles from "./form.module.css"
import Button from "../../../components/Button/Button"

const ReviewForm = ({ isEditMode }) => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [review, setReview] = useState("")
    const [stay, setStay] = useState("")
    const { refetch } = useOutletContext()
    const navigate = useNavigate()
    const { id } = useParams()
    const { createReview, fetchReviewById, updateReview } = useFetchReviews()

    // Hent udtalelsen hvis editMode er true
    useEffect(() => {
        if (isEditMode && id) {
            const loadReviewData = async () => {
                try {
                  const response = await fetchReviewById(id)
        
                  if (response) {
                    // Forudfyld formularen med udtalelsen data
                    setName(response.name)
                    setAge(response.age)
                    setPrice(response.price)
                  }
                } catch (error) {
                  console.error("Error fetching review:", error)
                }
            }

            loadReviewData()
        }
    }, [])


    const handleSubmitReview = async (event) => {
        event.preventDefault()

        const reviewData = new FormData()
        reviewData.append("name", name)
        reviewData.append("review", review)
        reviewData.append("stay", stay)

        try {
            let response
            if (isEditMode && id) {
                reviewData.append("id", id)
                response = await updateReview(reviewData)
            } else {
                response = await createReview(reviewData)
            }
            console.log (
                isEditMode ? "Udtalelse opdateret" : "Udtalelse oprettet", 
                response
            )

            if (response) {
                await refetch()
                navigate("/backoffice/reviews")
            }
        } catch (error) {
            console.error("Fejl ved håndtering af udtalelse:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitReview} className={styles.form}>
            <h2>{isEditMode ? "Opdater udtalelse" : "Tilføj udtalelse"}</h2>
            <div>
                {/* 
                Når htmlFor-attributten på en <label> matcher id-attributten på et <input>-element, oprettes der en forbindelse mellem dem.
                Dette betyder, at når brugeren klikker på etiketten, bliver det tilknyttede inputfelt automatisk aktiveret eller fokuseret. 
                Dette gør både brugervenligheden og tilgængeligheden (accessibility) bedre
                */}
                <label htmlFor='name'>Navn:</label>
                <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor='age'>Alder:</label>
                <input
                id='age'
                type='text'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                />
            </div>
            <div>
            <label htmlFor='review'>Udtalelse:</label>
            <input
                id='review'
                type='text'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
            />
            <label htmlFor='stay'>Pakke:</label>
            <input
                id='stay'
                type='text'
                value={stay}
                onChange={(e) => setStay(e.target.value)}
                required
            />
            </div>

            <Button
                type='submit'
                buttonText={isEditMode ? "Opdater udtalelse" : "Tilføj udtalelse"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default ReviewForm