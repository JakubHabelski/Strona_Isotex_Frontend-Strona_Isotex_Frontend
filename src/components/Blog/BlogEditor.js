// BlogEditor.jsx
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { apiURL } from '../../config';
import axios from 'axios';

// Styl dla obrazków (max-width: 800px)
const editorStyles = `
  .rdw-editor-main img {
    max-width: 800px;
    height: auto;
  }
`;

export default function BlogEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(''); // Dodajemy pole na tytuł

  // Konwersja na HTML
  const convertContentToHTML = () => {
    const currentContentAsRaw = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(currentContentAsRaw);
  };

  // Zapis do API
  const handleSave = async () => {
    const html = convertContentToHTML();
    try {
      await axios.post(
        `${apiURL}/Blog/AddPost`,
        {
          postTitle: title || 'elo', // camelCase dla backendu
          postBody: html
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('Zapisano:', { postTitle: title, postBody: html });
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  // Base64 dla obrazków z max-width
  const handleImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ data: { link: reader.result } });
      };
      reader.readAsDataURL(file);
    });
  };

  // Wstawianie tabeli 2x2
  const insertTable = () => {
    const tableHTML = `
      <table style="border-collapse: collapse; width: 100%; max-width: 800px; margin: 0 auto;">
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">Komórka 1</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Komórka 2</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">Komórka 3</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Komórka 4</td>
        </tr>
      </table>
    `;
    const contentBlock = ContentState.createFromText(tableHTML);
    const newEditorState = EditorState.push(
      editorState,
      contentBlock,
      'insert-fragment'
    );
    setEditorState(newEditorState);
  };

  // Custom buttons
  const SaveButton = () => (
    <button onClick={handleSave} style={{ marginLeft: '10px' }}>
      Zapisz
    </button>
  );

  const TableButton = () => (
    <button onClick={insertTable} style={{ marginLeft: '10px' }}>
      Wstaw tabelę
    </button>
  );

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <style>{editorStyles}</style>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł postu"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={(state) => {
          setEditorState(state);
          console.log('HTML:', draftToHtml(convertToRaw(state.getCurrentContent())));
        }}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'image', 'emoji'],
          inline: { options: ['bold', 'italic', 'underline'] },
          textAlign: { options: ['left', 'center', 'right', 'justify'] }, // Centrowanie tekstu
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true },
            previewImage: true
          }
        }}
        toolbarCustomButtons={[<SaveButton key="save" />, <TableButton key="table" />]}
      />
    </div>
  );
}