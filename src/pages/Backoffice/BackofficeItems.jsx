import { Outlet, useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { useFetchActivities } from "../../hooks/useFetchActivities"
import { useFetchStays } from "../../hooks/useFetchStays"
import { useFetchReviews } from "../../hooks/useFetchReviews"

// ACTIVITIES
const BackofficeActivities = () => {
  const { activities, deleteActivity, refetch } = useFetchActivities()
  const navigate = useNavigate()

  const handleAddActivity = () => {
    navigate("/backoffice/activities/add")
  }

  const handleEdit = (activityId) => {
    navigate(`/backoffice/activities/edit/${activityId}`)
  }

  console.log(activities)
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beskrivelse</th>
            <th>Ugedage</th>
            <th>Tidspunkt</th>
            <th>Billede</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {activities?.map((activity) => (
            <tr key={activity._id} className='backofficeItem'>
              <td>{activity.title}</td>
              <td>{`${activity.description.slice(0, 10)}...`}</td>
              <td>{activity.date}</td>
              <td>{activity.time}</td>
              <td>
                <img src={activity.image}></img>
              </td>
              <td className='buttons'>
                <Button
                  buttonText='Slet'
                  background='red'
                  onClick={() => deleteActivity(activity._id)}
                />
                <Button
                  buttonText='Redigér'
                  onClick={() => handleEdit(activity._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj aktivitet'
                background='green'
                onClick={() => handleAddActivity()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

// STAYS
  const BackofficeStays = () => {
  const { stays, deleteStay, refetch } = useFetchStays()
  const navigate = useNavigate()

  const handleAddStay = () => {
    navigate("/backoffice/stays/add")
  }

  const handleEdit = (stayId) => {
    navigate(`/backoffice/stays/edit/${stayId}`)
  }

  console.log(stays)
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beskrivelse</th>
            <th>Antal</th>
            <th>Pris</th>
            <th>Billede</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {stays?.map((stay) => (
            <tr key={stay._id} className='backofficeItem'>
              <td>{stay.title}</td>
              <td>{`${stay.description.slice(0, 10)}...`}</td>
              <td>{stay.numberOfPersons}</td>
              <td>{stay.price}</td>
              <td>
                <img src={stay.image}></img>
              </td>
              <td className='buttons'>
                <Button
                  buttonText='Slet'
                  background='red'
                  onClick={() => deleteStay(stay._id)}
                />
                <Button
                  buttonText='Redigér'
                  onClick={() => handleEdit(stay._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj ophold'
                background='green'
                onClick={() => handleAddStay()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

// REVIEWS
const BackofficeReviews = () => {
  const { reviews, deleteReview, refetch } = useFetchReviews()
  const navigate = useNavigate()

  const handleAddReview = () => {
    navigate("/backoffice/reviews/add")
  }

  const handleEdit = (reviewId) => {
    navigate(`/backoffice/reviews/edit/${reviewId}`)
  }

  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Alder</th>
            <th>Udtalelse</th>
            <th>Pakke</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review) => (
            <tr key={review._id} className='backofficeItem'>
              <td>{review.name}</td>
              <td>{review.age}</td>
              <td>{`${review.review.slice(0, 10)}...`}</td>
              <td>{review.stay}</td>
              <td className='buttons'>
                <Button
                  buttonText='Slet'
                  background='red'
                  onClick={() => deleteReview(review._id)}
                />
                <Button
                  buttonText='Redigér'
                  onClick={() => handleEdit(review._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj udtalelse'
                background='green'
                onClick={() => handleAddReview()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeActivities, BackofficeStays, BackofficeReviews }