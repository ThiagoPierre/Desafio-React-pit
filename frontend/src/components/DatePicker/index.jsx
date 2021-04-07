/* const [startDate, setStartDate] = useState(null);
const [birthDate, setBirthDate] = useState(null);
import { addDays } from 'date-fns';
<Col>
<label className="form-title"> Dia do nascimento </label>
<DatePicker
  id="date picker"
  selected={birthDate}
  onChange={(date) => setBirthDate(date)}
  dateFormat="dd/MM/yyyy"
  name="birthday"
/>
</Col>

<Col>
<label className="form-title"> Data da Consulta </label>
<DatePicker
  id="time picker"
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  showTimeSelect
  dateFormat="MMMM d, yyyy h:mm aa"
  minDate={new Date()}
  maxDate={addDays(new Date(), 20)}
  timeForm
  name="appointment"
/>
</Col> */
