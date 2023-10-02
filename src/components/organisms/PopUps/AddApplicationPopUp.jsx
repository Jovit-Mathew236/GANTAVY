'use client'
import React from 'react'
import styles from './PopUp.module.css'

const AddApplicationPopUp = ({
    setCountry,
    setVisa,
    paymentType,
    setPaymentType,
    setInstallment,
    handlePaymentTypeChange,
    handleCancelClick,
    handleSaveClick,
}) => {
    return (
        <div className={styles.popUp}>
            <div className={styles.popUpContainer}>
                <div className={styles.popUpFields}>
                    <label htmlFor="">Country</label>
                    <select name="" id="" onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select Country</option>
                        <option value="United States">United States of America</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Visa</label>
                    <select name="" id="" onChange={(e) => setVisa(e.target.value)}>
                        <option value="">Select Visa type</option>
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
                                value="upfront"
                                checked={paymentType === 'upfront'}
                                onChange={handlePaymentTypeChange}
                            />
                            <label htmlFor="upfront">Upfront</label>
                        </div>
                        <div className={styles.radioBtns}>
                            <input
                                type="radio"
                                name="paymentType"
                                id="installment"
                                value="installment"
                                checked={paymentType === 'installment'}
                                onChange={handlePaymentTypeChange}
                            />
                            <label htmlFor="installment">Installment</label>
                        </div>
                    </div>
                </div>
                {paymentType === 'installment' && (
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
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddApplicationPopUp