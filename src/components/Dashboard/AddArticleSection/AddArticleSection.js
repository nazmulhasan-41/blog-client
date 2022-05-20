import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";


const AddArticleSection = () => {

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

    const addArticleHandler = () => {
        openModal();
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data, event) => {
        // console.log(data);
        var newArticle = {
            ...data,
            loggedInUser,
            date: (new Date()).toDateString(),
        }

        addArticleInDB(newArticle);
        event.target.reset();
    }
    const addArticleInDB = (newArticle) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArticle)
        };
        fetch('http://localhost:5000/addArticle', requestOptions)
            .then(response => response.json())
            .then(data => { 
                closeModal()
                // setFlip((prevFlip)=>!prevFlip) 
            });
    }


    return (
        <div>

            <button onClick={addArticleHandler}>Add Article</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >



                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input value={loggedInUser} {...register("userEmail")} />

                    <select placeholder='Select Category' {...register("articleCategory", { required: true })}>
                        {
                            categories.map(category => (

                                <option value={category.categoryName}>{category.categoryName}</option>

                            ))}

                    </select>


                    <textarea placeholder='Write your article' {...register("articleText", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input type="submit" />  <button onClick={closeModal}>close</button>
                </form>

            </Modal>

        </div>
    );
};

export default AddArticleSection;