import PageHeader from "../../components/PageHeader/PageHeader"
import AStayContent from "../../components/StayContent/AStayContent"
import image_02 from "/assets/img/image_02.jpg"

function AStay() {

    return (
        <>
            <PageHeader title='Weekendtur' img={image_02} />
            <AStayContent />
        </>
    )
}

export default AStay