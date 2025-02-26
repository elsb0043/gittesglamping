import HomePageHeader from "../components/HomePageHeader/HomePageHeader"
import Reviews from "../components/Reviews/Reviews"
import Welcome from "../components/Welcome/Welcome"
import image_00 from "/assets/img/image_00.jpg"

function Home() {

    return (
        <>
            <HomePageHeader subtitle='Gittes' title='Glamping' img={image_00} />
            <Welcome />
            <Reviews />
        </>
    )
}

export default Home