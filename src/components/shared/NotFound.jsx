import img from '../../assets/notFoundPage.webp'

const NotFound = () => {
    return (
        <div className='mt-5'>
            <img className=' w-screen min-h-screen' src={img} alt="" />
        </div>
    );
};

export default NotFound;