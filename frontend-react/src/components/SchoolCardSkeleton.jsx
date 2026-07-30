import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SchoolCardSkeleton() {

    return (

        <article className="schoolCard">

            <Skeleton height={30} width="70%" />

            <br />

            <Skeleton width="40%" />

            <br /><br />

            <Skeleton height={25} />

            <br />

            <Skeleton height={25} />

            <br />

            <Skeleton height={25} />

            <br /><br />

            <Skeleton height={40} />

        </article>

    );

}

export default SchoolCardSkeleton;