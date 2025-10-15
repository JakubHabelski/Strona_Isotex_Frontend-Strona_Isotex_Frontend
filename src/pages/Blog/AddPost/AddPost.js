import BlogEditor from '../../../components/Blog/BlogEditor'
import BlogEditorV2 from '../../../components/Blog/BlogEditorV2'
import Navbar_v2 from '../../../components/Navbar_v2/Navbar'
import style from './AddPost.module.css'


export default function AddPost(){
    return(
        <>
        <Navbar_v2/>
        <div style={{marginTop:"500px"}}>
            <BlogEditorV2/>
        </div>
        
        </>
    )
}