const UserDataInputValidator = {

    validateEmail: function (email) {
        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!validEmailRegex.test(email)) {
          return 'Niepoprawny adres e-mail!';
        } else {
            return '';
        }
    },

    validatePassword: function (password) {
        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!validPasswordRegex.test(password)) {
          return 'Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!';
        } else {
          return '';
        }
    },

    checkPasswordEquality: function (confirmPassword, password) {
        if (!(confirmPassword === password)) {
          return 'Podane hasła nie są takie same!';
        } else {
          return '';
        }
    },

    validatePhoneNumber: function (phoneNumber) {
        const validPhoneRegex = /^[0-9]{9}$/;
        if (!validPhoneRegex.test(phoneNumber)) {
          return 'Niepoprawny numer telefonu!';
        } else {
          return '';
        }
    }
}

export default UserDataInputValidator;