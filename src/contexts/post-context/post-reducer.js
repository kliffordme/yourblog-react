export const postReducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_POSTS":
            return {
                ...state, 
                posts: action.payload,
                loading: false,
            }
            break
        case "FETCHING":
            return {
                ...state, 
                loading: true,
            }
        case "VIEW_POST": 
            return{
                ...state, 
                post: state.posts.filter(post => post.id === parseInt(action.post_id))[0],
            }
        case "VIEW_SCHOOL_DETAILS": 
        return{
            ...state, 
            school: state.schools.filter(school => school.id === parseInt(action.school_id))[0],
            showDetails: true
            
        }
        case "CLOSE_SCHOOL_DETAILS":
            return{
                ...state, 
                showDetails: false
            }
        case "TOGGLE_MODAL":
            return{
                ...state, 
                    showModal: !state.showModal
            }
        case "TOGGLE_DELETE_MODAL":
            return{
                ...state, 
                    showDeleteModal: !state.showDeleteModal
            }
        case "REMOVE_POST":
            return{
                ...state, 
                    post: state.post.id === null
            }
            break
        default: 
            throw new Error(`${action.type} is not defined`)
    }
}