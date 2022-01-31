import React, {useState} from 'react';

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    const [num, setNum] = useState(1) 

    const paginator = (number) => {
        setNum(number)
        paginate(number);
    }


    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }
  return <nav>
      <ul className='pagination justify-content-center mt-3'>
        {pageNumbers.map(number => 
            <li key={number} className='page-item'>
                <a style={{cursor: 'pointer'}} onClick={()=>paginator(number)} className={`page-link border-secondary ${number === num ? 'bg-secondary text-white' : 'bg-dark text-white' } py-0`}>
                    {number}
                </a>
            </li>
            )}
      </ul>

    </nav>;
};
