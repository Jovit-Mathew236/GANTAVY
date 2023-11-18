import React from 'react';
import styles from './Card.module.css';
import RightArrow from '../../atom/svgs/RightArrow';
import { countryData } from '../../molecules/Countries';

const Card = ({ data, type }) => {
    const formatDate = (date) => {
        return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardTopSection}>
                <p className={styles.id}>#{type === 'client' ? data.clientId : data.applicationId}</p>
                <p className={styles.date}>{formatDate(type === 'client' ? data.addedAt : data.createdAt)}</p>
            </div>
            <div className={styles.cardMainSection}>
                <p>{data.name}</p>
                {type === 'client' && <p>{data.email}</p>}
                {type === 'application' && (
                    <>
                        <h3 className={styles.country}>
                            {countryData[data.country].name}
                            <p className={styles.countryIcon}>
                                <img
                                    width="15"
                                    height="15"
                                    src={`https://img.icons8.com/emoji/48/${countryData[data.country].name
                                        .split(' ')
                                        .join('-')
                                        .toLowerCase()}-emoji.png`}
                                    alt={`${data.country}-emoji`}
                                />
                            </p>
                        </h3>
                        <p className={styles.visaType}>{data.visatype}</p>
                    </>
                )}
            </div>
            <div className={styles.cardBottomSection}>
                {type === 'client' ? (
                    <div className={styles.countries}>
                        {data.country &&
                            data.country.map((country, k) => {
                                return (
                                    <p key={k} className={styles.country}>
                                        <img
                                            width="20"
                                            height="20"
                                            src={`https://img.icons8.com/emoji/48/${countryData[country].name.split(' ').join('-').toLowerCase()}-emoji.png`}
                                            alt={`${country}-emoji`}
                                        />
                                    </p>
                                );
                            })}
                    </div>
                ) :
                    <p className={styles.paymentType}>
                        {data.paymenttype}
                        {data.paymenttype.toLowerCase() === "installment" && (
                            <span className={styles.installment}>{data.installment}</span>
                        )}
                    </p>
                }
                <a href={`/client-details${type === 'application' ? '/application' : ''}?id=${type === 'client' ? data.clientId : data.applicationId}`}>
                    <RightArrow />
                </a>
            </div>
        </div>
    );
};

export default Card;
