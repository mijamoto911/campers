import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useEffect } from 'react';
import css from './FeaturesDetails.module.css';
import { bookCamper } from '../../redux/campers/campersOperations';
import { resetBookingSuccess } from '../../redux/campers/campersSlice';
import ACIcon from '../../assets/wind.svg';
import AutomaticIcon from '../../assets/diagram.svg';
import KitchenIcon from '../../assets/cup-hot.svg';
import PetrolIcon from '../../assets/fuelpump.svg';
import PropTypes from 'prop-types';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bookingDate: Yup.date()
    .required('Booking date is required')
    .typeError('Invalid date format'),
  comment: Yup.string(),
});

const FeaturesDetails = ({ camper = {} }) => {
  const dispatch = useDispatch();
  const bookingSuccess = useSelector((state) => state.campers.bookingSuccess);
  const error = useSelector((state) => state.campers.error);

  const handleSubmit = (values, { resetForm }) => {
    const formattedBookingData = {
      name: values.name,
      email: values.email,
      booking_date: values.bookingDate + 'T00:00:00.000Z',
      comment: values.comment || '',
    };

    dispatch(bookCamper(formattedBookingData));
    resetForm();
  };

  useEffect(() => {
    if (bookingSuccess || error) {
      setTimeout(() => {
        dispatch(resetBookingSuccess());
      }, 3000);
    }
  }, [bookingSuccess, error, dispatch]);

  return (
    <div className={css.featuresContainer}>
      <div className={css.camperFeatures}>
        <span className={css.camperFeature}>
          <img src={AutomaticIcon} alt="Automatic" className={css.icon} />
          {camper?.transmission || 'Automatic'}
        </span>
        <span className={css.camperFeature}>
          <img src={PetrolIcon} alt="Petrol" className={css.icon} />
          {camper?.engine || 'Petrol'}
        </span>
        <span className={css.camperFeature}>
          <img src={KitchenIcon} alt="Kitchen" className={css.icon} />
          {camper?.kitchen || 'Kitchen'}
        </span>
        <span className={css.camperFeature}>
          <img src={ACIcon} alt="AC" className={css.icon} />
          {camper?.AC ? 'AC' : 'No AC'}
        </span>

        <div className={css.vehicleDetailsContainer}>
          <h3 className={css.vehicleTitle}>Vehicle details</h3>
          <div className={css.vehicleDetailsGrid}>
            <span>Form</span>
            <span>Panel truck</span>
            <span>Length</span>
            <span>5.4 m</span>
            <span>Width</span>
            <span>2.01 m</span>
            <span>Height</span>
            <span>2.05 m</span>
            <span>Tank</span>
            <span>132 l</span>
            <span>Consumption</span>
            <span>12.4 l/100km</span>
          </div>
        </div>
      </div>

      <div className={css.registrationForm}>
        <h3 className={css.registrationTitle}>Book your campervan now</h3>
        <p className={css.registrationText}>
          Stay connected! We are always ready to help you.
        </p>

        {bookingSuccess && (
          <p className={css.successMessage}>{bookingSuccess}</p>
        )}
        {error && <p className={css.errorMessage}>{error}</p>}

        <Formik
          initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
          validationSchema={BookingSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                className={css.registrationInput}
                type="text"
                name="name"
                placeholder="Name"
              />
              {errors.name && touched.name ? (
                <div className={css.error}>{errors.name}</div>
              ) : null}

              <Field
                className={css.registrationInput}
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div className={css.error}>{errors.email}</div>
              ) : null}

              <Field
                className={css.registrationInput}
                type="date"
                name="bookingDate"
                placeholder="Booking date"
              />
              {errors.bookingDate && touched.bookingDate ? (
                <div className={css.error}>{errors.bookingDate}</div>
              ) : null}

              <Field
                className={css.registrationInput}
                as="textarea"
                name="comment"
                placeholder="Comment"
                rows="4"
              />

              <button type="submit" className={css.submitButton}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

FeaturesDetails.propTypes = {
  camper: PropTypes.object,
};

export default FeaturesDetails;
