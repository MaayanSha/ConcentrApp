import React, { useState } from 'react';
import {TfiSave} from "react-icons/tfi";
import {MdOutlineCancel} from "react-icons/md";
import {BsFillTrash3Fill} from "react-icons/bs";
import {TbBrandOpenai} from "react-icons/tb";
import {SiOpenai} from "react-icons/si";

export default function EditModal({handleChange, handleSubmit,handlePrompt=null, handleDelete, setIsEditing, id}) {
    return(
        <><input
            type="text"
            className="input-box"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
        />
            <div className="btn-group">
                <button
                    type="button"
                    className="transparent-button"
                    data-title="Confirm"
                    onClick={()=>handleSubmit(id)}
                >
                    <TfiSave />
                </button>
                {handlePrompt? <button
                    type="button"
                    className="transparent-button"
                    data-title="GPT suggestions"
                    onClick={handlePrompt}
                >
                    <SiOpenai style={{backgroundColor:'#00A67E', color:'white',padding:1}}/>
                </button> : null}
                <button
                    type="button"
                    className="transparent-button"
                    data-title="Cancel"
                    onClick={setIsEditing}
                >
                    <MdOutlineCancel />
                </button>
                <button
                    type="button"
                    className="transparent-button"
                    data-title="Delete"
                    onClick={()=>handleDelete(id)}
                >
                    <BsFillTrash3Fill/>
                </button>
            </div>
        </>
    );
}