import React from 'react'
import styles from './popUp.module.css'

const AddClientPopUp = ({ setPopUp, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleCancelClick = () => {
        setPopUp(false);
    };

    const handleSaveClick = () => {
        // Validate the input data
        if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
            // Handle validation error (you can show an error message)
            return;
        }

        // Call the onSave function to save the client data
        onSave({
            name,
            email,
            phone,
        });

        // Close the popup
        setPopUp(false);
    };

    return (
        <div className={styles.addClientPopUp}>
            <div className={styles.popUpContainer}>
                <div className={styles.popUpFields}>
                    <label htmlFor="name">Client full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="+91 1234567890"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className={styles.btnS}>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddClientPopUp