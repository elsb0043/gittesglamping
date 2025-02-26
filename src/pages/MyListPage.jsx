import MyListContent from "../components/MyListContent/MyListContent";
import PageHeader from "../components/PageHeader/PageHeader";
import image_05 from "/assets/img/image_05.jpg";

function MyListPage() {

    return (
        <>
            <PageHeader title="Min Liste" img={image_05} />
            <MyListContent />
        </>
    )
}

export default MyListPage