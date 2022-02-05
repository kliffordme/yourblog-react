import React from 'react';

export const Profile = ({name, email}) => {

  return <div className=' py-4 mx-5'>
       <div className='position-fixed'>
        <div className='py-2 m-3'>
          User information:
            </div>
            <div id='black' className='p-4 py-3 rounded shadow-lg '>
                <h5>{name}</h5>
                <div>
                {email}
            </div>
        </div>
       </div>
  </div>;
};
