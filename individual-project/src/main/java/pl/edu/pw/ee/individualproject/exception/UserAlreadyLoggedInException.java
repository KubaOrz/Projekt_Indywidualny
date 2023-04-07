package pl.edu.pw.ee.individualproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class UserAlreadyLoggedInException extends RuntimeException {

    public UserAlreadyLoggedInException() {
        super();
    }

    public UserAlreadyLoggedInException(String message) {
        super(message);
    }
}
