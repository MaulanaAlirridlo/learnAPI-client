import React, {useState, useEffect} from 'react';
import {getPost, addPost, updatePost, deletePost} from './PostAPI';

function Post() {

    const [post, setPost] = useState({
        id : '',
        title : '',
        content : '',
        disable : false
    })
    const [items, setItems] = useState([])
    // const [disable, setDisable] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        const newState =  await getPost()
        setItems(newState)
    }

    // jika getPost tidak ada return / tidak pakai fungsi getPost langsung get dalam useEffect
    // useEffect(async () => {
    //     const newState =  await getPost()
    //     setItems(newState)
    // }, [])

    useEffect(() => {
        // console.log(post)
        // console.log(items)
    }, [post, items])

    const onChange = e => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        addPost(post.title, post.content).then(() => {
            setPost({
                title: '',
                content: ''
            })
        })
        fetchData();
    }

    const onEdit = (e,id) => {
        e.preventDefault()

        var data = [...items]
        data.forEach((item,index) => {
            if(item.id === id) {
                setPost({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    disable : true
                })
            }
        })
    }

    const onUpdate = e => {
        e.preventDefault()
        updatePost(post.title, post.content, post.id)
        setPost({
            title: '',
            content: '',
            disable: false
        })
        fetchData();
    }

    const onDelete = (e, id) => {
        e.preventDefault();
        deletePost(id);
        fetchData();
    }

    return (
        <div>
            <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={onChange}/>
            <input type="text" className="form-control" id="content" name="content" value={post.content} onChange={onChange}/>
            {!post.disable ? (
                <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
            ) : (
                ''
            )}
            {post.disable ? (
                <button className="btn btn-primary btn-block" onClick={onUpdate}>Update</button>
            ) : (
                ''
            )}
            <table>
                <tbody>
                    {items.map((item, index) => 
                        <tr key={index}>
                            <td className="text-left">{item.title}</td>
                            <td className="text-left">{item.content}</td>
                            <td className="text-right">
                                <button className="btn btn-info mr-1" disabled={post.disable} onClick={(e) => onEdit(e, item.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-info mr-1" disabled={post.disable} onClick={(e) => onDelete(e, item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Post;