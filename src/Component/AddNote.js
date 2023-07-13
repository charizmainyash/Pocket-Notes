import React, { useState,useContext} from "react";
import contextValue from "../context/notes/NoteContext"
 
const AddNote = (props) => {
    const context=useContext(contextValue)
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
        e.preventDefault(); //To save page from reloading 
    addNote(note.title,note.description,"");

     setNote({title:"",description:"",tag:""});
     props.showAlert("Added Note Successfully","success");
    }
    const onChange=(e)=>{
     setNote({...note,[e.target.name]:e.target.value});  //...note mean making the value appending in the note
    }
  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center ">Add Your Note</h2>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp"onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
                    />
          </div>
          <div className="mb-3 my-3">
            <label htmlFor="tag" className="form-label">
             Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} value={note.tag} />
          </div>
          <button disabled={note.description.length<5 || note.title.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
