import React from 'react';
import axios from 'axios';

export const onFollow = async(id, follower, filtered, user_id, fetchPosts, setLoading) => {

        setLoading(true)
        try{
            const res = await
            axios({
              method: follower ? 'delete' : 'post',
              url: follower ? `https://yourblog-api.herokuapp.com/api/followers/${filtered}` : `https://yourblog-api.herokuapp.com/api/followers`,
              data: follower ? null : {
                  user_id: id,
                  follower: user_id,
              },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            fetchPosts()
        }catch(e) {
            console.log(e)
        }   

        setLoading(false)
};

