import { Link,useParams } from 'react-router-dom';

const SingleDesk = () => {
    const { deskId } = useParams();

    return (
        <section className='section desk'>
            <h2>{deskId}</h2>
            <Link to={'/desks'}>Back to desks</Link>
        </section>
    )
}

export default SingleDesk;