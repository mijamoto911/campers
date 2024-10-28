import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import css from './ReviewsDetails.module.css';
import { bookCamper } from '../../redux/campers/campersOperations';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bookingDate: Yup.date()
    .required('Booking date is required')
    .typeError('Invalid date format'),
  comment: Yup.string(),
});

const ReviewsDetails = () => {
  const dispatch = useDispatch();
  const bookingSuccess = useSelector((state) => state.campers.bookingSuccess);
  const error = useSelector((state) => state.campers.error);
  const camper = useSelector((state) => state.campers.camperDetails);

  if (!camper || !camper.reviews) {
    return <p>No reviews available</p>;
  }

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

  return (
    <div className={css.reviewsContainer}>
      <div className={css.reviewsSection}>
        {camper.reviews.map((review, index) => (
          <div key={index} className={css.reviewItem}>
            <div className={css.avatarContainer}>
              <div className={css.avatar}>{review.reviewer_name.charAt(0)}</div>
              <div className={css.reviewerInfo}>
                <span className={css.reviewerName}>{review.reviewer_name}</span>

                <div className={css.stars}>
                  {'★'.repeat(review.reviewer_rating)}
                  {'☆'.repeat(5 - review.reviewer_rating)}
                </div>
              </div>
            </div>
            <div className={css.reviewText}>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
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

export default ReviewsDetails;
