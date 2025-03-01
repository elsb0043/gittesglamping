import { useEffect } from "react"
import Swal from "sweetalert2"
import { useFetchActivities } from "../../hooks/useFetchActivities"
import { useFetchStays } from "../../hooks/useFetchStays"
import { useFetchReviews } from "../../hooks/useFetchReviews"

function ConfirmDialog({ activity, stay, review, onClose }) {
  const { deleteActivity } = useFetchActivities()
  const { deleteStay } = useFetchStays()
  const { deleteReview } = useFetchReviews()

  useEffect(() => {
    const handleDelete = async () => {
      const result = await Swal.fire({
        title: "Er du sikker?",
        text: "Denne handling kan ikke fortrydes.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ja, slet!",
        cancelButtonText: "Nej, annuller!",
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        try {
          if (activity?._id) await deleteActivity(activity._id)
          if (stay?._id) await deleteStay(stay._id)
          if (review?._id) await deleteReview(review._id)

          await Swal.fire({
            title: "Slettet!",
            text: "Elementet er slettet.",
            icon: "success",
          })
        } catch (error) {
          await Swal.fire({
            title: "Fejl",
            text: "Noget gik galt ved sletning.",
            icon: "error",
          })
        }
      } else {
        await Swal.fire({
          title: "Annulleret",
          text: "Din handling er annulleret :)",
          icon: "error",
        })
      }

      onClose()
    }

    handleDelete()
  }, [activity, stay, review, deleteActivity, deleteStay, deleteReview, onClose])

  return null
}

export default ConfirmDialog