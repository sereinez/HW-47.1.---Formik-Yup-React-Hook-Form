import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Схема валідації через Yup — по одному правилу на кожне поле
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я повинно містити щонайменше 2 символи")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Некоректний формат електронної пошти')
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(6, 'Пароль повинен містити щонайменше 6 символів')
    .required("Пароль обов'язковий"),
});

function Form() {
  const [submittedData, setSubmittedData] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Тут може бути відправка на сервер (наприклад, axios.post(...))
      // Поки що — просто зберігаємо результат у локальному стані та виводимо
      console.log('Дані форми:', values);
      setSubmittedData(values);
      resetForm();
    },
  });

  return (
    <div>
      <h3>Форма реєстрації (Formik + Yup)</h3>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Ім'я:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit">Відправити</button>
      </form>

      {submittedData && (
        <div className="submitted">
          <h4>Успішно відправлено:</h4>
          <p>Ім'я: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
