// AddClientPopUp.js
import React, { useState } from 'react';
import styles from './addStage.module.css';
import Add2 from '../../atom/svgs/Add2';
import Remove from '../../atom/svgs/Remove';

const FieldInput = ({ label, placeholder, value, onChange }) => (

    <div className={styles.popUpFields}>
        <label htmlFor="">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const AddStagePopup = ({
    popUp,
    setStageName,
    fields,
    removeField,
    setFields,
    addField,
    handleCancelClick,
    handleSave,
    disable,
    hasError,
}) => {
    const [isNotPaymentAlreadyPresent, setIsNotPaymentAlreadyPresent] = useState(false)

    const handleFieldTypeChange = (e, index) => {
        if (e.target.value === 'payment') {
            const isNotPaymentAlreadyPresent = fields.some(
                (field) => field.type !== 'payment' && fields.length !== 1
            );
            if (isNotPaymentAlreadyPresent) {
                setIsNotPaymentAlreadyPresent(true);
                setTimeout(() => {
                    setIsNotPaymentAlreadyPresent(false);
                }, 3000);
                return;
            }
        }
        const updatedFields = [...fields];
        updatedFields[index].type = e.target.value;
        setFields(updatedFields);
    };

    const handleFieldChange = (fieldType, index, value) => {
        const updatedFields = [...fields];
        updatedFields[index][fieldType] = value;
        setFields(updatedFields);
    };

    const renderFieldInputs = (field, index) => {
        switch (field.type) {
            case 'fileupload':
            case 'textbtn':
            case 'payment':
            case 'link':
                return (
                    <>
                        <FieldInput
                            label="Heading"
                            placeholder="Enter heading"
                            value={field.heading}
                            onChange={(value) => handleFieldChange('heading', index, value)}
                        />
                        <FieldInput
                            label="Sub Heading"
                            placeholder="Enter sub heading"
                            value={field.subtext}
                            onChange={(value) => handleFieldChange('subtext', index, value)}
                        />
                        {/* Other input fields... */}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        popUp && (
            <div className={styles.popUp}>
                <div className={styles.popUpContainer}>
                    <FieldInput
                        label="Stage Name"
                        placeholder="Level 1"
                        value={fields[0].stageName}
                        onChange={(value) => setStageName(value)}
                    />

                    {fields.map((field, index) => (
                        <div key={index} className={styles.subContainer}>
                            {index > 0 && (
                                <p className={styles.rmvBtn} onClick={() => removeField(index)}>
                                    <Remove />
                                </p>
                            )}

                            <select
                                name="options"
                                id="option"
                                value={field.type}
                                onChange={(e) => handleFieldTypeChange(e, index)}
                            >
                                <option value="fileupload">File Upload</option>
                                <option value="textbtn">Text button</option>
                                <option value="payment">Payment info</option>
                                <option value="link">Link share</option>
                            </select>

                            {renderFieldInputs(field, index)}

                            {index === fields.length - 1 && (
                                <p className={styles.addAndRmvBtn} onClick={addField}>
                                    <Add2 />
                                </p>
                            )}
                        </div>
                    ))}

                    <div className={styles.btnS}>
                        <button onClick={handleCancelClick}>Cancel</button>
                        <button disabled={disable} onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>

                {hasError &&
                    <div class="error_message flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">Invalid Felid!</span> Enter valid data
                        </div>
                    </div>
                }
                {isNotPaymentAlreadyPresent &&
                    <div class="error_message flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 " role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">Sorry!</span>You cannot add a payment field as there is already a field present
                        </div>
                    </div>
                }
            </div>
        )
    );
};

export default AddStagePopup;
