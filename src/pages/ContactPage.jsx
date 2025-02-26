import Contact from "../components/Contact/Contact"
import PageHeader from "../components/PageHeader/PageHeader"
import image_03 from "/assets/img/image_03.jpg"

function ContactPage() {

    return (
        <>
           <PageHeader title='Kontakt Gitte' img={image_03} />
           <Contact />
        </>
    )
}

export default ContactPage