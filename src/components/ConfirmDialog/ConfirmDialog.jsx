import { useEffect } from "react"
import Swal from "sweetalert2"
import { useFetchActivities } from "../../hooks/useFetchActivities"

function ConfirmDialog({ activity, onClose }) {
  const { deleteActivity } = useFetchActivities()

  useEffect(() => {
    Swal.fire({
      title: "Er du sikker?",
      text: "Denne handling kan ikke fortrydes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ja, slet!",
      cancelButtonText: "Nej, annuller!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteActivity(activity._id) 
        Swal.fire({
          title: "Slettet!",
          text: "Det er slettet.",
          icon: "success",
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Annulleret",
          text: "Din handling er annulleret :)",
          icon: "error",
        })
      }
      onClose() 
    })
  }, [activity, deleteActivity, onClose])

  return null
}

export default ConfirmDialog