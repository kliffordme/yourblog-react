import React from 'react';

export const Profile = ({name, email}) => {

  return <div className=' py-4 my-5 position-fixed'>
       <div id='black' className='shadow-lg p-4 my-3'>
         <div className='border-bottom border-secondary p-2'>
         User information:

         </div>

            <div  className=' p-4 rounded  '>

                <h5 className='my-2'>{name}</h5>
                <div>
                {email}
            </div>
        </div>
       </div>
  </div>;
};
