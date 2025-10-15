import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { apiURL } from '../../config';
import { Button } from 'react-bootstrap';
import imageCompression from 'browser-image-compression';

const editorStyles = `
  .jodit-wysiwyg img { max-width: 800px; height: auto; }
  .jodit-wysiwyg table { border-collapse: collapse; width: 100%; max-width: 800px; margin: 0 auto; }
  .jodit-wysiwyg td { border: 1px solid #ccc; padding: 8px; }
`;

export default function BlogEditorV2({ post }) {  // Przyjmij prop post
  const editor = useRef(null);
  const [content, setContent] = useState(post?.postBody || '');  // Initial z prop
  const [postTitle, setPostTitle] = useState(post?.postTitle || '');
  const [showHtml, setShowHtml] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(post?.blogPostPhotoURL || '');  // Preview z URL
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Pisz post...',
      height: 400,
      toolbar: true,
      buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'align', 'table', 'image', 'link', '|', 'undo', 'redo', '|', 'source'],
      uploader: { insertImageAsBase64URI: true },
      style: {
        img: { 'max-width': '800px', 'height': 'auto' },
        table: { 'border-collapse': 'collapse', 'max-width': '800px', 'margin': '0 auto' },
        td: { border: '1px solid #ccc', padding: '8px' }
      }
    }),
    []
  );
  
  useEffect(() =>{
    axios.get(`${apiURL}/Blog/GetTags`)
      .then(res =>{
          setTags(res.data);
          console.log(res.data);
      })
  }, apiURL)

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    

    try {
      const compressedFile = await imageCompression(file, options);
      const fileWithName = new File([compressedFile], file.name, { type: compressedFile.type });
      setPostImage(fileWithName);
      const reader = new FileReader();
      reader.onload = () => setPostImagePreview(reader.result);
      reader.readAsDataURL(fileWithName);
      console.log('Skompresowany plik:', fileWithName.name);
    } catch (error) {
      console.error('Błąd kompresji:', error);
    }
  };
  function handleChangeTag(e){
    const { value } = e.target;
    setSelectedTag(value);
    console.log(selectedTag)
  }

  const handleSave = async () => {
    try {
        const formData = new FormData();
        formData.append('postTitle', postTitle || 'Bez tytułu');
        formData.append('postBody', content);
        formData.append('tagId', selectedTag);
        if (postImage) {
          formData.append('file', postImage);
        }

        let res;
        if (post?.postID) {  // Edit - załóż nowy endpoint /UpdatePost/{id}
          res = await axios.put(`${apiURL}/Blog/UpdatePost/${post.postID}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {  // Nowy
          res = await axios.post(`${apiURL}/Blog/AddPost`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
        console.log('Zapisano:', res.data);
    } catch (error) {
        console.error('Błąd:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <style>{editorStyles}</style>
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Tytuł postu"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="file"
        accept="image/*" 
        onChange={handleImage}
        style={{ marginBottom: '10px' }}
      />
      <select 
        onChange={handleChangeTag}
      >
        {tags.map((tag) =>(
          <option key={tag.id} value={tag.id}>
            {tag.tag}
          </option>
        ))}
      </select>
      {postImagePreview && <img src={postImagePreview} alt="Podgląd" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
      <Button onClick={() => setShowHtml(!showHtml)} style={{ marginBottom: '10px' }}>
        {showHtml ? 'Pokaż edytor' : 'Pokaż HTML'}
      </Button>
      {showHtml ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', minHeight: '400px', padding: '10px', fontFamily: 'monospace' }}
          placeholder="Edytuj HTML..."
        />
      ) : (
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={setContent}
          onChange={(newContent) => {}}
        />
      )}
      <Button onClick={handleSave} style={{ marginTop: '10px' }}>
        Zapisz
      </Button>
    </div>
  );
}