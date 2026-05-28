import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectPosts, selectLoading, selectError } from '../../redux/slices/postSlice'

export default function Newsfeed() {
    const dispatch = useDispatch()
    const posts    = useSelector(selectPosts)
    const loading  = useSelector(selectLoading)
    const error    = useSelector(selectError)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if (loading) return <p>Loading...</p>
    if (error)   return <p>{error}</p>

    return (
        <>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.id}</p>
                    <p>{post.author}</p>
                    <p>{post.caption}</p>
                    <hr/>
                </div>
            ))}
        </>
    )
}