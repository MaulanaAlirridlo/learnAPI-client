import axios from 'axios'

export const getPost = () => {
    return axios
    .get('/api/post', {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        return res.data
    })
}

export const addPost = (title, content) => {
    return axios
    .post('/api/post', 
        {
            title : title,
            content : content
        },
        {
            headers: {'Content-Type' : 'application/json'}
        }
    )
    .then(res =>{
        console.log(res)
    })
}

export const updatePost = (title, content, id) => {
    return axios
    .put(`api/post/${id}`,
        {
            title : title,
            content : content
        },
        {
            headers: {'Content-Type' : 'application/json'}
        }
    )
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const deletePost = id => {
    axios
    .delete(`api/post/${id}`, {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}