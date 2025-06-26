
import { BookType } from '@/constants/types';
import Carousel from './Carousel';


const HomePage = ({books}: {books: BookType[]} ) => {

    
  return (
    <div>
        <div>
            <h2 className='text-5xl font-semibold my-4 text-center'>Welcome traveler</h2>
            <div className='w-[80%] mx-auto'>
                <Carousel books={books}/>
            </div>
        </div>
    </div>
  )
}

export default HomePage;