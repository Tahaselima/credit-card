import React from 'react';
import PropTypes from 'prop-types';

const CreditCards = ({cvc, expiry, locale, name, number, placeholders, focused}) => {
    const options = () => {
        const cardType = number.startsWith('4') ? 'visa' : number.startsWith('5') ? 'mastercard' : 'unknown';

        let maxLength = 16;

        return {
            cardType,
            maxLength,
        };
    }
    const visibleNumber = () => {
        let maxLength = options().maxLength;
        let nextNumber = typeof number === 'number' ? number.toString() : number.replace(/[A-Za-z]| /g, '');
        
        if (isNaN(parseInt(nextNumber, 10))) {
            nextNumber = '';
        }
        
        
        if (nextNumber.length > maxLength) {
            nextNumber = nextNumber.slice(0, maxLength);
        }
        
        while (nextNumber.length < maxLength) {
            nextNumber += '•';
        }
        
        const format = [0, 4, 8, 12];
        const limit = [4, 7];
        nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(format[2], limit[0])} ${nextNumber.substr(format[3], limit[1])}`;
        
        return nextNumber;
    }
    const visibleExpiry = () => {
        const date = typeof expiry === 'number' ? expiry.toString() : expiry;
        let month = '';
        let year = '';
    
        if (date.includes('/')) {
        [month, year] = date.split('/');
        }
        else if (date.length) {
        month = date.substr(0, 2);
        year = date.substr(2, 6);
        }
    
        while (month.length < 2) {
        month += '•';
        }
    
        if (year.length > 2) {
        year = year.substr(2, 4);
        }
    
        while (year.length < 2) {
        year += '•';
        }
    
        return `${month}/${year}`;
    }
    return (
        <div key="Cards" className="credit">
         <div
           className={[
             'credit__card',
             `credit__card--${options().cardType}`,
             focused === 'cvc' || focused === 'expiry' || focused === 'back' ? 'credit__card--flipped' : '',
           ].join(' ').trim()}
         >
           <div className="credit__card--front">
             <div className="credit__card__background" />
             <div className="credit__type" />
             <div
               className={[
                 'credit__cvc__front',
                 focused === 'cvc' ? 'credit--focused' : '',
               ].join(' ').trim()}
             >
               {cvc}
             </div>
             <div
               className={[
                 'credit__number',
                 visibleNumber().replace(/ /g, '').length > 16 ? 'credit__number--large' : '',
                 focused === 'number' ? 'credit--focused' : '',
                 visibleNumber().substr(0, 1) !== '•' ? 'credit--filled' : '',
               ].join(' ').trim()}
             >
               {visibleNumber()}
             </div>
             <div
               className={[
                 'credit__name',
                 focused === 'name' ? 'credit--focused' : '',
                 name ? 'credit--filled' : '',
               ].join(' ').trim()}
             >
               {name || placeholders.name}
             </div>
             <div className="credit__chip" />
           </div>
           <div className="credit__card--back">
             <div className="credit__card__background" />
             <div className="credit__stripe" />
             <div className="credit__signature" />
             <div
               className={[
                 'credit__cvc',
                 focused === 'cvc' ? 'credit--focused' : '',
               ].join(' ').trim()}
             >
               {cvc}
             </div>
             <div
               className={[
                 'credit__expiry',
                 focused === 'expiry' ? 'credit--focused' : '',
                 visibleExpiry().substr(0, 1) !== '•' ? 'credit--filled' : '',
               ].join(' ').trim()}
             >
               <div className="credit__expiry__valid">{locale.valid}</div>
               <div className="credit__expiry__value">{visibleExpiry()}</div>
             </div>
             <div className="credit__type" />
           </div>
         </div>
       </div>
     );
}

CreditCards.propTypes = {
 cvc: PropTypes.oneOfType([
   PropTypes.string,
   PropTypes.number,
 ]).isRequired,
 expiry: PropTypes.oneOfType([
   PropTypes.string,
   PropTypes.number,
 ]).isRequired,
 focused: PropTypes.string,
 locale: PropTypes.shape({
   valid: PropTypes.string,
 }),
 name: PropTypes.string.isRequired,
 number: PropTypes.oneOfType([
   PropTypes.string,
   PropTypes.number,
 ]).isRequired,
 placeholders: PropTypes.shape({
   name: PropTypes.string,
 }),
};

CreditCards.defaultProps = {
  acceptedCards: [],
  locale: {
    valid: 'mo / year',
  },
  placeholders: {
    name: 'YOUR NAME HERE',
  },
};

export default CreditCards;
