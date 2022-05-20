import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

const SingleArticle = ({ article , deleteArticle, updateArticle}) => {

    const { articleCategory, date, articleText ,_id} = article;

    const loggedInUser = localStorage.getItem('loggedInUser');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [categories, setCategories] = useState([]);
    // const [flipf,setFlip]=useState(true);


    useEffect(() => {
        fetch('http://localhost:5000/getAllCategories')
            .then(response => response.json())
            .then(result => {
                setCategories(result)
            })

    }, [])


    function openUpdateFieldModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const { register, handleSubmit , formState: { errors } } = useForm();

    const onSubmit = (data, event) => {
        // console.log(data);
        var updatedArticle = {
            ...data,
            date: (new Date()).toDateString(),
        }
        event.target.reset();
        closeModal()
        updateArticle(_id,updatedArticle);

    }

const changeTextAreaValue=()=>{
    console.log('value changing')
}

    return (
        <div>

            <ul>
                <li>{articleCategory}</li>
                <li>{date}</li>
                <li>{articleText}</li>
                <button onClick={openUpdateFieldModal}>update</button>
                <button onClick={()=>deleteArticle(_id)} >delete</button>



            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >



                <form onSubmit={handleSubmit(onSubmit)}>

                    <select placeholder='Select Category' {...register("articleCategory", { required: true })}>
                        {
                            categories.map(category => (

                                <option value={category.categoryName}>{category.categoryName}</option>

                            ))}

                    </select>


                    <textarea placeholder='Update your article' defaultValue={articleText} {...register("articleText", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input type="submit" />  <button onClick={closeModal}>close</button>
                </form>

            </Modal>




            </ul>
        </div>
    );
};

export default SingleArticle;