import {useState, useEffect} from 'react'
import './scss/app.scss';
import CreditCard from './components/CreditCard'
import Input from './components/Input'
import {formatCreditCardNumber, formatExpiryDate, hideFormat} from './utils/index'

function App() {
  const [form, setForm] = useState({
    cvc: '',
    expiry: '',
    focused: '',
    name: '',
    number: '',
    visibleNumber: ''
  })
  const [hideNumber, setHideNumber] = useState(false)
  const [validCards, setValidCards] = useState([])

  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    fetch(process.env.REACT_APP_BE)
      .then(response => response.json())
      .then(data => {
        setValidCards(data)
        console.log(data)});
  }, [])

  useEffect(() => {
    setForm((f) => {
      return {
        ...f,
        number: !hideNumber ? f.visibleNumber : hideFormat(f.visibleNumber)
      }
    })
  }, [hideNumber])
  
  const handleValidate = () => {
    setIsValid(validCards.some(item => 
      item.number === form.visibleNumber.replaceAll(' ', '') &&
      item.ccv === form.cvc &&
      item.exp === form.expiry
    ))
  }

  const handleChangeNumber = (number) => {
    const clearedNumber = number.replace(/\D+/g, "")
    setForm({
      ...form, 
      number: formatCreditCardNumber(clearedNumber),
      visibleNumber: formatCreditCardNumber(clearedNumber)
    })
  }

  const handleChangeExpiry = (number) => {
    const clearedNumber = number.replace(/\D+/g, "")
    setForm({
      ...form, 
      expiry: formatExpiryDate(clearedNumber)
    })
  }

  const handleFocus = (name) => {
    setForm({...form, focused:name})
  }

  return (
    <div className="App">
      <header className="App-header">
        <CreditCard 
          {...form}
        />
        <div className="App-action">
          <button disabled={!form.number} onClick={() => setHideNumber(!hideNumber)}>{!hideNumber ? 'Hide' : 'Show'}</button>
          <button onClick={() => handleFocus(form.focused === 'back' ? 'front' : 'back')}>Flip card</button>
        </div>
        <form className="form">
          <Input 
            label="Number"
            value={form.number}
            name="number"
            maxLength="19" 
            type="tel"
            pattern="[\d| ]{16,22}" 
            disabled={hideNumber}
            onFocus={e => handleFocus(e.target.name)}
            onChange={(e) => handleChangeNumber(e.target.value)}
          />
          <Input 
            label="Name"
            value={form.name}
            name="name"
            type="text"
            onFocus={e => handleFocus(e.target.name)}
            onChange={(e) => setForm({...form, name:e.target.value})}
          />
          <div className="form-spread">
            <Input
              label="Expiry"
              value={form.expiry}
              name="expiry"
              maxLength="19" 
              type="tel"
              onFocus={e => handleFocus(e.target.name)}
              onChange={(e) => handleChangeExpiry(e.target.value)}
            />
            <Input
              label="CVC" 
              value={form.cvc}
              name="cvc"
              type="tel"
              pattern="[0-9]{10}" 
              maxLength="3"
              onFocus={e => handleFocus(e.target.name)}
              onChange={(e) => setForm({...form, cvc:e.target.value.replace(/[^0-9]/g,'')})}/>
          </div>
        </form>
        <div className="form-action">
          <button onClick={() => handleValidate()}>Validate</button>
        </div>
        <div className={`validate validate-${isValid}`}>
          {isValid ? "It's valid" : isValid !== null && "Not valid"} 
        </div>
      </header>
    </div>
  );
}

export default App;
