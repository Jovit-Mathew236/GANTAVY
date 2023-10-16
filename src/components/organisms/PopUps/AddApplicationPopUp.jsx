'use client'
import React, { useState } from 'react'
import styles from './PopUps.module.css'

const AddApplicationPopUp = ({
    setCountry,
    setVisa,
    paymentType,
    setPaymentType,
    setInstallment,
    handlePaymentTypeChange,
    handleCancelClick,
    handleSaveClick,
    hasError,
    disable
}) => {
    // const [disable, setDisable] = useState(disable)
    return (
        <div className={styles.popUp}>
            <div className={styles.popUpContainer}>
                <div className={styles.popUpFields}>
                    <label htmlFor="">Country</label>
                    <select name="" id="" onChange={(e) => setCountry(e.target.value)}>
                        <option hidden value="">Select Country</option>
                        <option value="usa">United States of America</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                    </select>
                </div>
                <div className={styles.popUpFields}>
                    <label htmlFor="">Visa</label>
                    <select name="" id="" onChange={(e) => setVisa(e.target.value)}>
                        <option hidden value="">Select Visa type</option>
                        <option value="Education Visa">Education Visa</option>
                        <option value="Visiting Visa">Visiting Visa</option>
                        <option value="Education Visa">Education Visa</option>
                        <option value="Work Visa">Work Visa</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="PR">PR</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Payment type</label>
                    <div className={styles.radioBtnsContainer}>
                        <div className={styles.radioBtns}>
                            <input
                                type="radio"
                                name="paymentType"
                                id="upfront"
                                value="Upfront"
                                checked={paymentType === 'Upfront'}
                                onChange={handlePaymentTypeChange}
                            />
                            <label htmlFor="upfront">Upfront</label>
                        </div>
                        <div className={styles.radioBtns}>
                            <input
                                type="radio"
                                name="paymentType"
                                id="installment"
                                value="Installment"
                                checked={paymentType === 'Installment'}
                                onChange={handlePaymentTypeChange}
                            />
                            <label htmlFor="Installment">Installment</label>
                        </div>
                    </div>
                </div>
                {paymentType === 'Installment' && (
                    <div id="installment">
                        <label htmlFor="">Number of installments</label>
                        <select name="" id="" onChange={(e) => setInstallment(e.target.value)}>
                            <option value="">Select number of installments</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className={styles.btnS}>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button disabled={disable} onClick={handleSaveClick}>Save</button>
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
        </div>
    );
};

export default AddApplicationPopUp